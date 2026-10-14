/** Contrato editorial leve compartilhado pelos acervos locais. */
export const EDITORIAL_SOURCES = {
  'project-editorial': { id: 'project-editorial', author: 'Equipe editorial Quintiliano', title: 'Notas e atividades didáticas originais', type: 'material didático', year: 2026, locator: 'identificado em cada unidade' },
  'biblioteca-digital': { id: 'biblioteca-digital', author: 'Fundação Biblioteca Nacional', title: 'Biblioteca Nacional Digital', type: 'acervo institucional', year: 2026, url: 'https://bndigital.bn.gov.br/', locator: 'catálogo e edições digitalizadas; conferir edição antes de reproduzir trecho' },
  'machado-byu': { id: 'machado-byu', author: 'Machado de Assis em linha / BYU', title: 'O Espelho e corpus de Machado de Assis', type: 'edição digital acadêmica', year: 2026, url: 'https://machado.byu.edu/text/o-espelho/', locator: 'texto e metadados da edição' },
  'abl-biografias': { id: 'abl-biografias', author: 'Academia Brasileira de Letras', title: 'Acervo e perfis de autores', type: 'fonte institucional', year: 2026, url: 'https://www.academia.org.br/', locator: 'perfil e acervo correspondente' },
  'openwordnet-pt': { id: 'openwordnet-pt', author: 'OpenWordNet-PT', title: 'OpenWordNet-PT', type: 'base lexical', year: 2026, url: 'https://openwordnet-pt.org/', locator: 'entrada lexical correspondente' }
};

const REVIEW_DATE = '2026-10-13';

/** Adiciona metadados sem alterar identificadores nem conteúdo do acervo original. */
export function applyEditorialContract({ texts, authors, etymology, sources = Object.values(EDITORIAL_SOURCES) }) {
  const sourceMap = new Map(sources.map(source => [source.id, source]));
  texts.texts.forEach(text => {
    text.lastReviewed ??= REVIEW_DATE;
    text.reviewStatus ??= 'catalogued';
    text.textKind ??= 'excerto a conferir por edição';
    const sourceId = text.author === 'Machado de Assis' ? 'machado-byu' : text.author === 'Texto didático' ? 'project-editorial' : 'biblioteca-digital';
    text.sourceIds ??= [sourceId];
    text.references ??= text.sourceIds.map(id => sourceMap.get(id)).filter(Boolean);
  });
  authors.authors.forEach(author => {
    author.lastReviewed ??= REVIEW_DATE;
    author.reviewStatus ??= 'catalogued';
    author.sourceIds ??= ['abl-biografias'];
    author.references ??= author.sourceIds.map(id => sourceMap.get(id)).filter(Boolean);
  });
  etymology.words.forEach(word => {
    word.lastReviewed ??= REVIEW_DATE;
    word.reviewStatus ??= 'catalogued';
    word.sourceIds ??= ['openwordnet-pt'];
    word.references ??= word.sourceIds.map(id => sourceMap.get(id)).filter(Boolean);
  });
  return { texts, authors, etymology };
}
