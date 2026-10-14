/** Mostra a procedência editorial sem converter referências em conteúdo executável. */
export function createEditorialNote(item) {
  const details = document.createElement('details'); details.className = 'panel'; details.style.marginTop = 'var(--space-6)';
  const summary = document.createElement('summary'); summary.textContent = `Referências e revisão: ${item.reviewStatus ?? 'não informado'}`;
  const kind = document.createElement('p'); kind.textContent = `Natureza do texto: ${item.textKind ?? 'não informada'}. Revisão: ${item.lastReviewed ?? 'não informada'}.`;
  details.append(summary, kind);
  const list = document.createElement('ul');
  (item.references ?? []).forEach(reference => {
    const row = document.createElement('li');
    const link = reference.url ? document.createElement('a') : document.createElement('span');
    link.textContent = `${reference.author}: ${reference.title} (${reference.year}). ${reference.locator ?? ''}`;
    if (reference.url) { link.href = reference.url; link.target = '_blank'; link.rel = 'noopener'; }
    row.appendChild(link); list.appendChild(row);
  });
  if (list.children.length) details.appendChild(list);
  return details;
}
