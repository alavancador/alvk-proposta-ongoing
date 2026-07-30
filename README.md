# ALVK Proposta Ongoing

Ambiente estático de propostas comerciais da ALVK, publicado pela Vercel a
partir da branch `main`:

- Produção: https://proposta.alavancador.com.br/
- JK Concept: https://proposta.alavancador.com.br/jkconcept

A página inicial é neutra e cada proposta possui uma rota exclusiva. Não há
listagem pública de clientes.

## Arquitetura

- HTML, CSS e JavaScript sem framework ou dependências
- build estático em Node.js
- GitHub integrado à Vercel
- URLs limpas, como `/jkconcept`
- `noindex`, `nofollow`, `noarchive` e `robots.txt`
- cache desabilitado para reduzir persistência de conteúdo comercial

## Estrutura

```text
app/
├── home.html
└── proposals/
    └── jkconcept.html
public/
└── favicon.svg
scripts/
└── build.mjs
tests/
└── project.test.mjs
vercel.json
```

## Adicionar uma proposta

1. Salve o HTML em `app/proposals/<slug>.html`.
2. Use no slug apenas letras minúsculas, números e hífens.
3. Inclua `lang="pt-BR"`, título, viewport e:

```html
<meta name="robots" content="noindex,nofollow,noarchive">
```

4. Execute:

```bash
npm test
```

5. Abra um PR. Após o merge na `main`, a Vercel publica a nova rota
   automaticamente em `https://proposta.alavancador.com.br/<slug>`.

Não é necessário registrar o slug em outro arquivo: o build encontra
automaticamente todos os arquivos `.html` em `app/proposals/`.

## Desenvolvimento

Requisito: Node.js 20 ou superior.

```bash
npm ci
npm test
```

O build gera `vercel-dist/`, que pode ser servido por qualquer servidor
estático.

## Privacidade

As propostas não entram em sitemap ou navegação pública. `noindex` reduz a
exposição em mecanismos de busca, mas não restringe acesso direto. Documentos
que exijam confidencialidade real devem utilizar proteção por senha ou controle
de acesso na Vercel.
