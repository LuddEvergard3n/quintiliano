# Quintiliano — Roadmap

Melhorias planejadas, priorizadas por impacto pedagógico e esforço de implementação.

---

## Prioridade alta

### Progresso do aluno
`state.js` já tem infraestrutura completa (pub/sub + localStorage). Falta:
- Chamar `updateProgress()` nos módulos após cada exercício concluído
- Criar rota `/progresso` com dashboard: módulos visitados, exercícios completados, acertos por tipo
- Indicadores visuais nos cards da home (barra de progresso por módulo)

Impacto: transforma o sistema de coleção de módulos isolados em algo com continuidade.

### Literatura → textos do autor
O perfil de cada autor em `authors.json` não linka para os textos do autor em `texts.json`. O módulo Literatura deveria listar os textos disponíveis ao lado do perfil, com link direto para o módulo Interpretação com aquele texto selecionado.

### Textos básicos adicionais
O módulo Leitura Estrutural filtra textos com exercício `estrutura`. Adicionar mais textos de nível básico com esse tipo de exercício — especialmente de autores do século XX e contemporâneos, que têm vocabulário mais acessível.

---

## Prioridade média

### Módulo 10 — Ortografia
Completamente ausente no sistema atual. As Regras (módulo 09) ensinam teoria gramatical, mas não há exercícios práticos de ortografia. Conteúdo proposto:

- Uso do hífen (prefixos, compostos, locuções)
- X vs. CH (mexer/cheio, xícara/chinelo)
- S vs. Z (casa/casamento, análise/analisar)
- G vs. J (gente/jeito, viagem/viajem)
- Os quatro porquês (porque, porquê, por que, por quê)
- Mal vs. mau, mas vs. mais, há vs. a

Tipo de exercício novo: preenchimento de lacuna (lacuna inline no texto, aluno escolhe a grafia correta). Requer implementação no `exercise-engine.js`.

### Módulo 11 — Redação
Diferente do módulo Escrita (que analisa texto livre): ensina tipos textuais específicos com estrutura prescrita.

- Dissertação-argumentativa (estrutura ENEM: introdução com tese, dois argumentos desenvolvidos, proposta de intervenção)
- Carta argumentativa
- Resenha crítica

Interface: esqueleto estrutural com campos editáveis por seção + checklist de critérios de avaliação.

### Módulo 12 — Retórica
Complementa o módulo Argumentação. Conteúdo:

- Ethos, pathos, logos (os três modos de persuasão aristotélicos)
- As partes do discurso clássico: exórdio, narração, argumentação, peroração
- Figuras retóricas além das de linguagem: anáfora, quiasmo, antítese, gradação, epanadiplose
- Análise de discursos históricos: estrutura retórica de discursos reais

---

## Prioridade baixa

### Busca global
Campo de busca que filtra entre todos os textos, autores e entradas etimológicas simultaneamente.

### Modo de leitura livre
No módulo Leitura, opção de ler o texto sem o modo de classificação ativo — apenas para fruição, com opção de anotar.

### Exportação de notas
No módulo Escrita, botão para exportar a análise como texto simples.

### Acessibilidade — navegação por teclado nos accordions
Os accordions de Argumentação e Regras são acessíveis por clique mas não têm suporte completo a `ArrowUp`/`ArrowDown` para navegação entre itens com teclado.

### Tema escuro
Todas as cores estão em variáveis CSS (`theme.css`). Implementar `@media (prefers-color-scheme: dark)` com paleta alternativa é tecnicamente simples — requer apenas definir os valores alternativos das variáveis.

---

## Descartado

**IA generativa para análise de texto.** O sistema é deliberadamente heurístico e determinístico. Análise por LLM introduziria variabilidade, dependência de API externa e custo operacional — contradizendo os princípios de zero dependências e offline-first.

**Gamificação pesada (pontos, badges, rankings).** Pode desviar o foco do aprendizado para a recompensa extrínseca. O sistema de progresso planejado registra avanço sem transformar o aprendizado em jogo.
