# 🛡️ OmniNexus Ecosystem - Next-Gen RMM

![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka)
![I18N](https://img.shields.io/badge/i18n-integrated-61dafb?style=for-the-badge&logo=i18next)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/drizzle-orm-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)

[![GitHub Release](https://img.shields.io/github/v/release/Stivan-Lucas/backend?style=flat-square&color=7c3aed)](https://github.com/Stivan-Lucas/backend/releases)
[![CI Status](https://github.com/Stivan-Lucas/backend/actions/workflows/ci.yml/badge.svg)](https://github.com/Stivan-Lucas/backend/actions/workflows/ci.yml)
[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
![GitHub Last Commit](https://img.shields.io/github/last-commit/Stivan-Lucas/backend?style=flat-square)

O **OmniNexus** é uma plataforma de Monitoramento e Gerenciamento Remoto (RMM) de alta performance, projetada para escala horizontal e telemetria eficiente. O **OmniNexus Backend** atua como o motor de processamento central do ecossistema, utilizando o runtime **Bun** e o framework **Fastify** para entregar um processamento reativo de ultra-baixa latência.

Integrado ao **OmniNexus Agent** (escrito em **Rust**) e ao **Apache Kafka**, o backend é capaz de receber, validar e persistir grandes volumes de dados com isolamento multi-tenant e baixo consumo de recursos, garantindo resiliência e escalabilidade para parques tecnológicos de qualquer tamanho.

---

## 🚀 A Dor que Resolvemos

Manter parques tecnológicos exige visibilidade proativa. O OmniNexus cura as seguintes dores:

* **Falta de Visibilidade em Tempo Real:** Monitoramento constante de saúde de hardware e software.
* **Sobrecarga de Infraestrutura:** Ingestão via Kafka para processar métricas sem travar o banco principal.
* **Custo de Operação:** Agente em Rust que consome < 5MB de RAM, ideal para máquinas legadas.
* **Sincronização Diferencial:** Separação inteligente entre Inventário e Telemetria.

---

## 🌍 Global Infrastructure (I18n)

O backend do OmniNexus é totalmente internacionalizado utilizando `i18next`. Todas as respostas de erro, mensagens de sucesso e validações respeitam a localidade do usuário.

### Detecção de Idioma
O sistema detecta automaticamente o idioma preferido através do header padrão HTTP:
* **Header:** `Accept-Language`
* **Idiomas Suportados:** `pt-BR` (Português), `en` (English - Fallback).
* **Injection:** O backend responde com o header `Content-Language` para confirmar o idioma da resposta.

**Exemplo de uso:**
```http
GET / HTTP/1.1
Host: api.omninexus.com.br
Accept-Language: pt-BR
```

---

## 🧪 Qualidade e Testes (CI/CD)

Garantimos a estabilidade do ecossistema através de uma pipeline de Integração Contínua (CI) robusta.

* **Linting:** Utilizamos o **Biome** para análise estática de código e formatação ultrarrápida.
* **Automated Tests:** Suíte de testes funcionais e integrados rodando sobre o **Bun Test**.
* **GitHub Actions:** Cada Pull Request é validado automaticamente. O merge só é permitido se o lint e os testes passarem (Green Build).

### Como rodar os testes localmente:
```bash
# Rodar todos os testes uma vez
bun test

# Rodar em modo watch (desenvolvimento)
bun test --watch
```

---

## 🛠️ Stack Tecnológica

* **Runtime:** [Bun](https://bun.sh/)
* **Framework:** [Fastify](https://www.fastify.io/) (Zod Type Provider)
* **Segurança:** Rate Limiting por IP/Token.
* **Doc:** [Scalar](https://scalar.com/) (Interface moderna para OpenAPI/Swagger)
* **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
* **Agent:** Rust

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
* [Bun](https://bun.sh/) instalado.
* [Docker](https://www.docker.com/) e Docker Compose.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Stivan-Lucas/backend.git
    cd backend
    ```

2.  **Configure o ambiente:**
    ```bash
    cp .env.example .env
    ```

3.  **Inicie a infraestrutura:**
    ```bash
    docker-compose up -d
    ```

4.  **Instale e rode:**
    ```bash
    bun install
    bun run dev
    ```

Acesse a documentação em: `http://localhost:3000/docs`
> **Nota:** Utilize as credenciais definidas no seu `.env` (`SAGGER_USER` / `SAGGER_PASS`) para acessar.

---

## 🗄️ Gestão de Banco de Dados (Drizzle ORM)

O OmniNexus utiliza o **Drizzle ORM** para garantir máxima performance e *Type Safety*. O gerenciamento do banco de dados (PostgreSQL) é feito através do Bun, utilizando os seguintes comandos:

### Fluxo de Trabalho

Sempre que você alterar o arquivo `src/database/schema.ts`, utilize os comandos abaixo de acordo com a sua necessidade:

| Comando | Descrição | Quando usar? |
| :--- | :--- | :--- |
| `bun run db:push` | Sincroniza o schema diretamente com o banco. | Durante o desenvolvimento rápido (Prototipagem). |
| `bun run db:generate` | Gera arquivos SQL de migração na pasta `/drizzle`. | Antes de realizar um **Commit** para versionar o banco. |
| `bun run db:migrate` | Aplica as migrações SQL pendentes no banco. | Em ambientes de **Produção** ou CI/CD. |
| `bun run db:studio` | Abre uma interface técnica para visualizar os dados. | Sempre que precisar validar registros manualmente. |

### Exemplo Prático:
1. Altere uma coluna em `src/database/schema.ts`.
2. Execute `bun run db:push` para testar imediatamente no Docker.
3. Após validar, execute `bun run db:generate` para criar o histórico de migração.
4. Faça o commit dos arquivos gerados na pasta `/drizzle`.

---

## 🤝 Contribuição e Commits

Adoramos contribuições! Para manter a rastreabilidade e o histórico limpo, utilizamos **Conventional Commits**.

### Padrão de Mensagens:
| Tipo | Descrição |
| :--- | :--- |
| `feat:` | Nova funcionalidade. |
| `fix:` | Correção de bug. |
| `docs:` | Alterações na documentação. |
| `refactor:` | Refatoração que não altera comportamento. |
| `test:` | Adição ou correção de testes. |

**Exemplo:** `git commit -m "feat(telemetry): implementa schema de ingestão via kafka"`

### Como contribuir:
1.  Faça um **Fork**.
2.  Crie sua **Branch** (`git checkout -b feature/minha-feature`).
3.  Abra um **Pull Request**.

---

## 📄 Licença

Distribuído sob a licença [Apache-2.0](https://apache.org/licenses/LICENSE-2.0). Veja `LICENSE` para mais informações.

---
**Desenvolvido com ☕ por Stivan Lucas.**
```
