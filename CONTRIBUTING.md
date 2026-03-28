# 🛠️ Guia de Contribuição - OmniNexus Backend

Obrigado por se interessar em evoluir o motor do **OmniNexus**! Este projeto segue padrões rígidos de engenharia de software para garantir que o ecossistema RMM permaneça performático, resiliente e escalável.

Este documento detalha o workflow necessário para manter a qualidade "Elite" do código.

---

## ⚙️ Configuração do Ambiente de Desenvolvimento

### 1. Pré-requisitos
Certifique-se de ter as seguintes ferramentas instaladas:
* **Runtime:** [Bun](https://bun.sh/) (Obrigatório - não utilizamos Node/NPM)
* **Infraestrutura:** [Docker](https://www.docker.com/) & Docker Compose
* **Linter/Formatter:** [Biome](https://biomejs.dev/) & [Oxlint](https://github.com/oxc-project/oxlint)

### 2. Instalação Passo a Passo
1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Stivan-Lucas/backend.git](https://github.com/Stivan-Lucas/backend.git)
    cd backend
    ```

2.  **Instale as dependências:**
    ```bash
    bun install
    ```
    *Nota: O Husky será inicializado automaticamente para configurar os Git Hooks.*

3.  **Configure as variáveis de ambiente:**
    ```bash
    cp .env.example .env
    ```

4.  **Inicie os serviços (PostgreSQL, Kafka, Redis):**
    ```bash
    docker-compose up -d
    ```

5.  **Rode o servidor em modo de desenvolvimento:**
    ```bash
    bun run dev
    ```

---

## 📜 Padrões de Código e Governança

### 🛡️ Git Hooks (Husky & Commitlint)
Para manter um histórico de releases limpo e automatizado, utilizamos **Conventional Commits**.

Se você tentar realizar um commit fora do padrão, o **Husky** irá bloquear a ação. O formato obrigatório é:
`tipo(escopo): descrição curta em minúsculas`

**Tipos aceitos:**
* `feat:` Nova funcionalidade ou endpoint.
* `fix:` Correção de bug.
* `docs:` Alterações na documentação (README, CONTRIBUTING).
* `refactor:` Mudança de código que não altera comportamento nem adiciona feature.
* `chore:` Atualização de dependências, builds ou configurações.
* `test:` Adição ou correção de testes.

> **Exemplo:** `feat(auth): implementa validação de JWT via middleware`

### 🧹 Linting e Formatação
Antes de abrir um Pull Request, seu código deve passar pela análise estática. O backend do OmniNexus utiliza ferramentas de ultra-performance:
* **Biome:** Para formatação e linting rápido.
* **Oxlint:** Para capturar erros de lógica e performance no código.

```bash
# Rodar linter
bun x oxlint
```

---

## 🧪 Qualidade (Definition of Done)

Para que uma **Issue** seja fechada ou um **Pull Request** seja aceito, os seguintes critérios devem ser atendidos:

1.  **Build:** O projeto deve compilar sem erros via `bun run build`.
2.  **Testes:** Novos endpoints devem possuir testes funcionais no **Bun Test** (`bun test`).
3.  **Documentação:** Se houver mudança em rotas ou schemas (Drizzle/Zod), a documentação no **Scalar/Swagger** (`/docs`) deve ser validada e atualizada.
4.  **I18n:** Mensagens de erro ou sucesso devem ser adicionadas aos arquivos de tradução do `i18next`.

---

## 🚀 Fluxo de Trabalho (Issues & PRs)

1.  **Encontre ou abra uma Issue:** Utilize nossos templates de Bug Report ou Feature Request antes de começar a codar.
2.  **Crie uma Branch:** Siga o padrão `feature/nome-da-feature` ou `fix/nome-do-bug`.
3.  **Submeta um PR:** Descreva as mudanças técnicas e vincule à Issue correspondente (ex: `Closes #123`).

---
**Desenvolvido com foco em performance por Stivan Lucas.**
```
