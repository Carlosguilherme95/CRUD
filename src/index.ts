// index.ts
import { AppDataSource } from "../src/database/data-source";
import express, { Request, Response } from "express";
import routes from "../src/routes/routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", routes);

async function connect() {
  try {
    await AppDataSource.initialize(); // Conecta ao banco de dados
    console.log("Conectado com sucesso ao banco de dados!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  }
}

connect();

app.listen(port, () => {
  console.log(`Express rodando na porta ${port}`);
});
