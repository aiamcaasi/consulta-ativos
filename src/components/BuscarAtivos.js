import b3logo from "../assets/b3logo.png";
import iconX from "../assets/iconX.svg";
import iconBtn from "../assets/icon-btn.svg";
import { useEffect } from 'react';
import logoPetr4 from "../assets/logopetr4.png";
import logoVale3 from "../assets/logovale3.png";
import logoItub4 from "../assets/logoitub4.png";
import iconUp from "../assets/icon-up.svg";
import iconDown from "../assets/icon-down.svg";

export default function BuscarAtivos() {
  useEffect(() => {
    const listaAtivos = ["PETR4", "VALE3", "ITUB4"];
    const campo = document.getElementById('campoAtivo');
    const wrapperPill = document.querySelector('.wrapper-pill');
    let ativos = [];

    // Sugestões
    const sugestoes = document.createElement('ul');
    sugestoes.id = 'sugestoes';
    sugestoes.style.cssText = `
      display: none; 
      background: #fff; 
      color: #222; 
      border: 1px solid #ccc; 
      position: absolute; 
      list-style: none; 
      margin: 0; 
      padding: 4px; 
      z-index: 10;
      border-radius: 4px;
      max-height: 150px;
      overflow-y: auto;
    `;
    campo.parentNode.appendChild(sugestoes);

    campo.addEventListener('input', function() {
      const valor = campo.value.trim().toUpperCase();
      
      if (!valor) {
        sugestoes.style.display = 'none';
        sugestoes.innerHTML = '';
        return;
      }

      const result = listaAtivos.filter(a => a.startsWith(valor) && !ativos.includes(a));
      
      if (result.length > 0) {
        sugestoes.innerHTML = result.map(a => 
          `<li style="padding: 8px; cursor: pointer; border-bottom: 1px solid #eee;" 
               onmouseover="this.style.background='#f0f0f0'" 
               onmouseout="this.style.background='white'"
               onclick="adicionarAtivo('${a}')">${a}</li>`
        ).join('');
        sugestoes.style.display = 'block';
      } else {
        sugestoes.style.display = 'none';
      }
    });

    
    window.adicionarAtivo = function(ativo) {
      if (!ativos.includes(ativo)) {
        ativos.push(ativo);
        atualizarPills();
        verificarBotao();
      }
      campo.value = '';
      sugestoes.style.display = 'none';
    };

    
    window.removerAtivo = function(ativo) {
      ativos = ativos.filter(a => a !== ativo);
      atualizarPills();
      verificarBotao();
    };

    function atualizarPills() {
      if (ativos.length > 0) {
        wrapperPill.style.display = 'flex';
        wrapperPill.innerHTML = ativos.map(ativo => 
          `<span class="pill font-body-2">${ativo} 
             <img src="${iconX}" alt="Remove" style="cursor: pointer;" 
                  onclick="removerAtivo('${ativo}')" />
           </span>`
        ).join('');
      } else {
        wrapperPill.style.display = 'none';
      }
    }

    function verificarBotao() {
      const botao = document.querySelector('button');
      const dataInicio = document.querySelector('input[type="date"]:first-of-type').value;
      const dataFim = document.querySelector('input[type="date"]:last-of-type').value;
      
      if (ativos.length > 0 && dataInicio && dataFim) {
        botao.classList.remove('disabled');
        botao.disabled = false;
      } else {
        botao.classList.add('disabled');
        botao.disabled = true;
      }
    }

    
    document.addEventListener('click', function(e) {
      if (!campo.contains(e.target) && !sugestoes.contains(e.target)) {
        sugestoes.style.display = 'none';
      }
    });

    
    document.querySelectorAll('input[type="date"]').forEach(input => {
      input.addEventListener('change', verificarBotao);
    });

    document.querySelector('button').addEventListener('click', function(e) {
  e.preventDefault();
  
  if (ativos.length > 0) {
    
    const cardInicialAtivos = document.querySelector('#cardInicialAtivos');
    const cardSelecionados = document.querySelector('#cardAtivosSelecionados');
    const cardInicialGrafico = document.querySelector('#cardInicialGrafico');
    const cardGrafico = document.querySelector('#cardGrafico');
    
    
    if (cardInicialAtivos) cardInicialAtivos.style.display = 'none';
    if (cardSelecionados) cardSelecionados.style.display = 'block';
    gerarListaAtivos(ativos);
    
    
    if (cardInicialGrafico) cardInicialGrafico.style.display = 'none';
    if (cardGrafico) {
      cardGrafico.style.display = 'block';
      if (window.gerarGrafico) window.gerarGrafico(ativos);
    }
  }
});

function gerarListaAtivos(ativosEscolhidos) {
  const dadosAtivos = {
    'PETR4': { logo: logoPetr4, preco: 'R$ 38,08', variacao: '1.20%', valor: '+R$ 0,45', tipo: 'up' },
    'VALE3': { logo: logoVale3, preco: 'R$ 74,95', variacao: '-0.37%', valor: '-R$ 0,28', tipo: 'down' },
    'ITUB4': { logo: logoItub4, preco: 'R$ 34,44', variacao: '-2.05%', valor: '-R$ 0,72', tipo: 'down' },
    'BBAS3': { logo: logoPetr4, preco: 'R$ 28,15', variacao: '0.85%', valor: '+R$ 0,24', tipo: 'up' },
    'BBDC4': { logo: logoVale3, preco: 'R$ 12,88', variacao: '1.75%', valor: '+R$ 0,22', tipo: 'up' }
  };
  
  const listaContainer = document.querySelector('.list-ativos');
  
  if (listaContainer) {
    listaContainer.innerHTML = '';
    
    ativosEscolhidos.forEach(ativo => {
      const dados = dadosAtivos[ativo] || {
        logo: logoPetr4, 
        preco: 'R$ --,--', 
        variacao: '0.00%', 
        valor: '+R$ 0,00', 
        tipo: 'up'
      };
      
      const iconTrend = dados.tipo === 'up' ? iconUp : iconDown;
      
      const itemHtml = `
        <div class="list-item">
          <div class="wrapper">
            <img src="${dados.logo}" alt="${ativo} Logo" />
            <div>
              <div class="font-body-1">${ativo}</div>
              <p class="font-body-2" style="margin: 0">${dados.preco}</p>
            </div>
          </div>
          <div class="wrapper">
            <img src="${iconTrend}" alt="trend-${dados.tipo}" />
            <div class="wrapper-data ${dados.tipo}">
              <div>${dados.variacao}</div>
              <div>${dados.valor}</div>
            </div>
          </div>
        </div>
      `;
      
      listaContainer.innerHTML += itemHtml;
    });
  }
}

  }, []);

  return (
    <div className="card-container" id="cardBuscarAtivos">
      <div style={{ flexDirection: "column", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap:"4px" }}>
          <img src={b3logo} alt="B3 Logo" className="b3-logo" />
          <span className="heading">Buscar ativos</span>
        </div>
        <p className="font-body-2">
          Selecione os ativos e o período que deseja analisar
        </p>
      </div>
      <div className="input-field">
        <div>
          <span className="font-body-1">Código do Ativo</span>
        </div>
        <input 
          id="campoAtivo"
          type="text" 
          placeholder="Ex: PETR4, VALE3, ITUB4..." 
          autoComplete="off"
        />
        <div className="wrapper-pill" style={{ display:"none" }}>
          {}
        </div>
      </div>
      <div className="wrapper-input">
        <div className="input-field">
          <div>
            <span className="font-body-1">Início</span>
          </div>
          <input type="date" defaultValue="2025-07-01"/>
        </div>
        <div className="input-field">
          <div>
            <span className="font-body-1">Fim</span>
          </div>
          <input type="date" defaultValue="2025-07-31"/>
        </div>
      </div>
      <button className="font-body-1 disabled" disabled>
        <img src={iconBtn} alt="Consultar preços" />
        Consultar preços
      </button>
    </div>
  );
}



