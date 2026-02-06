# InfoInsight Admin Template

Este é o sistema base da InfoInsight, desenvolvido com **React 19**, **Tailwind CSS** e **TypeScript**. O projeto segue uma estrutura organizada e escalável para facilitar a manutenção e a integração de novos desenvolvedores.

## 📂 Estrutura do Projeto

O código-fonte principal reside no diretório `src/`, seguindo uma separação clara de responsabilidades:

- `src/components/`
  - `ui/`: Componentes base reutilizáveis (Botões, Inputs, Cards, etc).
  - `layout/`: Componentes de estrutura (Header, Sidebar, Layouts de autenticação e admin).
  - `Icons.tsx`: Centralização de ícones utilizados no projeto.
- `src/context/`: Provedores de estado global (Tema, Tabs, Toasts).
- `src/pages/`: Telas da aplicação organizadas por funcionalidade.
  - `Users/`: Gestão de usuários (Listagem, Criação, Edição).
  - `Auth/`: Telas de Login, Registro e Recuperação.
  - `Settings/`: Configurações de perfil e sistema.
- `src/lib/`: Utilitários, funções auxiliares e instâncias de bibliotecas.
- `src/App.tsx`: Definição de rotas e estrutura principal.
- `src/index.tsx`: Ponto de entrada da aplicação.
- `src/index.css`: Estilos globais e diretivas do Tailwind.

## 🛠️ Melhores Práticas & Documentação

### Aliases de Importação
Utilizamos o alias `@/` para referenciar o diretório `src/`. Isso evita caminhos relativos longos (como `../../../`) e facilita a movimentação de arquivos.
*Exemplo:* `import { Button } from '@/components/ui/Button'`

### Clean Code e UI Pronta
- Componentes modulares e tipados com TypeScript.
- Design System integrado com Tailwind CSS.
- Transições suaves e suporte nativo a Tema Dark/Light.
- Feedback visual instantâneo via sistema de Toasts.

## 🚀 Como rodar localmente

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Build para produção**:
   ```bash
   npm run build
   ```

---
Desenvolvido por InfoInsight.
