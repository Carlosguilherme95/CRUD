import { Express, Request, Response } from "express";
import {
  getAllUser,
  createUser,
  getOneUser,
  modifyUser,
  deleteUser,
} from "../service/service";

export class UserControllers {
  async userPost(req: Request, res: Response) {
    const { nome, email, password, user } = req.body;
    try {
      await createUser(nome, email, password, user);
      res.status(201).send("usuário criado");
    } catch (Error) {
      res.status(404).send("não foi possível criar o usuário");
    }
  }
  async userGet(req: Request, res: Response) {
    try {
      const userRepo = await getAllUser();
      console.log(userRepo);
      res.status(200).json(userRepo);
    } catch (error) {
      res.status(404).send("não encontramos usuários");
    }
  }

  async userGetOne(req: Request, res: Response) {
    const { id_user } = req.params;
    try {
      await getOneUser(id_user);
      const findUser = await getOneUser(id_user);
      if (!id_user) {
        res.status(404).send("usuário não encontrado");
      }
      res.status(200).json(findUser);
    } catch (Error) {
      res.status(500).send("usuário não encontrado");
    }
  }
  async userPut(req: Request, res: Response) {
    const { id_user } = req.params;
    const idUserNumber = parseInt(id_user);
    const { name, email, user, password } = req.body;
    try {
      await modifyUser(idUserNumber, {
        name,
        email,
        user,
        password,
      });
      res.status(200).send("usuário modificado com sucesso");
    } catch (Error) {
      res.status(404).send("não foi possível modificar o usuário");
    }
  }

  async userDelete(req: Request, res: Response) {
    const { id_user } = req.params;
    const idUserNumber = parseInt(id_user);
    try {
      await deleteUser(idUserNumber);
      res.status(200).send("usuário deletado com sucesso");
    } catch (Error) {
      res.status(404).send("não foi possível deletar o usuário");
    }
  }
}
