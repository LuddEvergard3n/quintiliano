import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

class Storage {
  constructor(value = null) { this.value = value; this.writes = 0; }
  getItem() { return this.value; }
  setItem(_key, value) { this.value = value; this.writes += 1; }
  removeItem() { this.value = null; }
}

async function loadState(storage, suffix) {
  globalThis.localStorage = storage;
  return import(`../js/state.js?${suffix}`);
}

describe('Estado versionado', () => {
  test('migra progresso legado sem perder conclusões', async () => {
    const storage = new Storage(JSON.stringify({ progress: { leitura: { completed: [0, 2], attempts: 3 } }, settings: { fontSize: 'large' }, activeModule: 'leitura', activeTextId: 'machado_capitu' }));
    const state = await loadState(storage, 'legacy');
    const progress = state.getState('progress');
    assert.equal(Object.keys(progress).length, 2);
    assert.equal(state.getState('lastStudy').textId, 'machado_capitu');
    assert.equal(state.getState('settings').fontSize, 'large');
  });

  test('não sobrescreve estado de versão futura', async () => {
    const raw = JSON.stringify({ version: 99, progress: { protected: { completed: true } } });
    const storage = new Storage(raw);
    const state = await loadState(storage, 'future');
    state.setState('lastStudy', { moduleId: 'leitura' });
    assert.equal(storage.value, raw);
    assert.equal(storage.writes, 0);
  });
});
