# Weather Dashboard

Aplicação moderna de dashboard meteorológico desenvolvida com React, TypeScript e Vite, fornecendo visualização completa de dados climáticos em tempo real e históricos.

## 🌟 O que o projeto resolve

O Weather Dashboard oferece uma interface intuitiva para:

- **Busca de Cidades**: Pesquisa rápida e intuitiva de localidades worldwide
- **Dados em Tempo Real**: Temperatura atual, umidade, condições climáticas
- **Previsão de 7 Dias**: Visualização gráfica de temperatura e precipitação
- **Dados Históricos**: Análise dos últimos 7 dias de clima
- **Interface Responsiva**: Design adaptável para desktop e mobile
- **Experiência Rica**: Animações suaves e feedback visual

## 🛠️ Stack Utilizada

### **Frontend**
- **React 18** - Biblioteca principal para construção da UI
- **TypeScript** - Tipagem estática para maior robustez
- **Vite** - Build tool rápido e moderno
- **CSS3** - Estilização com variáveis e design responsivo

### **Visualização de Dados**
- **Recharts** - Biblioteca para gráficos interativos (LineChart, BarChart)
- **Custom Components** - Componentes específicos para temperatura e precipitação

### **APIs Externas**
- **Open-Meteo API** - Dados meteorológicos gratuitos e precisos
  - Geocoding API para busca de cidades
  - Forecast API para previsões
  - Archive API para dados históricos

### **Testes e Qualidade**
- **Vitest** - Framework de testes rápido e moderno
- **React Testing Library** - Testes focados no comportamento do usuário
- **MSW (Mock Service Worker)** - Mock de APIs para testes consistentes
- **ESLint** - Análise estática de código

### **IA no Processo**
- **Cascade AI** - Assistente de desenvolvimento para:
  - Geração de código boilerplate
  - Implementação de componentes
  - Criação de testes unitários
  - Debug e otimização
  - Boas práticas de desenvolvimento

## 📁 Estrutura de Pastas

```
weather-dashboard/
├── public/                 # Assets estáticos
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/            # Imagens e recursos
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/         # Componentes React
│   │   ├── __tests__/     # Testes dos componentes
│   │   │   ├── TemperatureChart.test.tsx
│   │   │   └── WeatherSearch.test.tsx
│   │   ├── RainForecastChart.tsx
│   │   ├── RainHistoryChart.tsx
│   │   ├── TemperatureChart.tsx
│   │   ├── TemperatureHistoryChart.tsx
│   │   └── WeatherSearch.tsx
│   ├── services/          # Lógica de API
│   │   ├── __tests__/     # Testes dos serviços
│   │   │   └── weatherApi.test.ts
│   │   └── weatherApi.ts
│   ├── test/             # Configuração de testes
│   │   └── setup.ts      # MSW setup
│   ├── types/            # Tipos TypeScript
│   │   └── weather.ts
│   ├── utils/            # Funções utilitárias
│   │   └── __tests__/     # Testes das utilitárias
│   │       └── dateUtils.test.ts
│   ├── App.css           # Estilos do componente principal
│   ├── App.tsx           # Componente principal da aplicação
│   ├── index.css         # Estilos globais
│   └── main.tsx         # Ponto de entrada
├── package.json          # Dependências e scripts
├── tsconfig.json        # Configuração TypeScript
├── vite.config.ts       # Configuração Vite
└── vitest.config.ts     # Configuração Vitest
```

## 🚀 Como Instalar e Executar

### **Pré-requisitos**
- Node.js 18+ 
- npm ou yarn

### **Instalação**
```bash
# Clonar o repositório
git clone <repository-url>
cd weather-dashboard

# Instalar dependências
npm install
```

### **Execução em Desenvolvimento**
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Acessar a aplicação
# http://localhost:5173
```

### **Build para Produção**
```bash
# Criar build otimizado
npm run build

# Previsualizar build
npm run preview
```

## 🧪 Como Rodar os Testes

### **Executar Todos os Testes**
```bash
# Executar uma vez
npm run test:run

# Modo watch (reexecuta quando arquivos mudam)
npm run test

# Interface visual dos testes
npm run test:ui

# Gerar relatório de cobertura
npm run test:coverage
```

### **Estrutura dos Testes**
- **API Services**: Testes de integração com Open-Meteo
- **Componentes**: Testes de renderização e interações
- **Utilitárias**: Testes de funções de formatação e processamento
- **Mock Setup**: MSW para simular respostas de API

### **Resultados Esperados**
```
✅ 35 testes passando
✅ 0 testes falhando
✅ Cobertura completa de funcionalidades
```

## 🤖 Como a IA foi Usada no Processo

### **Fases de Desenvolvimento com Cascade AI**

1. **Setup Inicial**
   - Configuração do projeto React + TypeScript + Vite
   - Definição da estrutura de pastas
   - Instalação de dependências

2. **Implementação de Features**
   - Criação de tipos TypeScript para dados meteorológicos
   - Implementação de serviços de API com Open-Meteo
   - Desenvolvimento de componentes React
   - Integração de gráficos com Recharts

3. **Estilização e UX**
   - Design responsivo com CSS3
   - Sistema de cores temático
   - Animações e transições

4. **Testes Automatizados**
   - Configuração do ambiente de testes (Vitest + MSW)
   - Criação de testes unitários para todas as camadas
   - Mock de APIs para testes consistentes
   - Validação de comportamentos e edge cases

5. **Otimização e Refinamento**
   - Correção de bugs e edge cases
   - Otimização de performance
   - Melhoria de mensagens de erro
   - Documentação completa