# Quintiliano

![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?logo=javascript&logoColor=111111)
![Modules](https://img.shields.io/badge/Thematic_Modules-16-7C3AED)
![Tests](https://img.shields.io/badge/Tests-69-2563EB)
![Deploy](https://img.shields.io/badge/Deploy-GitHub_Pages-222222?logo=github)

Interactive Portuguese language and literature platform focused on close reading, syntax, etymology, writing, argumentation, and literary context.

## Overview

Quintiliano teaches how texts work instead of reducing language study to isolated grammar rules. Version 0.21.0 includes 16 thematic modules, approximately 34 annotated texts, approximately 71 exercises, 21 routes, and institutional material for teachers.

The learning cycle combines reading, guided analysis, an attempt, targeted feedback, revision, and transfer to a new text.

## Modules

- Structural reading.
- Interpretation.
- Syntax and sentence construction.
- Etymology.
- Literature and literary history.
- Writing.
- Poetry.
- Argumentation and fallacies.
- Portuguese usage and conventions.

Additional pages cover the Brazilian Academy of Letters, notable authors, literary awards, teacher guidance, and lesson planning.

## Architecture

- Native JavaScript modules with lazy route loading.
- Local JSON content without external APIs.
- Deterministic heuristic analysis rather than opaque NLP services.
- Declarative exercise schemas for selection, reconstruction, structure, and figures of speech.
- Static GitHub Pages deployment with no build step.

## Run locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Tests

Run the repository test command documented in the project workflow. The current suite contains 69 checks covering content, navigation, and exercise behavior.

## Structure

```text
css/          Layout, components, typography, and responsive rules
js/           Router, viewers, exercises, and thematic modules
data/         Texts, sentences, authors, literature, and exercises
docs/         Architecture, schemas, editorial rules, modules, and roadmap
```

## Accessibility

- Keyboard-accessible interactive tokens.
- Semantic roles and labels for clickable text elements.
- Responsive navigation for desktop and mobile.
- Offline local content with no third-party tracking requirement.

## Live version

[luddevergard3n.github.io/quintiliano](https://luddevergard3n.github.io/quintiliano/)

## License

No license file is currently included. All rights are reserved unless stated otherwise.
