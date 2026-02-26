# 🌌 Omni Nexus - Back End

> Backend robusto, performático e tipado para servir dados sem gargalo.

Este projeto utiliza o runtime **Bun** para máxima performance, **Fastify** como framework web e um ecossistema de observabilidade completo com **Grafana**.

---

## 🛠️ Tecnologias Principais

- **Runtime:** [Bun](https://bun.sh/)
- **Framework:** [Fastify](https://www.fastify.io/)
- **Linter & Formatter:** [Biome](https://biomejs.dev/)
- **Validação:** [Zod](https://zod.dev/)
- **Logs:** [Pino](https://github.com/pinojs/pino)
- **Observabilidade:** [Grafana](https://grafana.com/) & [Prometheus](https://prometheus.io/)
- **Automação:** [Semantic Release](https://github.com/semantic-release/semantic-release) & [Husky](https://typicode.github.io/husky/)

---

## 🚀 Como começar

### Pré-requisitos

- [Bun](https://bun.sh/) instalado.
- [Docker](https://www.docker.com/) instalado.

### Instalação

```bash
# Instale as dependências
$ bun install

# Configure as variáveis de ambiente
$ cp .env.example .env

```

### Banco de dados e métricas (Grafana)

Para subir a infraestrutura de dados e o dashboard de monitoramento:

```bash
$ docker compose -f 'backend/docker-compose.yml' up -d --build

```

> Após subir o container, o **Grafana** estará disponível em `http://localhost:3000` para visualização das métricas do backend.

### Desenvolvimento

```bash
# Rodar em modo watch (hot reload)
$ bun dev

# Build do projeto
$ bun build src/server.ts --outdir dist --target bun

```

---

## 🏗️ Padrões de Código

Este projeto utiliza o **Biome** para garantir que o código esteja sempre limpo e formatado.

- **Check:** `bun check` (verifica erros e formatação)
- **Fix:** `bun format` (aplica correções automáticas)

---

## 📦 Automação de Versão & Commits

Utilizamos **Conventional Commits**. Isso permite que o `semantic-release` gere automaticamente o arquivo `CHANGELOG.md` e atualize a versão no `package.json`.

### Como fazer o commit

Para o seu commit ser aceito e a automação de versão funcionar, use um dos prefixos padrões:

| Prefixo  | Descrição               | Gera Versão?    |
| -------- | ----------------------- | --------------- |
| `feat:`  | Nova funcionalidade     | **Sim (Minor)** |
| `fix:`   | Correção de erro        | **Sim (Patch)** |
| `perf:`  | Melhoria de performance | **Sim (Patch)** |
| `chore:` | Manutenção ou deps      | Não             |
| `docs:`  | Mudança em documentação | Não             |

#### Exemplos:

- **Nova funcionalidade:**

```bash
$ git commit -m "feat: adiciona rota de login"

```

- **Correção de erro:**

```bash
$ git commit -m "fix: corrige erro de conexão com banco"

```

> **Nota:** Se você tentar realizar um commit fora desse padrão, o **Husky** irá bloquear a ação automaticamente via `commitlint`.

---

## 📝 Licença

Distribuído sob a licença **Apache-2.0**. Veja `LICENSE` para mais informações.
