const API = "http://localhost:3004";


async function carregarFila() {

    const resposta = await fetch(`${API}/fila`);
    const fila = await resposta.json();

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    fila.forEach((pessoa, i) => {
        lista.innerHTML += `
            <div class="pessoa">
                ${i + 1}º — <strong>${pessoa.cliente}</strong> (${pessoa.servico}) — ${pessoa.status}
            </div>
        `;
    });
}


async function entrarNaFila() {

    const cliente = document.getElementById("cliente").value;
    const servico = document.getElementById("servico").value;

    if (cliente === "") {
        return;
    }

    await fetch(`${API}/fila`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente, servico })
    });

    document.getElementById("cliente").value = "";
    document.getElementById("servico").value = "";

    carregarFila();
}


carregarFila();
