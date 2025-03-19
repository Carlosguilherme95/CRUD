import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../service/service";

export async function verifyJwt(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // Pegando o token dos cabeçalhos
  const token = req.headers["x-access-token"];

  // Se o token não existir ou for um array, retornamos um erro
  if (!token || Array.isArray(token)) {
    res.status(404).json({ error: "Token não fornecido ou inválido" });
  }

  try {
    // Verificando se o token é uma string, já que o JWT espera uma string
    if (typeof token === "string") {
      // Verificando o token usando o SECRET
      const decoded = jwt.verify(token, SECRET);

      // Atribuindo o decoded ao req.user
      (req as any).user = decoded;

      // Chama o próximo middleware ou a rota
      return next(); // Retorna aqui para garantir que a execução do middleware pare
    } else {
      // Caso o token não seja uma string, retornamos erro
      res.status(400).json({ error: "Token inválido" });
    }
  } catch (error) {
    // Se ocorrer um erro, retornamos um erro 401 (não autorizado)
    res.status(401).json({ error: "Token inválido" });
  }
}
