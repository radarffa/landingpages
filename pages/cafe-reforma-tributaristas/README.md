# Café com Reforma Tributária — tributaristas

Página de venda da aula gravada (1 hora + PDF com resumo + atualizações por e-mail, garantia de 7 dias),
para quem chega pelo anúncio. Versão irmã: `../cafe-reforma-empresarios/`.

## Antes de publicar

Edite o bloco `window.OFERTA` no `<head>` do `index.html`:

| Campo      | O que é                                                    |
| ---------- | ---------------------------------------------------------- |
| `preco`    | Valor mostrado na página (147 ou 247). Muda em todos os lugares. |
| `parcelas` | Texto abaixo do preço.                                     |
| `checkout` | Link do produto na Cakto. Enquanto tiver `SEU-CODIGO`, os botões levam à seção da oferta. |

- Os parâmetros do anúncio (`utm_*`, `fbclid`, `gclid`, `ttclid`, `src`, `sck`, `xcod`) são repassados para o link da Cakto.
- O clique no botão de compra dispara `InitiateCheckout` (Meta Pixel) e `begin_checkout` (gtag/dataLayer), se os scripts estiverem instalados na página.
- `og:image` (`img/og-cafe.jpg`) está com caminho relativo: troque pela URL absoluta depois de publicar.

## Abrir localmente

Abra `index.html` no navegador, ou rode `python3 -m http.server` nesta pasta e acesse `http://localhost:8000`.

## Créditos

- Identidade visual: segue o PDF da aula ("Redesign-1"): navy, marfim e dourado; Marcellus nos títulos e Inter no texto.
- Imagens: extraídas do PDF da aula. Cenas de Marcus em casa e mesas de café: simulações por IA (como indicado no próprio PDF). Retrato institucional: foto original de Marcus França.
- Fontes: Marcellus e Inter, Google Fonts (SIL Open Font License).
- Conteúdo: PDF da aula, atualizado em 14/10/2026.
