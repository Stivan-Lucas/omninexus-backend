# ⚡ Omninexus Backend (Bun + Fastify)

O **Omninexus Backend** é o motor de processamento de telemetria do ecossistema Omninexus. Ele foi projetado para ser ultra-rápido, utilizando o runtime **Bun** e o framework **Fastify** para receber, validar e persistir os dados enviados pelo [Omninexus Agent](https://github.com/Stivan-Lucas/omninexus-agent).

## 🚀 Tecnologias

- **Runtime:** [Bun](https://bun.sh/) (Performance superior ao Node.js)
- **Framework:** [Fastify](https://www.fastify.io/) (Foco em baixo overhead)
- **ORM:** [Prisma](https://www.prisma.io/) (Tipagem forte para o banco de dados)
- **Validação:** [Zod](https://zod.dev/) (Esquemas de dados seguros)
- **Linter/Formatter:** [Biome](https://biomejs.dev/)
- **Versionamento:** Semantic Release

---

## 🏗️ Arquitetura e Dados

O backend expõe endpoints de alta performance para receber o payload JSON estruturado do Agente Rust.

### Entidades Principais (Prisma):

- **Host**: Informações persistentes da máquina (Hostname, OS, etc).
- **Metrics**: Histórico de telemetria (CPU, RAM, GPU, Disco).
- **Network**: Logs de tráfego de rede por interface.

---

## 📦 Ciclo de Versão

Assim como todo o ecossistema, este repositório utiliza **Semantic Release** via GitHub Actions.

| Tipo de Commit | Versão  | Descrição                                      |
| -------------- | ------- | ---------------------------------------------- |
| `feat:`        | `Minor` | Novo endpoint ou mudança no schema do banco.   |
| `fix:`         | `Patch` | Correção de bugs de lógica ou validação.       |
| `chore:`       | `None`  | Atualização de dependências ou configs do Bun. |

---

## 🛠️ Instalação e Configuração

### Pré-requisitos

- [Bun](https://bun.sh) instalado.
- Banco de Dados (PostgreSQL/MySQL/SQLite conforme seu `.env`).

### Setup Inicial

```bash
# 1. Instalar dependências
bun install

# 2. Configurar variáveis de ambiente
cp .env.example .env

# 3. Rodar as migrações do banco de dados
bun run db:migrate

# 4. Iniciar o servidor em desenvolvimento
bun run dev

```

### Scripts Disponíveis

- `bun run start`: Inicia o servidor em produção.
- `bun run db:studio`: Abre a interface visual do Prisma para explorar os dados.
- `bun run generate`: Atualiza o Prisma Client.
- `bun run lint`: Valida o código com Biome.

---

## 📡 Integração com o Agente

O Agente Rust envia dados para este backend via POST. O formato esperado segue a tipagem definida em `src/schemas/telemetry.ts` (validada com Zod), garantindo que apenas dados íntegros entrem no banco.

---

## 🔗 Projetos Relacionados

- **Agent (Rust):** [omninexus-agent](https://github.com/Stivan-Lucas/omninexus-agent)
- **Frontend (Next.js):** [omninexus-frontend](https://www.google.com/search?q=https://github.com/Stivan-Lucas/omninexus-frontend)

---

_Omninexus: Telemetria em tempo real com a velocidade do Bun._
