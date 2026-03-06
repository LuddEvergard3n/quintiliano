/**
 * assert-helpers.js — Asserções customizadas reutilizáveis
 *
 * Wrappers sobre node:assert/strict que:
 *   - Produzem mensagens de erro contextualizadas
 *   - Encapsulam padrões que se repetem nas três suites
 *   - São funções puras — sem efeitos colaterais, fáceis de testar
 *
 * Uso:
 *   import * as A from './assert-helpers.js';
 *   A.assertNonEmptyString(value, 'campo "title"');
 */

import assert from 'node:assert/strict';

/**
 * Verifica que value é string não vazia após trim.
 * @param {unknown} value
 * @param {string}  label  — contexto para a mensagem de erro
 */
export function assertNonEmptyString(value, label) {
  assert.ok(
    typeof value === 'string' && value.trim().length > 0,
    `${label}: esperado string não vazia, recebido ${JSON.stringify(value)}`
  );
}

/**
 * Verifica que value é inteiro positivo (> 0).
 * @param {unknown} value
 * @param {string}  label
 */
export function assertPositiveInt(value, label) {
  assert.ok(
    Number.isInteger(value) && value > 0,
    `${label}: esperado inteiro positivo, recebido ${JSON.stringify(value)}`
  );
}

/**
 * Verifica que value é inteiro positivo ou exatamente null.
 * @param {unknown} value
 * @param {string}  label
 */
export function assertPositiveIntOrNull(value, label) {
  assert.ok(
    value === null || (Number.isInteger(value) && value > 0),
    `${label}: esperado inteiro positivo ou null, recebido ${JSON.stringify(value)}`
  );
}

/**
 * Verifica que arr é array com pelo menos um elemento.
 * @param {unknown} arr
 * @param {string}  label
 */
export function assertNonEmptyArray(arr, label) {
  assert.ok(
    Array.isArray(arr) && arr.length > 0,
    `${label}: esperado array não vazio, recebido ${JSON.stringify(arr)}`
  );
}

/**
 * Verifica que arr é array (pode ser vazio).
 * @param {unknown} arr
 * @param {string}  label
 */
export function assertArray(arr, label) {
  assert.ok(
    Array.isArray(arr),
    `${label}: esperado array, recebido ${typeof arr}`
  );
}

/**
 * Verifica que todos os valores de um array são únicos.
 * @param {Array}   arr
 * @param {string}  label
 */
export function assertUniqueValues(arr, label) {
  const unique     = new Set(arr);
  const duplicates = arr.filter((v, i) => arr.indexOf(v) !== i);
  assert.equal(
    unique.size,
    arr.length,
    `${label}: valores duplicados encontrados: ${JSON.stringify([...new Set(duplicates)])}`
  );
}

/**
 * Verifica que obj possui todos os campos listados em requiredFields.
 * @param {object}   obj
 * @param {string[]} requiredFields
 * @param {string}   label
 */
export function assertHasFields(obj, requiredFields, label) {
  requiredFields.forEach(field => {
    assert.ok(
      Object.prototype.hasOwnProperty.call(obj, field),
      `${label}: campo obrigatório ausente: "${field}"`
    );
  });
}

/**
 * Verifica que value está dentro do conjunto de valores permitidos.
 * @param {unknown}  value
 * @param {Set}      validSet
 * @param {string}   label
 */
export function assertOneOf(value, validSet, label) {
  assert.ok(
    validSet.has(value),
    `${label}: valor inválido "${value}". Permitidos: ${[...validSet].join(', ')}`
  );
}

/**
 * Verifica que index está dentro dos bounds de um array.
 * @param {number} index
 * @param {Array}  arr
 * @param {string} label
 */
export function assertInBounds(index, arr, label) {
  assert.ok(
    typeof index === 'number' && index >= 0 && index < arr.length,
    `${label}: índice ${index} fora do range [0, ${arr.length - 1}]`
  );
}

/**
 * Verifica que fn não lança exceção ao ser chamada.
 * Retorna o valor retornado por fn.
 * @param {Function} fn
 * @param {string}   label
 * @returns {unknown}
 */
export function assertNoThrow(fn, label) {
  let result;
  try {
    result = fn();
  } catch (err) {
    assert.fail(`${label}: lançou exceção inesperada: ${err.message}`);
  }
  return result;
}

/**
 * Verifica que val parece um HTMLElement (tem appendChild ou innerHTML).
 * Compatível com stubs de teste que não herdam de HTMLElement real.
 * @param {unknown} val
 * @param {string}  label
 */
export function assertIsElement(val, label) {
  assert.ok(
    val !== null && val !== undefined,
    `${label}: retornou null/undefined`
  );
  assert.ok(
    typeof val.appendChild === 'function' || typeof val.innerHTML !== 'undefined',
    `${label}: retorno não parece HTMLElement (sem appendChild nem innerHTML)`
  );
}

/**
 * Verifica que uma Promise é resolvida dentro de timeoutMs.
 * Lança AssertionError se a Promise rejeitar ou o tempo esgotar.
 * @param {Promise}  promise
 * @param {number}   timeoutMs
 * @param {string}   label
 * @returns {Promise<unknown>}
 */
export async function assertResolvesWithin(promise, timeoutMs, label) {
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = setTimeout(
      () => reject(new Error(`${label}: não resolveu em ${timeoutMs}ms`)),
      timeoutMs
    );
  });
  try {
    const result = await Promise.race([promise, timeout]);
    clearTimeout(timeoutId);
    return result;
  } catch (err) {
    clearTimeout(timeoutId);
    assert.fail(err.message);
  }
}
