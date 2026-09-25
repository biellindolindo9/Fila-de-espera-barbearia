const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const banco = mysql.createPool({
    host: process.env.DB_HOST || "db",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root123",
    database: process.env.DB_NAME || "barbearia"
});

app.get("/fila", (req, res) => {
    banco.query(
        "SELECT * FROM fila ORDER BY id",
        (erro, resultados) => {
            if (erro) {
                console.error("Erro ao buscar fila:", erro);
                return res.status(500).json({
                    erro: "Erro ao buscar a fila"
                });
            }

            res.json(resultados);
        }
    );
});

app.post("/fila", (req, res) => {
    const { cliente, servico } = req.body;

    if (!cliente || cliente.trim() === "") {
        return res.status(400).json({
            erro: "Nome do cliente é obrigatório"
        });
    }

    banco.query(
        "INSERT INTO fila (cliente, servico, status) VALUES (?, ?, 'aguardando')",
        [cliente, servico || ""],
        (erro, resultado) => {
            if (erro) {
                console.error("Erro ao inserir na fila:", erro);

                return res.status(500).json({
                    erro: "Erro ao entrar na fila"
                });
            }

            res.status(201).json({
                mensagem: "Cliente entrou na fila",
                id: resultado.insertId
            });
        }
    );
});

app.listen(3004, "0.0.0.0", () => {
    console.log("Backend da Barbearia rodando na porta 3004");
});
