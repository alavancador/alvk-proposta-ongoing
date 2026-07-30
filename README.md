# ALVK Proposta Ongoing

Microsite de propostas comerciais da ALVK, publicado em:

- Produção: https://proposta.alavancador.com.br/
- Proposta JK Concept: https://proposta.alavancador.com.br/jkconcept

O projeto mantém uma página inicial neutra e publica cada proposta em uma rota própria, sem expor uma listagem pública de clientes.

## Arquitetura

- Vinext e React
- Cloudflare Workers
- ChatGPT Sites
- HTML independente para cada proposta
- Cabeçalhos `noindex`, `nofollow` e `noarchive`
- `robots.txt` bloqueando rastreamento do ambiente

## Estrutura das propostas

Os documentos ficam em `app/proposals/` e são associados às URLs em `app/proposals/registry.ts`.

Para adicionar uma nova proposta:

1. Salve o HTML como `app/proposals/cliente.html`.
2. Importe o arquivo em `app/proposals/registry.ts`.
3. Registre o slug desejado no objeto `proposals`.
4. Valide a URL localmente em `/cliente`.

Exemplo:

```ts
import clienteHtml from "./cliente.html?raw";

const proposals: Readonly<Record<string, string>> = {
  cliente: clienteHtml,
};
```

Rotas não registradas retornam uma página neutra com status `404`.

## Desenvolvimento

Requisitos:

- Node.js `>=22.13.0`
- Linux com `flock`, `curl` e GNU `timeout`

Instalação e validação:

```bash
npm ci
npm test
```

Desenvolvimento local:

```bash
npm run dev
```

Build de produção:

```bash
npm run build
```

## Publicação

O projeto está vinculado ao Site existente por `.openai/hosting.json`. Ao publicar pelo ChatGPT Sites, edite o projeto `proposta-comercial`; não crie um novo Site.

O domínio personalizado permanece vinculado ao projeto, portanto novas propostas e versões não exigem alteração de DNS.

## Privacidade

As propostas não devem ser incluídas em sitemap ou navegação pública. `noindex` reduz exposição em mecanismos de busca, mas não substitui autenticação. Conteúdo comercial sensível deve utilizar controle de acesso apropriado.
