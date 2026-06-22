# Pedaço de Céu

Catálogo web fictício desenvolvido como projeto de portfólio. A aplicação permite visualizar e gerenciar produtos em um ambiente fullstack containerizado.

**Stack:** React · Node.js · MySQL · Nginx · Docker · Playwright · TypeScript

---

## Como rodar localmente

### Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado
- [mkcert](https://github.com/FiloSottile/mkcert) instalado
- Adicionar `pedacodeceu.local` ao arquivo `C:\Windows\System32\drivers\etc\hosts`:

127.0.0.1 pedacodeceu.local

### Certificado SSL

```bash
mkcert pedacodeceu.local
```

Mova os arquivos gerados para a pasta `nginx/certs/`.

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`.

### Subir a aplicação

```bash
docker-compose up --build
```

Acesse: [https://pedacodeceu.local](https://pedacodeceu.local)

### Rodar os testes

```bash
npx playwright test
```

> Os testes E2E requerem a aplicação rodando (`docker-compose up -d`).
