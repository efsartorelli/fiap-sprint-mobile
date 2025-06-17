import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useFinance } from '../contexts/FinanceContext';

export default function History() {
  const { transactions } = useFinance();

  const formatDateTime = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <View style={styles.row}>
        <Text style={styles.title}>{item.title}</Text>
        <Text
          style={[
            styles.amount,
            { color: item.type === 'income' ? '#34C759' : '#FF3B30' },
          ]}
        >
          {item.type === 'income' ? '+' : '-'} R$ {item.amount.toFixed(2)}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.type}>
          {item.type === 'income' ? 'Entrada' : 'Saída'} • {item.category}
        </Text>
        <Text style={styles.date}>{formatDateTime(item.date)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titlePage}>Histórico de Transações</Text>

      {transactions.length === 0 ? (
        <Text style={styles.empty}>Nenhuma transação registrada.</Text>
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  titlePage: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  title: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  amount: { fontSize: 16, fontWeight: 'bold' },
  type: { color: '#999', fontSize: 14 },
  date: { color: '#999', fontSize: 14 },
  empty: {
    color: '#999',
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
  },
});
