import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@types/navigation';

export default function Welcome() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CASH CONTROL</Text>
      <Text style={styles.subtitle}>Seu controle financeiro na palma da mão</Text>

      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Cadastrar" variant="secondary" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { color: '#ccc', fontSize: 16, marginBottom: 40 }
});
