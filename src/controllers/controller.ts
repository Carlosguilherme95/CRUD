import { Express, Request, Response } from "express";
import { UserService } from "../service/service";

export class UserControllers {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  async userPost(req: Request, res: Response) {
    const { nome, email, password, user } = req.body;
    try {
      await this.userService.createUser(nome, email, password, user);
      res.status(201).send("usuário criado");
    } catch (Error) {
      res.status(404).send("não foi possível criar o usuário");
    }
  }
  async userGet(req: Request, res: Response) {
    try {
      const userRepo = this.userService.getAllUser;
      res.status(200).json(userRepo);
    } catch (Error) {
      res.status(404).send("não encontramos usuários");
    }
  }
  async userGetOne(req: Request, res: Response) {
    const { id_user } = req.params;
    const idUserNum = parseInt(id_user);
    try {
      const findUser = await this.userService.getOneUser(idUserNum);
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
      const putUser = await this.userService.modifyUser(idUserNumber, {
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
      const deleteUser = await this.userService.deleteUser(idUserNumber);
      res.status(200).send("usuário deletado com sucesso");
    } catch (Error) {
      res.status(404).send("não foi possível deletar o usuário");
    }
  }
}
