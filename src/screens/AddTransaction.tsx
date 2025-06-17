import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ToastAndroid,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import uuid from 'react-native-uuid';
import { useFinance } from '../contexts/FinanceContext';

const categories = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Compras',
  'Contas',
  'Investimentos',
  'Apostas',
];

const incomeMethods = [
  'Salário',
  'Venda',
  'Presente',
  'Retorno de Aposta',
  'Outros',
];

export default function AddTransaction() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { addTransaction, transactions } = useFinance();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'income' | 'expense' | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [method, setMethod] = useState<string | null>(null);

  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Atenção', message);
    }
  };

  const getSaldo = () => {
    const entradas = transactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    const saidas = transactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    return entradas - saidas;
  };

  const getTotalApostas = () => {
    return transactions
      .filter(t => t.type === 'expense' && t.category === 'Apostas')
      .reduce((acc, t) => acc + t.amount, 0);
  };

  const confirmarAdicao = () => {
    const newTransaction = {
      id: uuid.v4() as string,
      title,
      amount: Number(amount),
      type,
      category: type === 'expense' ? category : method,
      date: new Date().toISOString(),
    };

    addTransaction(newTransaction);
    navigation.goBack();
  };

  const handleAddTransaction = () => {
    if (!title.trim() || !amount.trim() || !type) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }

    if (type === 'income' && !method) {
      Alert.alert('Atenção', 'Selecione um método de entrada');
      return;
    }

    if (type === 'expense' && !category) {
      Alert.alert('Atenção', 'Selecione uma categoria de saída');
      return;
    }

    const saldoAtual = getSaldo();
    const totalApostas = getTotalApostas();
    const valorAposta = type === 'expense' && category === 'Apostas' ? Number(amount) : 0;

    const novoTotalApostas = totalApostas + valorAposta;
    const porcentagemApostas = (novoTotalApostas / saldoAtual) * 100;

    if (
      type === 'expense' &&
      category === 'Apostas' &&
      saldoAtual > 0 &&
      porcentagemApostas > 20
    ) {
      Alert.alert(
        '🚩 Atenção!',
        `Esse valor fará com que seus gastos com apostas representem ${porcentagemApostas.toFixed(
          1
        )}% do seu saldo atual.\n\nTem certeza que deseja continuar?`,
        [
          {
            text: '❌ Cancelar',
            style: 'cancel',
          },
          {
            text: '📈 Ver Sugestões',
            onPress: () => navigation.navigate('Suggestions'),
          },
          {
            text: '✅ Continuar',
            onPress: confirmarAdicao,
          },
        ]
      );
      return;
    }

    confirmarAdicao();
  };

  const handleSelectType = (selectedType: 'income' | 'expense') => {
    setType(selectedType);
    setCategory(null);
    setMethod(null);
  };

  const handleSelectCategory = (cat: string) => {
    if (type === 'expense') {
      setCategory(cat);
    } else {
      showToast('Categoria é apenas para saídas');
    }
  };

  const handleSelectMethod = (met: string) => {
    if (type === 'income') {
      setMethod(met);
    } else {
      showToast('Método é apenas para entradas');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Adicionar Transação</Text>

      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Valor"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.subtitle}>Tipo</Text>
      <View style={styles.typeContainer}>
        <TouchableOpacity
          style={[
            styles.typeButton,
            type === 'income' && styles.selectedIncome,
          ]}
          onPress={() => handleSelectType('income')}
        >
          <Text style={styles.typeText}>Entrada</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.typeButton,
            type === 'expense' && styles.selectedExpense,
          ]}
          onPress={() => handleSelectType('expense')}
        >
          <Text style={styles.typeText}>Saída</Text>
        </TouchableOpacity>
      </View>

      {type === 'income' && (
        <>
          <Text style={styles.subtitle}>Método de Entrada</Text>
          <View style={styles.categoryContainer}>
            {incomeMethods.map((met) => (
              <TouchableOpacity
                key={met}
                style={[
                  styles.categoryButton,
                  method === met && styles.selectedCategory,
                ]}
                onPress={() => handleSelectMethod(met)}
              >
                <Text style={styles.categoryText}>{met}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {type === 'expense' && (
        <>
          <Text style={styles.subtitle}>Categoria de Saída</Text>
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  category === cat && styles.selectedCategory,
                ]}
                onPress={() => handleSelectCategory(cat)}
              >
                <Text style={styles.categoryText}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('HomeTabs')}
      >
        <Text style={styles.backButtonText}>Voltar ao Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  title: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  typeButton: {
    flex: 1,
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  selectedIncome: {
    backgroundColor: '#34C759',
  },
  selectedExpense: {
    backgroundColor: '#FF3B30',
  },
  typeText: { color: '#fff', fontWeight: 'bold' },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedCategory: {
    backgroundColor: '#007AFF',
  },
  categoryText: { color: '#fff', fontSize: 14 },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  backButton: {
    backgroundColor: '#444',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: { color: '#fff', fontWeight: 'bold' },
});
