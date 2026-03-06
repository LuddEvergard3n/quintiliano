#!/usr/bin/env node
/**
 * run-tests.js — Runner de testes do Quintiliano
 *
 * Executa as três suites em sequência, agrega os resultados e imprime
 * um resumo final. Exit code 0 se todos passarem, 1 se houver falhas.
 *
 * Uso:
 *   node tests/run-tests.js              # todas as suites
 *   node tests/run-tests.js --data       # apenas test-data.js
 *   node tests/run-tests.js --router     # apenas test-router.js
 *   node tests/run-tests.js --modules    # apenas test-modules.js
 *
 * Também pode ser chamado via npm test (ver package.json).
 */

import { spawn }    from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dir = dirname(fileURLToPath(import.meta.url));

/* ================================================================
   CONFIGURAÇÃO DAS SUITES
   ================================================================ */

const ALL_SUITES = [
  { flag: '--data',    file: 'test-data.js',    label: 'Integridade dos JSONs' },
  { flag: '--router',  file: 'test-router.js',  label: 'Router'                },
  { flag: '--modules', file: 'test-modules.js', label: 'Módulos (render)'      },
];

/* ================================================================
   SELEÇÃO VIA FLAGS
   ================================================================ */

const args   = process.argv.slice(2);
const suites = args.length === 0
  ? ALL_SUITES
  : ALL_SUITES.filter(s => args.includes(s.flag));

if (suites.length === 0) {
  console.error(`Flags válidas: ${ALL_SUITES.map(s => s.flag).join(', ')}`);
  process.exit(1);
}

/* ================================================================
   EXECUTOR DE SUITE
   Retorna { label, pass, fail, duration } após o processo terminar.
   ================================================================ */

function runSuite(suite) {
  return new Promise(resolve => {
    const start   = Date.now();
    const child   = spawn(
      process.execPath,
      ['--test', join(__dir, suite.file)],
      { stdio: ['ignore', 'pipe', 'pipe'] }
    );

    let stdout = '';
    let stderr = '';
    child.stdout.on('data', d => { stdout += d; });
    child.stderr.on('data', d => { stderr += d; });

    child.on('close', code => {
      const duration = Date.now() - start;

      // Extrai contadores do TAP emitido pelo node:test
      const passMatch = stdout.match(/^# pass\s+(\d+)/m);
      const failMatch = stdout.match(/^# fail\s+(\d+)/m);
      const pass = passMatch ? parseInt(passMatch[1], 10) : 0;
      const fail = failMatch ? parseInt(failMatch[1], 10) : (code !== 0 ? 1 : 0);

      // Repassa linhas de falha para o terminal (apenas "not ok" e "error:")
      const failLines = stdout
        .split('\n')
        .filter(l => /^\s*(not ok|error:)/.test(l))
        .map(l => `  ${l.trim()}`)
        .join('\n');

      resolve({ label: suite.label, pass, fail, duration, failLines, stderr: stderr.trim() });
    });
  });
}

/* ================================================================
   FORMATAÇÃO
   ================================================================ */

const GREEN  = '\x1b[32m';
const RED    = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BOLD   = '\x1b[1m';
const RESET  = '\x1b[0m';

function pad(str, len) {
  return str.length >= len ? str : str + ' '.repeat(len - str.length);
}

/* ================================================================
   MAIN
   ================================================================ */

console.log(`\n${BOLD}Quintiliano — Testes${RESET}`);
console.log('─'.repeat(52));

const results = [];
for (const suite of suites) {
  process.stdout.write(`  ${pad(suite.label, 30)} `);
  const result = await runSuite(suite);
  results.push(result);

  const statusColor = result.fail === 0 ? GREEN : RED;
  const status      = result.fail === 0 ? 'PASS' : 'FAIL';
  const counter     = `${result.pass} ok, ${result.fail} fail`;
  const ms          = `${result.duration}ms`;
  console.log(`${statusColor}${BOLD}${status}${RESET}  ${counter}  ${YELLOW}${ms}${RESET}`);

  if (result.fail > 0 && result.failLines) {
    console.log(result.failLines);
  }
  if (result.stderr) {
    console.log(`  ${RED}stderr:${RESET} ${result.stderr.slice(0, 200)}`);
  }
}

/* ================================================================
   RESUMO FINAL
   ================================================================ */

const totalPass = results.reduce((s, r) => s + r.pass, 0);
const totalFail = results.reduce((s, r) => s + r.fail, 0);
const totalMs   = results.reduce((s, r) => s + r.duration, 0);

console.log('─'.repeat(52));

if (totalFail === 0) {
  console.log(`${GREEN}${BOLD}✓ ${totalPass} testes passaram${RESET}  ${YELLOW}${totalMs}ms${RESET}\n`);
  process.exit(0);
} else {
  console.log(
    `${RED}${BOLD}✗ ${totalFail} testes falharam${RESET}` +
    `  (${totalPass} passaram)  ${YELLOW}${totalMs}ms${RESET}\n`
  );
  process.exit(1);
}
