🛡️ OmniNexus Ecosystem - Next-Gen RMM
O OmniNexus é uma plataforma de Monitoramento e Gerenciamento Remoto (RMM) de alta performance, projetada para escalar horizontalmente. Utilizando um agente ultraleve em Rust e um backend reativo com Bun e Kafka, ele entrega telemetria em tempo real com baixo consumo de recursos.
🚀 A Dor que Resolvemos
Manter parques tecnológicos de diversas empresas é um desafio de visibilidade e proatividade. O OmniNexus cura as seguintes dores:
 * Falta de Visibilidade em Tempo Real: Chega de descobrir que um servidor parou apenas quando o cliente liga.
 * Sobrecarga de Infraestrutura: Diferente de RMMs pesados, nossa ingestão via Kafka permite processar milhões de métricas sem travar o banco de dados principal.
 * Custo de Operação: O agente em Rust consome < 5MB de RAM, permitindo monitorar desde máquinas legadas até servidores de alta performance sem impacto ao usuário final.
 * Decisões Baseadas em Dados: Separação clara entre inventário (estático) e telemetria (dinâmica) para relatórios precisos.
🛠️ Stack Tecnológica
 * Runtime: Bun (Backend de ultra performance)
 * Framework: Fastify (O mais rápido para Node/Bun)
 * Mensageria: Apache Kafka (Ingestão de dados distribuída)
 * ORM: Drizzle ORM (Type-safety e performance SQL)
 * Banco de Dados: PostgreSQL (Escrita/Leitura segregadas)
 * Cache/Rate Limit: Redis
 * Agent: Rust (Segurança de memória e velocidade)
⚙️ Como Rodar o Projeto
Pré-requisitos
 * Bun instalado.
 * Docker e Docker Compose.
Passo a Passo
 * Clone o repositório:
   git clone https://github.com/Stivan-Lucas/backend.git
cd backend

 * Configure as variáveis de ambiente:
   cp .env.example .env

 * Suba a infraestrutura (Postgres, Kafka, Redis):
   docker-compose up -d

 * Instale as dependências:
   bun install

 * Execute as migrações do banco:
   bun run db:generate
bun run db:push

 * Inicie o servidor de desenvolvimento:
   bun run dev

A documentação interativa (Scalar/Swagger) estará disponível em: http://localhost:3000/docs
🤝 Contribuindo
Adoramos contribuições! Para manter a organização, siga estes passos:
 * Faça um Fork do projeto.
 * Crie uma Branch para sua funcionalidade (git checkout -b feature/minha-feature).
 * Faça o Commit seguindo o padrão abaixo.
 * Abra um Pull Request detalhando as mudanças.
📝 Padrão de Commits
Este projeto utiliza Conventional Commits para manter o histórico limpo e facilitar o versionamento automático.
| Tipo | Descrição |
|---|---|
| feat: | Nova funcionalidade. |
| fix: | Correção de bug. |
| docs: | Alterações apenas na documentação. |
| style: | Alterações de formatação (sem mudar lógica). |
| refactor: | Refatoração de código que não altera comportamento. |
| test: | Adição ou correção de testes. |
Exemplo: feat(auth): implementa rate limit com redis
📄 Licença
Distribuído sob a licença Apache-02. Veja LICENSE para mais informações.
Desenvolvido com ☕ e Rust por Stivan Lucas.
O que você achou dessa estrutura?