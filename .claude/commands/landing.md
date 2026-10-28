---
description: Criar uma landing page seguindo o fluxo do CLAUDE.md (taste-skill, ui-ux-pro-max e agent-skills)
argument-hint: "[descrição do produto ou da página]"
---

Crie uma landing page para: $ARGUMENTS

Siga o fluxo obrigatório do `CLAUDE.md`, na ordem:

1. Confira o briefing. Se faltar produto, público, objetivo (CTA) ou tom, pergunte antes de começar.
2. Invoque `taste-skill:design-taste-frontend` para definir a direção de arte.
3. Invoque `ui-ux-pro-max:ui-ux-pro-max` para definir estilo, paleta, fontes e regras de UX.
4. Invoque `agent-skills:frontend-ui-engineering` e implemente a página em `pages/<nome>/`.
5. Verifique a página num navegador real, em desktop e celular.
6. Rode a revisão do `/agent-skills:review` e corrija o que for encontrado.

No final, resuma a direção escolhida, onde a página está e como abri-la.
