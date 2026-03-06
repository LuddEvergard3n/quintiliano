# Quintiliano — Guia de Conteúdo

Como adicionar, editar e expandir o conteúdo do sistema. Este documento cobre os quatro arquivos JSON (`texts.json`, `authors.json`, `etymology.json`, `wordnet.json`) e os dados declarados diretamente nos módulos.

---

## Princípios editoriais

**Precisão antes de volume.** Um dado incorreto é pior que um dado ausente. Toda informação sobre data, autoria, título e citação deve ser verificável.

**Notas de leitura, não resenhas.** Descrições de obras devem ser diretas e pedagógicas: o que o texto faz, por que importa, o que o leitor ganha. Sem elogios vagos ("obra-prima", "leitura imprescindível" sem explicar por quê).

**Contexto sobre celebração.** O sistema não é um salão de louvor — é um ambiente de aprendizado. Informações sobre recusas, controvérsias, limitações e contexto histórico são tão importantes quanto as conquistas.

**Citações verificadas.** Nunca inventar uma citação. Se a atribuição for incerta, omitir ou indicar explicitamente como "atribuída a".

---

## `data/texts.json`

### Estrutura de um texto

```json
{
  "id":      "machado_conto_basico",
  "title":   "O Espelho (fragmento)",
  "author":  "Machado de Assis",
  "year":    1882,
  "level":   "basico",
  "genre":   "conto",
  "content": "Texto completo do fragmento.",
  "exercises": []
}
```

**Campos obrigatórios**: `id` (único, snake_case), `title`, `author`, `year`, `level`, `genre`, `content`.

**`level`**: `"basico"` | `"intermediario"` | `"avancado"`

**`genre`**: `"conto"` | `"cronica"` | `"poesia"` | `"ensaio"` | `"romance"` | `"carta"` | `"discurso"`

**Tamanho ideal de fragmento**: 150–400 palavras para uso interativo; poemas podem ser menores.

### Estrutura de exercícios

#### Múltipla escolha (`interpretacao`, `tom`, `inferencia`)

```json
{
  "type":           "interpretacao",
  "instruction":    "O que o narrador quer dizer com esta expressão?",
  "options":        ["Opção A", "Opção B", "Opção C", "Opção D"],
  "correct":        1,
  "hint_highlight": ["palavras", "relevantes"],
  "explanation":    "Explicação pedagógica exibida após a resposta."
}
```

#### Fato vs. opinião (`fato_opiniao`)

```json
{
  "type":        "fato_opiniao",
  "instruction": "Classifique cada afirmação como fato ou opinião do narrador:",
  "items": [
    { "text": "Afirmação 1", "type": "fato" },
    { "text": "Afirmação 2", "type": "opiniao" }
  ],
  "hint_highlight": []
}
```

#### Análise estrutural (`estrutura`)

```json
{
  "type":        "estrutura",
  "instruction": "Identifique o sujeito desta oração.",
  "targets":     ["sujeito"],
  "answers":     ["A professora"],
  "hint_highlight": ["professora"]
}
```

#### Figuras de linguagem (`figuras`)

```json
{
  "type":        "figuras",
  "instruction": "Identifique a metáfora no trecho.",
  "targets":     ["metafora"],
  "answers":     ["o coração de pedra"],
  "hint_highlight": ["coração", "pedra"]
}
```

### Regras de validação

- `id` deve ser único em todo o arquivo.
- `author` deve corresponder (ao menos parcialmente) a um nome em `authors.json`. Exceção: textos anônimos ou didáticos sem autor real.
- `correct` é índice base 0 em `options[]`.
- `hint_highlight` pode ser array vazio `[]` — botão Dica fica desabilitado.
- Não usar HTML dentro de `content` — apenas texto puro.

### Autores sem perfil em `authors.json`

O teste `test-data.js` verifica que todo autor em `texts.json` tem perfil correspondente em `authors.json`. Para textos didáticos sem autor real, usar `"author": "Texto didático"` ou `"author": "Adaptado"` — esses prefixos são tratados como anônimos e não disparam o teste.

---

## `data/authors.json`

### Estrutura de um autor

```json
{
  "id":              "machado",
  "name":            "Machado de Assis",
  "nationality":     "Brasileiro",
  "birth":           1839,
  "death":           1908,
  "movement":        "Realismo",
  "short_bio":       "Biografia curta (3–5 frases).",
  "style":           "Descrição do estilo literário.",
  "context":         "Contexto histórico e social da obra.",
  "signature_quote": "Citação representativa verificada.",
  "key_works": [
    {
      "title":        "Dom Casmurro",
      "year":         1899,
      "genre":        "Romance",
      "gutenberg_id": 55752,
      "gutenberg_url": "https://www.gutenberg.org/cache/epub/55752/pg55752.txt"
    }
  ],
  "gutenberg_works": [
    {
      "title":        "Dom Casmurro",
      "genre":        "Romance",
      "year":         1899,
      "gutenberg_id": 55752
    }
  ]
}
```

**Campos obrigatórios**: `id`, `name`, `nationality`, `birth`, `death`, `movement`, `short_bio`, `style`, `context`, `signature_quote`, `key_works`.

**`death`**: para autores vivos, usar o ano atual ou `null`. O módulo Literatura usa este campo para o tag "contemporâneo".

**`gutenberg_id`**: ID numérico do Projeto Gutenberg. Apenas para obras em domínio público disponíveis no Gutenberg PT. O módulo Literatura usa este ID para carregar trechos via `js/api.js`.

