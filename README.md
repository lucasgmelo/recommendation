# Recomendador de Produtos

![demo](https://github.com/user-attachments/assets/a53768e1-0f78-4cc1-b051-420d5f09c07b)


Monorepo contendo a aplicação completa de recomendação de produtos
Para documentação técnica completa do frontend, consulte o [README do frontend](./frontend/README.md).

## Estrutura

```
recommendation/
├── frontend/          # Aplicação React + TypeScript
├── backend/           # API Mock (json-server)
└── package.json       # Configuração do monorepo
```

## Tecnologias

### Frontend

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Query** - Server state
- **React Hook Form** - Form management
- **Vitest** - Testing (92.67% coverage)

### Backend

- **json-server** - REST API mock

### Monorepo

- **Lerna** + **npm workspaces** - Monorepo management
- **concurrently** - Parallel execution

## Início Rápido

### Pré-requisitos

- Node.js >= 18.3.0
- npm >= 9.0.0

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd recommendation

# Instale as dependências
./install.sh
```

### Executar

```bash
# Iniciar frontend e backend
npm run dev
```

Aplicação disponível em `http://localhost:3000`

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia frontend e backend
npm run dev:frontend     # Apenas frontend
npm run dev:backend      # Apenas backend

# Testes
npm run test:frontend    # Executa testes
npm run test:coverage    # Testes com cobertura

# Build
npm run build:frontend   # Build de produção

# Qualidade
npm run lint:frontend    # ESLint
npm run lint:fix         # Corrige automaticamente
```
