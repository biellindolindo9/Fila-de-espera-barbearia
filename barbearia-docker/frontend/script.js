const API = "http://localhost:3004";

async function carregarFila() {
    try {
        const resposta = await fetch(`${API}/fila`);

        if (!resposta.ok) {
            throw new Error("Erro ao buscar a fila");
        }

        const fila = await resposta.json();

        const lista = document.getElementById("lista");
        lista.innerHTML = "";

        fila.forEach((pessoa, i) => {
            lista.innerHTML += `
                <div class="pessoa">
                    ${i + 1}º — 
                    <strong>${pessoa.cliente}</strong> 
                    (${pessoa.servico}) — 
                    ${pessoa.status}
                </div>
            `;
        });

    } catch (erro) {
        console.error(erro);

        document.getElementById("lista").innerHTML =
            "<p>Não foi possível carregar a fila.</p>";
    }
}

async function entrarNaFila() {
    const cliente = document.getElementById("cliente").value.trim();
    const servico = document.getElementById("servico").value.trim();

    if (cliente === "") {
        alert("Digite seu nome.");
        return;
    }

    try {
        const resposta = await fetch(`${API}/fila`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cliente,
                servico
            })
        });

        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.erro || "Erro ao entrar na fila");
        }

        document.getElementById("cliente").value = "";
        document.getElementById("servico").value = "";

        await carregarFila();

    } catch (erro) {
        console.error(erro);
        alert("Erro ao entrar na fila: " + erro.message);
    }
}

carregarFila();
