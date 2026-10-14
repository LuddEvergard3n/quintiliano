/** Regenera os metadados editoriais sem mudar texto, IDs ou exercícios existentes. */
import { readFileSync, writeFileSync } from 'node:fs';

const date = '2026-10-13';
const read = name => JSON.parse(readFileSync(new URL(`../data/${name}`, import.meta.url), 'utf8'));
const write = (name, value) => writeFileSync(new URL(`../data/${name}`, import.meta.url), `${JSON.stringify(value, null, 2)}\n`);

const texts = read('texts.json');
texts.texts.forEach(text => {
  text.lastReviewed ??= date;
  text.reviewStatus ??= 'catalogued';
  text.textKind ??= 'excerto a conferir por edição';
  text.sourceIds ??= [text.author === 'Machado de Assis' ? 'machado-byu' : text.author === 'Texto didático' ? 'project-editorial' : 'biblioteca-digital'];
});
write('texts.json', texts);

const authors = read('authors.json');
authors.authors.forEach(author => {
  author.lastReviewed ??= date;
  author.reviewStatus ??= 'catalogued';
  author.sourceIds ??= ['abl-biografias'];
});
write('authors.json', authors);

const etymology = read('etymology.json');
etymology.words.forEach(word => {
  word.lastReviewed ??= date;
  word.reviewStatus ??= 'catalogued';
  word.sourceIds ??= ['openwordnet-pt'];
});
write('etymology.json', etymology);
