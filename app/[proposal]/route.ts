import { htmlResponse } from "../_lib/html-response";
import { getProposalHtml } from "../proposals/registry";

interface ProposalRouteContext {
  params: Promise<{
    proposal: string;
  }>;
}

export async function GET(
  _request: Request,
  context: ProposalRouteContext,
) {
  const { proposal } = await context.params;
  const proposalHtml = getProposalHtml(proposal);

  if (!proposalHtml) {
    return htmlResponse(
      `<!doctype html>
      <html lang="pt-BR">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="robots" content="noindex,nofollow,noarchive">
          <title>Proposta não encontrada | ALVK</title>
        </head>
        <body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#050d1c;color:#fff;font-family:Arial,sans-serif">
          <main style="max-width:560px;padding:40px;text-align:center">
            <p style="margin:0 0 12px;color:#7fa8ff;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase">ALVK</p>
            <h1 style="margin:0 0 16px;font-size:clamp(28px,5vw,48px)">Proposta não encontrada</h1>
            <p style="margin:0;color:#aebbd0;line-height:1.6">Confira o endereço completo enviado pela nossa equipe.</p>
          </main>
        </body>
      </html>`,
      404,
    );
  }

  return htmlResponse(proposalHtml);
}
