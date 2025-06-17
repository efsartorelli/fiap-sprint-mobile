import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@types/navigation';

export default function Register() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <Button title="Cadastrar e Entrar" onPress={() => navigation.navigate('HomeTabs', { screen: 'Dashboard' })} />
      <Button title="Voltar" variant="secondary" onPress={() => navigation.navigate('Welcome')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 20 }
});
