const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const banco = mysql.createPool({
    host: "banco",
    user: "root",
    password: "123456",
    database: "barbearia"
});

app.get("/fila", (req, res) => {
    banco.query("SELECT * FROM fila ORDER BY id", (erro, resultados) => {
        if (erro) {
            return res.status(500).json({ erro: "Erro ao buscar a fila" });
        }
        res.json(resultados);
    });
});

app.post("/fila", (req, res) => {
    const { cliente, servico } = req.body;

    banco.query(
        "INSERT INTO fila (cliente, servico, status) VALUES (?, ?, 'aguardando')",
        [cliente, servico],
        (erro) => {
            if (erro) {
                return res.status(500).json({ erro: "Erro ao entrar na fila" });
            }
            res.json({ mensagem: "Entrou na fila" });
        }
    );
});

app.listen(3000, () => {
    console.log("Backend da Barbearia rodando na porta 3000");
});
