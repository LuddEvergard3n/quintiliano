/**
 * test-data.js — Integridade dos arquivos JSON
 *
 * Cobertura:
 *   - texts.json:   campos obrigatórios, tipos, IDs únicos, exercícios válidos
 *   - authors.json: campos obrigatórios, tipos, IDs únicos, death null permitido
 *   - etymology.json: campos obrigatórios, language_origin preenchido
 *
 * Execução: node --test tests/test-data.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import * as A from './assert-helpers.js';

const __dir  = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dir, '..', 'data');

function loadJSON(name) {
  return JSON.parse(readFileSync(join(dataDir, name), 'utf8'));
}

const texts    = loadJSON('texts.json');
const authors  = loadJSON('authors.json');
const etymology = loadJSON('etymology.json');

/* ================================================================
   texts.json
   ================================================================ */

describe('texts.json', () => {

  test('raiz tem array "texts"', () => {
    assert.ok(Array.isArray(texts.texts), 'texts.texts deve ser array');
    assert.ok(texts.texts.length > 0, 'array não pode ser vazio');
  });

  test('todos os textos têm campos obrigatórios', () => {
    const REQUIRED = ['id', 'title', 'author', 'year', 'level', 'genre', 'content', 'exercises'];
    texts.texts.forEach(t => {
      REQUIRED.forEach(field => {
        assert.ok(
          Object.prototype.hasOwnProperty.call(t, field),
          `Texto "${t.id ?? '?'}" está faltando o campo "${field}"`
        );
      });
    });
  });

  test('IDs são únicos', () => {
    A.assertUniqueValues(texts.texts.map(t => t.id), 'texts.json: IDs');
  });

  test('level é um valor válido', () => {
    const VALID = new Set(['basico', 'intermediario', 'avancado']);
    texts.texts.forEach(t => {
      assert.ok(VALID.has(t.level), `Texto "${t.id}" tem level inválido: "${t.level}"`);
    });
  });

  test('year é número inteiro positivo', () => {
    texts.texts.forEach(t => {
      assert.ok(Number.isInteger(t.year) && t.year > 0, `Texto "${t.id}" tem year inválido: ${t.year}`);
    });
  });

  test('content não é string vazia', () => {
    texts.texts.forEach(t => {
      assert.ok(
        typeof t.content === 'string' && t.content.trim().length > 0,
        `Texto "${t.id}" tem content vazio`
      );
    });
  });

  test('exercises é array (pode ser vazio)', () => {
    texts.texts.forEach(t => {
      assert.ok(Array.isArray(t.exercises), `Texto "${t.id}": exercises deve ser array`);
    });
  });

  test('exercícios com options têm correct dentro dos bounds', () => {
    texts.texts.forEach(t => {
      t.exercises.forEach((ex, ei) => {
        if (!Array.isArray(ex.options)) return;
        assert.ok(
          typeof ex.correct === 'number',
          `Texto "${t.id}" exercício ${ei}: correct deve ser número`
        );
        assert.ok(
          ex.correct >= 0 && ex.correct < ex.options.length,
          `Texto "${t.id}" exercício ${ei}: correct=${ex.correct} fora do range [0, ${ex.options.length - 1}]`
        );
      });
    });
  });

  test('exercícios tipo "estrutura" sem options têm target ou targets', () => {
    texts.texts.forEach(t => {
      t.exercises.forEach((ex, ei) => {
        if (ex.type !== 'estrutura') return;
        if (Array.isArray(ex.options)) return; // múltipla escolha — target não se aplica
        const hasTarget  = typeof ex.target === 'string' && ex.target.trim().length > 0;
        const hasTargets = Array.isArray(ex.targets) && ex.targets.length > 0;
        assert.ok(
          hasTarget || hasTargets,
          `Texto "${t.id}" exercício ${ei} (estrutura, sem options): deve ter "target" (string) ou "targets" (array)`
        );
      });
    });
  });

  test('exercícios tipo "figuras" sem options têm targets não vazio', () => {
    texts.texts.forEach(t => {
      t.exercises.forEach((ex, ei) => {
        if (ex.type !== 'figuras') return;
        if (Array.isArray(ex.options)) return; // múltipla escolha — targets não se aplica
        assert.ok(
          Array.isArray(ex.targets) && ex.targets.length > 0,
          `Texto "${t.id}" exercício ${ei} (figuras, sem options): targets deve ser array não vazio`
        );
      });
    });
  });

  test('todos os exercícios têm type e instruction', () => {
    texts.texts.forEach(t => {
      t.exercises.forEach((ex, ei) => {
        assert.ok(
          typeof ex.type === 'string' && ex.type.length > 0,
          `Texto "${t.id}" exercício ${ei}: faltando "type"`
        );
        assert.ok(
          typeof ex.instruction === 'string' && ex.instruction.length > 0,
          `Texto "${t.id}" exercício ${ei}: faltando "instruction"`
        );
      });
    });
  });

  test('todos os exercícios têm explanation', () => {
    texts.texts.forEach(t => {
      t.exercises.forEach((ex, ei) => {
        assert.ok(
          typeof ex.explanation === 'string' && ex.explanation.length > 0,
          `Texto "${t.id}" exercício ${ei} (${ex.type}): faltando "explanation"`
        );
      });
    });
  });
});

/* ================================================================
   authors.json
   ================================================================ */

