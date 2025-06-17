import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFinance } from '../contexts/FinanceContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

import Button from '../components/Button';
import InfoCard from '../components/InfoCard';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function Dashboard() {
  const { transactions, clearTransactions } = useFinance();
  const navigation = useNavigation<NavigationProps>();

  const entradas = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const saidas = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const saldo = entradas - saidas;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cash Control</Text>

      <View style={styles.cardContainer}>
        <InfoCard title="Saldo" value={saldo} />
        <InfoCard title="Entradas" value={entradas} color="#34C759" />
        <InfoCard title="Saídas" value={saidas} color="#FF3B30" />
      </View>

      <Button
        title="+ Adicionar Transação"
        onPress={() => navigation.navigate('AddTransaction')}
      />
      <Button
        title="🗑️ Limpar Dados"
        variant="danger"
        onPress={clearTransactions}
      />
      <Button
        title="🚪 Sair"
        variant="danger"
        onPress={() => navigation.navigate('Welcome')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});
