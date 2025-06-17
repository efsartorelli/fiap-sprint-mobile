import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

export default function Suggestions() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const openSupport = () => {
    Linking.openURL('https://www.melhorinvestimento.com'); // Link de exemplo
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sugestões de Investimento e Controle</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>💰 Invista seu dinheiro</Text>
        <Text style={styles.cardText}>
          Ao invés de apostar, você pode investir em:
          {'\n'}- Tesouro Direto
          {'\n'}- CDBs de Bancos
          {'\n'}- Fundos de Investimento
          {'\n'}- Ações ou ETFs
          {'\n'}- Criptomoedas (com cautela)
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Controle seus Gastos</Text>
        <Text style={styles.cardText}>
          - Defina um limite mensal para lazer e apostas.
          {'\n'}- Monitore seus gastos regularmente.
          {'\n'}- Priorize sua reserva de emergência.
          {'\n'}- Use este app para acompanhar seus gastos.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🧠 Cuide da sua Saúde Mental</Text>
        <Text style={styles.cardText}>
          - Evite apostas impulsivas.
          {'\n'}- Busque apoio de amigos, familiares ou profissionais.
          {'\n'}- Se necessário, procure ajuda especializada.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.helpButton}
        onPress={openSupport}
      >
        <Text style={styles.helpButtonText}>🆘 Buscar Ajuda</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('HomeTabs')}
      >
        <Text style={styles.backButtonText}>⬅️ Voltar ao Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 20 },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    color: '#ccc',
    fontSize: 14,
  },
  helpButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  helpButtonText: { color: '#fff', fontWeight: 'bold' },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButtonText: { color: '#fff', fontWeight: 'bold' },
});
