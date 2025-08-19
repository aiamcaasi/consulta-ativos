import iconBtn from "../assets/icon-btn.svg";
import iconCalendar from "../assets/icon-calendar.svg";

export default function AtivosMonitorados() {
  return (
    <div className="card-container">
      <div id="cardInicialAtivos" className="card-inicial" style={{ display: "" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <img src={iconBtn} alt="trend-up" />
          <span className="heading">Ativos monitorados</span>
        </div>
        <p className="font-body-2">
          Adicione ativos e defina o período para visualizar os dados
        </p>
      </div>
      <div id="cardAtivosSelecionados" style={{ display: "none", height: "100%" }}>
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
            <span className="heading">Ativos monitorados</span>
          </div>
          <p className="font-body-2">
            <img src={iconCalendar} alt="calendar" />
            01 de julho de 2025 - 31 de julho de 2025
          </p>
        </div>
        <div className="list-ativos">
          {}
        </div>
      </div>
    </div>
  );
}
