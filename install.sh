#!/bin/bash

set -e 

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Installing RD Station Product Recommendation System${NC}"
echo ""

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Error: Node.js version 18 or higher is required"
    echo "Current version: $(node -v)"
    exit 1
fi

echo -e "${GREEN}✓ Node.js version check passed${NC}"
echo ""

echo -e "${BLUE}📦 Installing root dependencies...${NC}"
npm install

echo -e "${BLUE}📦 Installing workspace dependencies (frontend + backend)...${NC}"
npm install --workspaces

echo ""
echo -e "${GREEN}✅ Installation completed successfully!${NC}"
echo ""
echo "Available commands:"
echo "  npm run dev              - Start both frontend and backend"
echo "  npm run dev:frontend     - Start frontend only"
echo "  npm run dev:backend      - Start backend only"
echo "  npm run test:frontend    - Run frontend tests"
echo ""

