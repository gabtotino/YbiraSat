const map = L.map('map').setView([-15.78, -47.9], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const regioes = [
    { nome:"Pantanal", coords:[-19,-57], risco:"Crítico", cor:"#C62828" },
    { nome:"Mato Grosso", coords:[-13,-56], risco:"Crítico", cor:"#C62828" },
    { nome:"Pará", coords:[-5.5,-52], risco:"Alto", cor:"#EF6C00" },
    { nome:"Amazônia", coords:[-3,-60], risco:"Médio", cor:"#F9A825" }
];


regioes.forEach(r=>{
    L.circleMarker(r.coords,{
        radius:10,
        fillColor:r.cor,
        color:"#fff",
        weight:2,
        fillOpacity:0.9
    }).addTo(map);
});


function updateCards(){
    const criticos = regioes.filter(r=>r.risco==="Crítico").length;

    document.getElementById("total-regioes").innerText = regioes.length;
    document.getElementById("total-alertas").innerText = Math.floor(Math.random()*10+5);
    document.getElementById("alto-risco").innerText = criticos;
    document.getElementById("saude").innerText = (100-criticos*20)+"%";
}

setInterval(updateCards,3000);
updateCards();

const alertList = document.getElementById("alert-list");

function addAlert(){
    const msgs=[
        "Alta temperatura detectada",
        "Risco de incêndio elevado",
        "Umidade em queda",
        "Anomalia térmica via satélite"
    ];

    const r = regioes[Math.floor(Math.random()*regioes.length)];

    const div = document.createElement("div");
    div.className="alert-item";
    div.innerHTML=`<b>${r.nome}</b><br>${msgs[Math.floor(Math.random()*msgs.length)]}`;

    alertList.prepend(div);

    if(alertList.children.length>6){
        alertList.removeChild(alertList.lastChild);
    }
}

setInterval(addAlert,2500);

function neuralAI(){
    const score = Math.floor(Math.random()*100);
    document.getElementById("ai-score").innerText = score+"%";

    const radar = document.querySelector(".radar-box");

    if(score>70){
        radar.style.background="#5a1414";
    } else if(score>40){
        radar.style.background="#7a4a12";
    } else {
        radar.style.background="#0B3D2E";
    }
}

setInterval(neuralAI,2500);
neuralAI();

const ctx = document.getElementById("risk-chart");

const chart = new Chart(ctx,{
    type:"doughnut",
    data:{
        labels:["Crítico","Alto","Médio","Baixo"],
        datasets:[{
            data:[20,30,25,25],
            backgroundColor:["#C62828","#EF6C00","#F9A825","#2E7D32"]
        }]
    }
});

setInterval(()=>{
    chart.data.datasets[0].data = chart.data.datasets[0].data.map(v=>{
        return Math.max(5, v + (Math.random()*10-5));
    });
    chart.update();
},4000);