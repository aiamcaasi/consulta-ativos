import React, { useEffect } from "react";
import iconBtn from "../assets/icon-btn.svg";
import iconCalendar from "../assets/icon-calendar.svg";

export default function Grafico() {
  
  useEffect(() => {

    // Carregar Chart.js via CDN
    if (!window.Chart) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => {
      };
      document.head.appendChild(script);
    }

    // Função para gerar gráfico dinâmico
    window.gerarGrafico = function(ativosEscolhidos) {
      // Aguardar Chart.js carregar
      if (!window.Chart) {
        setTimeout(() => window.gerarGrafico(ativosEscolhidos), 100);
        return;
      }

      const container = document.querySelector('.container-grafico');
      if (!container || !ativosEscolhidos || ativosEscolhidos.length === 0) return;
      
      // Dados simulados para cada ativo
      const dadosAtivos = {
        'PETR4': [37.50, 37.80, 37.20, 38.10, 38.08],
        'VALE3': [75.20, 74.95, 74.50, 74.80, 74.95],
        'ITUB4': [34.10, 34.50, 33.80, 34.20, 34.44],
      };
      
      // Cores para cada ativo
      const coresAtivos = {
        'PETR4': '#008542',
        'VALE3': '#00939A',
        'ITUB4': '#F37435',
      };
      
      const labels = ['01/07', '08/07', '15/07', '22/07', '31/07'];
      
      // Preparar datasets
      const datasets = ativosEscolhidos.map(ativo => ({
        label: ativo,
        data: dadosAtivos[ativo] || [],
        borderColor: coresAtivos[ativo],
        backgroundColor: coresAtivos[ativo] + '20',
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: coresAtivos[ativo],
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        tension: 0.1,
        fill: false
      }));
      
      // Renderizar container
      container.innerHTML = `
        <div style="height: 400px; background: #111A2C; border-radius: 12px; padding: 20px;">
          <canvas id="meuGrafico" style="width: 100%; height: 100%;"></canvas>
        </div>
      `;
      
      // Criar o gráfico
      const ctx = document.getElementById('meuGrafico').getContext('2d');
      
      new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                color: '#A1AAB8',
                font: {
                  size: 14,
                  weight: '500'
                },
                usePointStyle: true,
                padding: 20
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(17, 26, 44, 0.95)',
              titleColor: '#fff',
              bodyColor: '#A1AAB8',
              borderColor: '#25344F',
              borderWidth: 1,
              cornerRadius: 8,
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: R$ ${context.parsed.y.toFixed(2)}`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                color: '#25344F',
                borderColor: '#25344F'
              },
              ticks: {
                color: '#A1AAB8',
                font: {
                  size: 12
                }
              }
            },
            y: {
              grid: {
                color: '#25344F',
                borderColor: '#25344F'
              },
              ticks: {
                color: '#A1AAB8',
                font: {
                  size: 12
                },
                callback: function(value) {
                  return 'R$ ' + value.toFixed(2);
                }
              }
            }
          }
        }
      });
    };
  }, []);

  return (
    <div className="card-container">
      <div id="cardInicialGrafico" className="card-inicial">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <img src={iconBtn} alt="trend-up" />
          <span className="heading">Evolução dos preços</span>
        </div>
        <p className="font-body-2">
          Adicione ativos e defina o período para visualizar os dados
        </p>
      </div>
      <div id="cardGrafico" style={{display: "none"}}>
        <div className="header">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <img src={iconBtn} alt="trend-up" />
            <span className="heading">Evolução dos preços</span>
          </div>
          <p className="font-body-2">
            <img src={iconCalendar} alt="calendar" />
            01 de julho de 2025 - 31 de julho de 2025
          </p>
        </div>
        <div>
          <div className="container-grafico"></div>
        </div>
      </div>
    </div>
  );
}
