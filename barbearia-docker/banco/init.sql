CREATE DATABASE IF NOT EXISTS barbearia;

USE barbearia;

CREATE TABLE IF NOT EXISTS fila (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente VARCHAR(255) NOT NULL,
    servico VARCHAR(255),
    status VARCHAR(50) DEFAULT 'aguardando'
);
