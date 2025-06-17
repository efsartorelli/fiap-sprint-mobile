===============================
💸 CASH CONTROL — Aplicativo Mobile
===============================

📌 Descrição:
Cash Control é um aplicativo mobile desenvolvido com React Native (via Expo) que auxilia usuários no controle dos seus gastos, especialmente relacionados a apostas. O app oferece visualização de saldo, histórico detalhado, gráficos intuitivos, além de alertas inteligentes que ajudam a reduzir comportamentos impulsivos e incentiva alternativas de investimento.

---------------------------------------
🛠️ Tecnologias Utilizadas
---------------------------------------
- React Native + Expo
- TypeScript
- React Navigation (Stack + Tabs)
- AsyncStorage (armazenamento local)
- react-native-chart-kit (gráficos)
- Context API (gerenciamento de dados)
- Styled com suporte a Dark Mode

---------------------------------------
📱 Funcionalidades do App
---------------------------------------

🔐 Autenticação
- Login com persistência de sessão
- Cadastro simples e eficiente

🏠 Dashboard (Home)
- Exibição de saldo, entradas e saídas
- Acesso rápido para adicionar transações
- Botões para histórico, estatísticas e logout

➕ Adicionar Transação
- Escolha entre Entrada ou Saída
- Seleção de categoria (para saída) ou método (para entrada)
- Alerta inteligente se gastos com apostas ultrapassarem 20% do saldo
- Sugestões de investimento se desejar

📜 Histórico
- Listagem detalhada de todas as transações
- Mostra valor, categoria/método, tipo (entrada ou saída) e data/hora

📊 Estatísticas
- Gráfico de linha com evolução do saldo
- Gráfico de barras comparando entradas e saídas
- Análise do quanto foi gasto em apostas
- Médias semanais e mensais
- Opção para limpar histórico

📈 Sugestões / Ajuda
- Tela com dicas de investimento
- Recomendações de controle financeiro
- Suporte para quem busca auxílio

🚩 Popups Inteligentes
- Quando os gastos com apostas ultrapassam 20% do saldo
- Oferece opções: Cancelar, Ver Sugestões ou Continuar

🌙 Modo Escuro
- Suporte total ao Dark Mode em todas as telas

---------------------------------------
📁 Estrutura do Projeto
---------------------------------------

CashControl/
├── assets/               → imagens e ícones
├── components/           → botões, cards, gráficos, popups
├── contexts/             → FinanceContext (gerencia dados financeiros)
├── navigation/           → configuração de rotas (stack e tabs)
├── screens/              → todas as telas (Dashboard, AddTransaction, History, etc.)
└── App.tsx               → arquivo principal

---------------------------------------
▶️ Como Executar o Projeto
---------------------------------------

1. Clone o repositório:
   git clone [https://github.com/efsartorelli/fiap-sprint-mobile]

2. Acesse a pasta:
   cd cash-control

3. Instale as dependências:
   npm install

4. Inicie o projeto:
   npx expo start

---------------------------------------
▶️ Link do FIGMA
---------------------------------------

1. https://www.figma.com/design/rL0GIANtm7AQXPnQ03zbaK/Untitled?node-id=0-1&p=f&t=iYpO5Goe6zZyctVe-0

---------------------------------------
📦 Instale também:
---------------------------------------

npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-chart-kit react-native-svg
npm install @react-native-async-storage/async-storage
npm install react-native-uuid

---------------------------------------
👨‍💻 Autores
---------------------------------------
- Eduardo de Oliveira Nistal — RM94524  
- Enzo Vazquez Sartorelli — RM94618  
- Kaue Pastori — RM98501  
- Nicolas Nogueira Boni — RM551965  
- Rodrigo Viana — RM551057  

---------------------------------------
📚 Observações Finais
---------------------------------------
- Projeto acadêmico com fins educativos
- Todos os dados são armazenados localmente com AsyncStorage
- Não há integração com banco de dados externo
- Foco na experiência do usuário, design acessível e controle financeiro consciente
