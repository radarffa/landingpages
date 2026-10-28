# Café com Reforma Tributária — empresários

Página de venda da aula gravada (1 hora + PDF com resumo + atualizações por e-mail, garantia de 7 dias),
para quem chega pelo anúncio. Versão irmã: `../cafe-reforma-tributaristas/`.

## Antes de publicar

Edite o bloco `window.OFERTA` no `<head>` do `index.html`:

| Campo      | O que é                                                    |
| ---------- | ---------------------------------------------------------- |
| `preco`    | Valor mostrado na página (147 ou 247). Muda em todos os lugares. |
| `parcelas` | Texto abaixo do preço.                                     |
| `checkout` | Link do produto na Cakto. Enquanto tiver `SEU-CODIGO`, os botões levam à seção da oferta. |

- Os parâmetros do anúncio (`utm_*`, `fbclid`, `gclid`, `ttclid`, `src`, `sck`, `xcod`) são repassados para o link da Cakto.
- O clique no botão de compra dispara `InitiateCheckout` (Meta Pixel) e `begin_checkout` (gtag/dataLayer), se os scripts estiverem instalados na página.
- `og:image` está com caminho relativo: troque pela URL absoluta depois de publicar.

## Abrir localmente

Abra `index.html` no navegador, ou rode `python3 -m http.server` nesta pasta e acesse `http://localhost:8000`.

## Créditos

- Fotos: acervo de Marcus França (Google Drive, pasta "Biblioteca Fotos" e fotos institucionais). Uso autorizado pelo cliente.
- Fontes: Fraunces e Manrope, Google Fonts (SIL Open Font License).
- Conteúdo: PDF "Cafe-Reforma-Empresarios-Redesign-1", atualizado em 14/10/2026.