**`key_works` vs `gutenberg_works`**: `key_works` é a lista editorial de obras recomendadas (pode incluir obras sem Gutenberg); `gutenberg_works` lista apenas as disponíveis para download. Ambos os arrays podem ter sobreposição.

### Autores atuais (22 cadastrados)

Machado de Assis, Clarice Lispector, Lima Barreto, José de Alencar, Luís de Camões, Fernando Pessoa, Carlos Drummond de Andrade, Graciliano Ramos, João Guimarães Rosa, Eça de Queirós, Manuel Bandeira, Adélia Prado, Érico Veríssimo, Carolina Maria de Jesus, Conceição Evaristo, Euclides da Cunha, Monteiro Lobato, Chico Buarque, Milton Hatoum, Raduan Nassar, Daniel Galera, Patrícia Melo.

---

## `data/etymology.json`

### Estrutura de uma entrada

```json
{
  "word":                 "escola",
  "root":                 "skholē",
  "language_origin":      "grego",
  "meaning_origin":       "ócio, tempo livre",
  "evolution":            ["skholē (grego)", "schola (latim)", "escola (português)"],
  "family":               ["escolar", "escolaridade", "escolástico"],
  "cognates_other_languages": {
    "inglês":   "school",
    "espanhol": "escuela",
    "francês":  "école",
    "italiano": "scuola"
  },
  "curiosity": "Fato surpreendente ou conexão inesperada sobre esta palavra."
}
```

**Campos obrigatórios**: todos os listados acima.

**`language_origin`**: `"latim"` | `"grego"` | `"árabe"` | `"tupi"` | `"quimbundo"` | `"germânico"` | `"francês"` | `"espanhol"` | `"hebraico"`.

**`evolution`**: cadeia completa do étimo até o português moderno, em ordem cronológica.

**`family`**: palavras derivadas da mesma raiz no português contemporâneo — sem repetir `word` na lista.

**Critério de seleção**: palavras com raízes de alta produtividade (muitas derivadas), etimologias surpreendentes ou que revelam conexões entre campos semânticos distantes.

### Banco atual: 63 entradas

Distribuição por língua: latim (21), grego (13), árabe (4), quimbundo (2), tupi (2), germânico (2), francês (1).

---

## `data/wordnet.json`

Subconjunto pedagógico do OpenWordNet-PT (CC-BY-SA). Usado pelo módulo Escrita para sugestão de sinônimos.

### Estrutura de uma entrada

```json
{
  "word":       "dizer",
  "synonyms":   ["afirmar", "declarar", "enunciar", "pronunciar"],
  "antonyms":   ["calar", "omitir"],
  "definition": "Expressar em palavras; comunicar verbalmente.",
  "hypernym":   "comunicar"
}
```

**Critério de inclusão**: palavras de alta frequência em textos escolares que têm sinônimos com registro mais formal. O objetivo é auxiliar o aluno a variar o vocabulário em textos formais.

---

## Conteúdo declarado nos módulos

### Adicionando exercícios a módulos internos

Os módulos Ortografia, Prosódia, Coesão, Variação e Redação têm arrays de exercícios declarados diretamente no arquivo JS. O padrão é uniforme:

```js
{
  id:   'xx01',          // prefixo do módulo + número sequencial
  inst: 'Enunciado.',
  opts: ['A', 'B', 'C', 'D'],
  ok:   0,               // índice base 0
  exp:  'Explicação.',
}
```

**Prefixos por módulo**: `p` (prosódia), `c` (coesão), `v` (variação), `r` (redação), exercícios de ortografia têm ids por tópico (`h01`, `sz01`, etc.).

### Adicionando figuras à Retórica

Editar `FIGURAS[]` em `modules/rhetoric/rhetoric.js`. Todo campo (`nome`, `grupo`, `def`, `efeito`, `exemplo`, `analise`, `uso`) é obrigatório — o módulo renderiza todos os seis campos no card expandido.

### Adicionando frases à Sintaxe

Editar `SENTENCES[]` em `modules/syntax/syntax.js`. Requisitos por nível:

- **Básico**: ordem SVO clara, conceito único por frase.
- **Intermediário**: uma construção marcada (aposto, voz passiva, subordinada) por frase.
- **Avançado**: sintaxe literária, inversões, anacolutos, próclise em contextos não-triviais.

### Adicionando grandes nomes

Editar `NOMES[]` em `modules/grandes-nomes/grandes-nomes.js`. Todos os campos são obrigatórios. O array `obras` deve ter exatamente 3 itens — notas de leitura diretas e específicas, sem elogios vagos.

**Regra de ordem**: Machado de Assis (`id: 'machado'`) permanece sempre em `NOMES[0]`.

### Adicionando cadeiras à ABL

Editar `CADEIRAS[]` em `modules/abl/abl.js`. Para cadeira com destaque expandido, incluir o objeto `destaque` com todos os campos obrigatórios (ver `docs/MODULES.md`). Atualmente o destaque é usado apenas para Machado (cadeira 3).

---

## Validação e testes

Após qualquer edição de conteúdo, executar:

```bash
npm test
```

Os testes verificam:
1. Validade do JSON (sintaxe e campos obrigatórios).
2. Consistência entre `texts.json` e `authors.json` (autores cruzados).
3. Contagens mínimas: ≥ 40 textos, ≥ 20 autores, ≥ 60 entradas etimológicas.
4. Smoke test de todos os módulos (render sem exceção).

Se qualquer teste falhar após edição de conteúdo, o erro indica exatamente o campo ou arquivo com problema.
