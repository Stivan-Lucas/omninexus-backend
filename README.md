# 🛡️ OmniNexus Ecosystem - Next-Gen RMM

![Bun](https://img.shields.io/badge/Bun-%23000000.svg?style=for-the-badge&logo=bun&logoColor=white)
![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

O **OmniNexus** é uma plataforma de Monitoramento e Gerenciamento Remoto (RMM) de alta performance, projetada para escala horizontal. Utilizando um agente ultraleve em **Rust** e um backend reativo com **Bun** e **Kafka**, ele entrega telemetria eficiente com baixo consumo de recursos e isolamento multi-tenant.

---

## 🚀 A Dor que Resolvemos

Manter parques tecnológicos de diversas empresas exige visibilidade proativa. O OmniNexus cura as seguintes dores:

* **Falta de Visibilidade em Tempo Real:** Monitoramento constante de saúde de hardware e software.
* **Sobrecarga de Infraestrutura:** Ingestão via Kafka que permite processar milhões de métricas sem travar o banco de dados principal (escrita otimizada).
* **Custo de Operação:** Agente em Rust que consome < 5MB de RAM, ideal para máquinas legadas ou servidores críticos.
* **Sincronização Diferencial:** Separação entre Inventário (estático) e Telemetria (dinâmica) para reduzir o tráfego de rede.

---

## 🛠️ Stack Tecnológica

* **Runtime:** [Bun](https://bun.sh/) (Performance de ultra-baixa latência)
* **Framework:** [Fastify](https://www.fastify.io/) (Ecosystem orientado a plugins e velocidade)
* **Mensageria:** [Apache Kafka](https://kafka.apache.org/) (Streaming de dados e resiliência)
* **ORM:** [Drizzle ORM](https://orm.drizzle.team/) (Type-safety e performance SQL nativa)
* **Bancos de Dados:** PostgreSQL (Segregação de Read/Write) e Redis (Cache/Rate Limit)
* **Agent:** Rust (Segurança de memória e baixo overhead)
* **Documentação:** Scalar UI / Swagger

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
* [Bun](https://bun.sh/) instalado.
* [Docker](https://www.docker.com/) e Docker Compose.

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/Stivan-Lucas/backend.git](https://github.com/Stivan-Lucas/backend.git)
    cd backend
    ```

2.  **Configure o ambiente:**
    ```bash
    cp .env.example .env
    ```

3.  **Suba os containers (Postgres, Kafka, Redis):**
    ```bash
    docker-compose up -d
    ```

4.  **Instale as dependências:**
    ```bash
    bun install
    ```

5.  **Prepare o Banco de Dados:**
    ```bash
    bun run db:generate
    bun run db:push
    ```

6.  **Inicie o servidor:**
    ```bash
    bun run dev
    ```

Acesse a documentação em: `http://localhost:3000/docs`

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

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---
**Desenvolvido com ☕ por Stivan Lucas.**
