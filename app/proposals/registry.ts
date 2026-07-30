import jkconceptHtml from "./jkconcept.html?raw";

const proposals: Readonly<Record<string, string>> = {
  jkconcept: jkconceptHtml,
};

export function getProposalHtml(slug: string) {
  return proposals[slug.toLowerCase()] ?? null;
}