describe('authors.json', () => {

  test('raiz tem array "authors"', () => {
    assert.ok(Array.isArray(authors.authors));
    assert.ok(authors.authors.length > 0);
  });

  test('todos os autores têm campos obrigatórios', () => {
    const REQUIRED = ['id', 'name', 'nationality', 'birth', 'movement',
                      'short_bio', 'style', 'context', 'signature_quote',
                      'key_works', 'gutenberg_works'];
    authors.authors.forEach(a => {
      REQUIRED.forEach(field => {
        assert.ok(
          Object.prototype.hasOwnProperty.call(a, field),
          `Autor "${a.id ?? '?'}" está faltando o campo "${field}"`
        );
      });
    });
  });

  test('IDs são únicos', () => {
    A.assertUniqueValues(authors.authors.map(a => a.id), 'authors.json: IDs');
  });

  test('birth é número inteiro positivo', () => {
    authors.authors.forEach(a => {
      assert.ok(
        Number.isInteger(a.birth) && a.birth > 0,
        `Autor "${a.id}" tem birth inválido: ${a.birth}`
      );
    });
  });

  test('death é número inteiro positivo ou null', () => {
    authors.authors.forEach(a => {
      assert.ok(
        a.death === null || (Number.isInteger(a.death) && a.death > 0),
        `Autor "${a.id}" tem death inválido: ${a.death}`
      );
    });
  });

  test('death > birth quando não null', () => {
    authors.authors.forEach(a => {
      if (a.death === null) return;
      assert.ok(
        a.death > a.birth,
        `Autor "${a.id}" tem death (${a.death}) <= birth (${a.birth})`
      );
    });
  });

  test('key_works é array não vazio', () => {
    authors.authors.forEach(a => {
      assert.ok(
        Array.isArray(a.key_works) && a.key_works.length > 0,
        `Autor "${a.id}" tem key_works vazio`
      );
    });
  });

  test('gutenberg_works é array (pode ser vazio)', () => {
    authors.authors.forEach(a => {
      assert.ok(Array.isArray(a.gutenberg_works), `Autor "${a.id}": gutenberg_works deve ser array`);
    });
  });

  test('key_works têm title, year e genre', () => {
    authors.authors.forEach(a => {
      a.key_works.forEach((w, wi) => {
        assert.ok(typeof w.title === 'string' && w.title.length > 0,
          `Autor "${a.id}" obra ${wi}: faltando title`);
        assert.ok(Number.isInteger(w.year) && w.year > 0,
          `Autor "${a.id}" obra ${wi}: year inválido`);
        assert.ok(typeof w.genre === 'string' && w.genre.length > 0,
          `Autor "${a.id}" obra ${wi}: faltando genre`);
      });
    });
  });

  test('short_bio, style, context e signature_quote são strings não vazias', () => {
    const FIELDS = ['short_bio', 'style', 'context', 'signature_quote'];
    authors.authors.forEach(a => {
      FIELDS.forEach(f => {
        assert.ok(
          typeof a[f] === 'string' && a[f].trim().length > 0,
          `Autor "${a.id}": campo "${f}" vazio ou inválido`
        );
      });
    });
  });
});

/* ================================================================
   etymology.json
   ================================================================ */

describe('etymology.json', () => {

  const VALID_LANGS = new Set([
    'latim', 'grego', 'árabe', 'tupi', 'quimbundo',
    'germânico', 'francês', 'inglês', 'italiano',
    'espanhol', 'hebraico', 'persa'
  ]);

  test('raiz tem array "words"', () => {
    assert.ok(Array.isArray(etymology.words));
    assert.ok(etymology.words.length > 0);
  });

  test('todas as entradas têm campos obrigatórios', () => {
    const REQUIRED = ['word', 'root', 'language_origin', 'meaning_origin',
                      'evolution', 'family', 'cognates_other_languages', 'curiosity'];
    etymology.words.forEach((w, i) => {
      REQUIRED.forEach(field => {
        assert.ok(
          Object.prototype.hasOwnProperty.call(w, field),
          `Entrada ${i} ("${w.word ?? '?'}"): faltando "${field}"`
        );
      });
    });
  });

  test('language_origin está preenchido e é valor válido', () => {
    etymology.words.forEach(w => {
      assert.ok(
        typeof w.language_origin === 'string' && w.language_origin.trim().length > 0,
        `Palavra "${w.word}": language_origin vazio`
      );
      assert.ok(
        VALID_LANGS.has(w.language_origin),
        `Palavra "${w.word}": language_origin desconhecido: "${w.language_origin}"`
      );
    });
  });

  test('evolution é array não vazio de strings', () => {
    etymology.words.forEach(w => {
      assert.ok(
        Array.isArray(w.evolution) && w.evolution.length > 0,
        `Palavra "${w.word}": evolution deve ser array não vazio`
      );
      w.evolution.forEach((step, i) => {
        assert.ok(
          typeof step === 'string' && step.length > 0,
          `Palavra "${w.word}" evolution[${i}]: deve ser string não vazia`
        );
      });
    });
  });

  test('family é array de strings', () => {
    etymology.words.forEach(w => {
      assert.ok(Array.isArray(w.family), `Palavra "${w.word}": family deve ser array`);
      w.family.forEach((f, i) => {
        assert.ok(typeof f === 'string', `Palavra "${w.word}" family[${i}]: deve ser string`);
      });
    });
  });

  test('palavras únicas no array', () => {
    A.assertUniqueValues(etymology.words.map(w => w.word), 'etymology.json: palavras');
  });

  test('curiosity é string não vazia', () => {
    etymology.words.forEach(w => {
      assert.ok(
        typeof w.curiosity === 'string' && w.curiosity.trim().length > 0,
        `Palavra "${w.word}": curiosity vazio`
      );
    });
  });
});
