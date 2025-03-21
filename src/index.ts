// index.ts
import { AppDataSource } from "../src/database/data-source";
import express, { Request, Response } from "express";
import routes from "../src/routes/routes";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", routes);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Minha API",
      version: "1.0.0",
      description: "API de exemplo com Swagger e TypeScript",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/routes.ts"], // Caminho para o arquivo de rotas
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
