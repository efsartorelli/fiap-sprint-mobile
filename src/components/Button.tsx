import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
};

export default function Button({ title, onPress, variant = 'primary' }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant]]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold'
  },
  primary: {
    backgroundColor: '#0A84FF'
  },
  secondary: {
    backgroundColor: '#333'
  },
  danger: {
    backgroundColor: '#FF3B30'
  }
});
