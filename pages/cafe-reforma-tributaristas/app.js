/* Café com Reforma Tributária — comportamento da página.
   A configuração da oferta (preço e link da Cakto) fica em window.OFERTA, no index.html. */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  var oferta = window.OFERTA || {};
  var brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  var brlInteiro = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

  /* ---------- Preço ---------- */

  function formatarPreco(valor) {
    return Number.isInteger(valor) ? brlInteiro.format(valor) : brl.format(valor);
  }

  if (typeof oferta.preco === "number") {
    document.querySelectorAll("[data-preco]").forEach(function (el) {
      el.textContent = formatarPreco(oferta.preco);
    });
  }

  if (oferta.parcelas) {
    document.querySelectorAll("[data-parcelas]").forEach(function (el) {
      el.textContent = oferta.parcelas;
    });
  }

  /* ---------- Checkout (Cakto) ----------
     Repassa os parâmetros de campanha do anúncio (utm_*, fbclid, gclid etc.)
     para o checkout, para a venda ser atribuída à campanha certa. */

  var PARAMS_CAMPANHA = /^(utm_|fbclid$|gclid$|ttclid$|src$|sck$|xcod$)/;

  function urlCheckout() {
    var base = oferta.checkout;
    if (!base || /SEU-CODIGO/.test(base)) {
      if (window.console) console.warn("OFERTA.checkout ainda não foi configurado com o link da Cakto.");
      return null;
    }
    try {
      var destino = new URL(base, window.location.href);
      var origem = new URLSearchParams(window.location.search);
      origem.forEach(function (valor, chave) {
        if (PARAMS_CAMPANHA.test(chave) && !destino.searchParams.has(chave)) {
          destino.searchParams.set(chave, valor);
        }
      });
      return destino.toString();
    } catch (e) {
      return base;
    }
  }

  var destino = urlCheckout();
  document.querySelectorAll("[data-checkout]").forEach(function (a) {
    if (destino) {
      a.setAttribute("href", destino);
      a.setAttribute("rel", "noopener");
    }
    a.addEventListener("click", function () {
      if (typeof window.fbq === "function") window.fbq("track", "InitiateCheckout");
      if (typeof window.gtag === "function") window.gtag("event", "begin_checkout");
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: "begin_checkout", posicao: a.dataset.checkout });
      }
    });
  });

  /* ---------- Conta no guardanapo ---------- */

  var form = document.getElementById("conta");
  if (form) {
    var campoValor = form.querySelector("#valor");
    var saidas = {
      base: document.getElementById("r-base"),
      aliquota: document.getElementById("r-aliquota"),
      imposto: document.getElementById("r-imposto"),
      total: document.getElementById("r-total"),
      cliente: document.getElementById("r-cliente"),
      fornecedor: document.getElementById("r-fornecedor"),
      tributo: document.getElementById("r-tributo"),
    };
    var pct = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });

    function lerValor(texto) {
      var limpo = String(texto).replace(/[^\d,.\s]/g, "").replace(/\s/g, "");
      if (!limpo) return 0;
      // Formato brasileiro: ponto separa milhar, vírgula separa centavos.
      if (limpo.indexOf(",") > -1) {
        limpo = limpo.replace(/\./g, "").replace(",", ".");
      } else if (/\.\d{3}(\.|$)/.test(limpo)) {
        limpo = limpo.replace(/\./g, "");
      }
      var n = parseFloat(limpo);
      return isFinite(n) && n > 0 ? Math.min(n, 1e12) : 0;
    }

    function calcular() {
      var valor = lerValor(campoValor.value);
      var escolhido = form.querySelector('input[name="tratamento"]:checked');
      var aliquota = escolhido ? parseFloat(escolhido.value) : 0.275;
      var imposto = Math.round(valor * aliquota * 100) / 100;
      var total = valor + imposto;

      saidas.base.textContent = brl.format(valor);
      saidas.aliquota.textContent = pct.format(aliquota * 100) + "%";
      saidas.imposto.textContent = brl.format(imposto);
      saidas.total.textContent = brl.format(total);
      saidas.cliente.textContent = brl.format(total);
      saidas.fornecedor.textContent = brl.format(valor);
      saidas.tributo.textContent = brl.format(imposto);
    }

    campoValor.addEventListener("input", calcular);
    campoValor.addEventListener("blur", function () {
      var v = lerValor(campoValor.value);
      if (v) campoValor.value = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);
    });
    form.addEventListener("change", calcular);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      calcular();
    });
    calcular();
  }

  /* ---------- Entradas ao rolar ---------- */

  var reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revelaveis = document.querySelectorAll(".reveal");

  if (!reduzir && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("is-in");
            io.unobserve(entrada.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revelaveis.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revelaveis.forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  /* ---------- Barra de compra no celular ---------- */

  var barra = document.querySelector(".buybar");
  var heroOferta = document.querySelector(".hero__offer");
  var secaoOferta = document.getElementById("oferta");
  if (barra && heroOferta && "IntersectionObserver" in window) {
    var visiveis = new Set();
    var vigia = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) visiveis.add(e.target);
        else visiveis.delete(e.target);
      });
      var passouHero = heroOferta.getBoundingClientRect().bottom < 0;
      var mostrar = passouHero && visiveis.size === 0;
      barra.classList.toggle("is-visible", mostrar);
      barra.setAttribute("aria-hidden", mostrar ? "false" : "true");
      barra.querySelectorAll("a").forEach(function (a) {
        a.tabIndex = mostrar ? 0 : -1;
      });
    });
    vigia.observe(heroOferta);
    if (secaoOferta) vigia.observe(secaoOferta);
    var fecho = document.querySelector(".closing");
    if (fecho) vigia.observe(fecho);
  }

  /* ---------- Casos por setor (abas) ----------
     Sem JavaScript, os quatro casos aparecem em sequência. */

  var abas = document.querySelector(".tabs");
  if (abas) {
    var botoes = Array.prototype.slice.call(abas.querySelectorAll('[role="tab"]'));
    var paineis = botoes.map(function (b) {
      return document.getElementById(b.getAttribute("aria-controls"));
    });

    function selecionar(indice, focar) {
      botoes.forEach(function (b, i) {
        var ativo = i === indice;
        b.setAttribute("aria-selected", ativo ? "true" : "false");
        b.tabIndex = ativo ? 0 : -1;
        paineis[i].hidden = !ativo;
        if (ativo) {
          paineis[i].classList.remove("is-entering");
          void paineis[i].offsetWidth;
          paineis[i].classList.add("is-entering");
        }
      });
      if (focar) botoes[indice].focus();
    }

    botoes.forEach(function (b, i) {
      b.addEventListener("click", function () {
        selecionar(i, false);
      });
      b.addEventListener("keydown", function (e) {
        var alvo = null;
        if (e.key === "ArrowRight") alvo = (i + 1) % botoes.length;
        if (e.key === "ArrowLeft") alvo = (i - 1 + botoes.length) % botoes.length;
        if (e.key === "Home") alvo = 0;
        if (e.key === "End") alvo = botoes.length - 1;
        if (alvo !== null) {
          e.preventDefault();
          selecionar(alvo, true);
        }
      });
    });

    abas.hidden = false;
    paineis.forEach(function (p) {
      p.setAttribute("role", "tabpanel");
      p.tabIndex = 0;
    });
    selecionar(0, false);
  }
})();
