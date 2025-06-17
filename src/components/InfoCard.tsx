import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  value: number;
  color?: string;
};

export default function InfoCard({ title, value, color = '#0A84FF' }: Props) {
  return (
    <View style={[styles.card, { borderColor: color }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color }]}>{value.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center'
  },
  title: {
    color: '#fff',
    marginBottom: 8
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
