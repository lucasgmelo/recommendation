# 🚀 Recomendador de Produtos RD Station

Uma aplicação React moderna para recomendar produtos da RD Station baseada nas preferências e funcionalidades desejadas pelo usuário.

## ✨ Características

- **Interface Moderna**: Desenvolvida com React 18 e Tailwind CSS
- **Formulários Inteligentes**: Utilizando React Hook Form para validação e controle
- **Algoritmo de Recomendação**: Lógica personalizada para sugestão de produtos
- **Testes Abrangentes**: 36 testes unitários
- **Qualidade de Código**: ESLint, Prettier e Husky configurados
- **TypeScript**: Totalmente tipado para melhor experiência de desenvolvimento

## 🛠️ Stack Tecnológica

### Core

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário

### Formulários & Estado

- **React Hook Form** - Gerenciamento de formulários
- **React Query** - Gerenciamento de estado servidor

### Testes

- **Vitest** - Framework de testes
- **@testing-library/react** - Testes de componentes
- **@vitest/coverage-v8** - Relatórios de cobertura

### Qualidade de Código

- **ESLint** - Linter
- **Prettier** - Formatação de código
- **Husky** - Git hooks
- **lint-staged** - Lint apenas arquivos alterados
- **Commitizen** - Commits padronizados

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <repository-url>

# Entre no diretório
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

## 📝 Scripts Disponíveis

### Desenvolvimento

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build de produção

### Testes

- `npm test` - Executa testes unitários
- `npm run test:coverage` - Executa testes com relatório de cobertura
- `npm run test:ui` - Interface visual dos testes

### Qualidade de Código

- `npm run lint` - Executa ESLint
- `npm run lint:fix` - Corrige problemas automaticamente
- `npm run format` - Formata código com Prettier
- `npm run format:check` - Verifica formatação

### Git

- `npm run commit` - Commit assistido com Commitizen

## 🏗️ Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── Form/            # Componentes do formulário
│   │   ├── Fields/      # Campos do formulário
│   │   └── SubmitButton/ # Botão de submissão
│   ├── RecommendationList/ # Lista de recomendações
│   └── shared/          # Componentes compartilhados
├── hooks/               # Custom hooks
├── services/            # Serviços de API
├── types/               # Definições de tipos
├── mocks/               # Dados mock
```

## 🧪 Testes

O projeto possui uma suíte abrangente de testes:

- **36 testes unitários** cobrindo componentes, hooks e serviços
- **Cobertura de 58%** do código
- **Testes de componentes** com @testing-library/react
- **Mocks** para serviços externos

### Executar Testes

```bash
# Todos os testes
npm test

# Com cobertura
npm run test:coverage

# Interface visual
npm run test:ui
```

## 🔧 Configurações

### ESLint

Configurado com regras para:

- React Hooks
- TypeScript
- Vitest globals
- Prettier integration

### Git Hooks

- **pre-commit**: Executa lint e formatação nos arquivos alterados
- **commit-msg**: Valida mensagens de commit com commitlint

### Commitizen

Commits seguem a convenção:

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Manutenção

## 📊 Algoritmo de Recomendação

O sistema utiliza um algoritmo baseado em pontuação que:

1. **Analisa preferências** do usuário
2. **Avalia funcionalidades** desejadas
3. **Calcula pontuação** para cada produto
4. **Retorna recomendações** ordenadas por relevância
5. **Suporta modo único** ou múltiplos produtos

### Complexidade Computacional

**Complexidade de Tempo: O(n × (p + f))**

- `n` = número de produtos
- `p` = número de preferências por produto
- `f` = número de funcionalidades por produto

**Complexidade de Espaço: O(n)**

- Armazena pontuação para cada produto

**Análise Detalhada:**

- **Iteração sobre produtos**: O(n)
- **Cálculo de pontuação por produto**: O(p + f)
- **Ordenação final**: O(n log n) apenas para múltiplos produtos
- **Complexidade total**: O(n × (p + f)) + O(n log n) = **O(n × (p + f))**

O algoritmo é eficiente para conjuntos moderados de produtos (< 1000) e escala linearmente com o número de produtos e suas características.

## 🎨 Componentes Principais

### Form

Formulário principal com validação e controle de estado.

### Fields

- **Features**: Seleção de funcionalidades
- **Preferences**: Seleção de preferências
- **RecommendationType**: Tipo de recomendação

### RecommendationList

Exibe os produtos recomendados com detalhes.

## 🔄 Fluxo da Aplicação

1. Usuário acessa a aplicação
2. Preenche preferências e funcionalidades
3. Seleciona tipo de recomendação (único/múltiplo)
4. Sistema processa e calcula recomendações
5. Exibe produtos sugeridos
