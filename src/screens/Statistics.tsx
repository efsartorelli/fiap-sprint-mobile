import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart, BarChart } from 'react-native-chart-kit';
import { useFinance } from '../contexts/FinanceContext';

export default function Statistics() {
  const { transactions } = useFinance();

  const entradas = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

  const saidas = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

  const saldo = entradas - saidas;

  const dataLabels = ['Entradas', 'Saídas', 'Saldo'];
  const dataValues = [entradas, saidas, saldo];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Estatísticas</Text>

      <View style={styles.summaryContainer}>
        <Text style={styles.summary}>Saldo: R$ {saldo.toFixed(2)}</Text>
        <Text style={styles.summary}>Entradas: R$ {entradas.toFixed(2)}</Text>
        <Text style={styles.summary}>Saídas: R$ {saidas.toFixed(2)}</Text>
      </View>

      <Text style={styles.graphTitle}>Gráfico de Barras</Text>
      <BarChart
        data={{
          labels: dataLabels,
          datasets: [{ data: dataValues }],
        }}
        width={Dimensions.get('window').width - 40}
        height={220}
        fromZero
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={chartConfig}
        style={styles.chart}
      />

      <Text style={styles.graphTitle}>Gráfico de Linha</Text>
      <LineChart
        data={{
          labels: dataLabels,
          datasets: [{ data: dataValues }],
        }}
        width={Dimensions.get('window').width - 40}
        height={220}
        fromZero
        yAxisLabel=""
        yAxisSuffix="R$"
        chartConfig={chartConfig}
        style={styles.chart}
      />
    </ScrollView>
  );
}

const chartConfig = {
  backgroundColor: '#111',
  backgroundGradientFrom: '#222',
  backgroundGradientTo: '#333',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: { borderRadius: 16 },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#007AFF',
  },
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  title: { fontSize: 26, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  summaryContainer: { marginBottom: 20 },
  summary: { color: '#fff', fontSize: 16, marginBottom: 5 },
  graphTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  chart: { borderRadius: 16, marginBottom: 20 },
});
