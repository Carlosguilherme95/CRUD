import { Express, Request, Response } from "express";
import { modifyUser, userLogin, createUserService } from "../service/service";

export class UserControllers {
  async userPost(req: Request, res: Response) {
    const { nome, email, password, user } = req.body;
    try {
      const createUser = await createUserService();
      const userCreated = await createUser.createUser(
        nome,
        email,
        password,
        user
      );
      res.status(201).send("usuário criado");
    } catch (Error) {
      res.status(404).send("não foi possível criar o usuário");
    }
  }

  async getAllUser(req: Request, res: Response) {
    try {
      const getAllUser = await createUserService();
      const allUser = await getAllUser.findAll();
      res.status(200).json(allUser);
    } catch (e) {
      res.status(404).send("não encontramos usuários");
    }
  }

  async userGetOne(req: Request, res: Response) {
    const { id_user } = req.params;
    const idNumber = parseInt(id_user);
    try {
      const findOneUser = await createUserService();
      const oneUser = await findOneUser.FindOne(idNumber);
      res.status(200).json(oneUser);
    } catch (e) {
      res.status(404).send("usuário não encontrado");
    }
  }
  async userPut(req: Request, res: Response) {
    const { id_user } = req.params;
    const idUserNumber = parseInt(id_user);
    const { name, email, user, password } = req.body;
    try {
      const finduser = await createUserService();
      const usermodify = await finduser.modifyUser(idUserNumber, {
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
      const user = await createUserService();
      const delUser = await user.deleteUser(idUserNumber);
      res.status(200).send("usuário deletado com sucesso");
    } catch (Error) {
      res.status(404).send("não foi possível deletar o usuário");
    }
  }
  async userLogin(req: Request, res: Response) {
    const { user, password } = req.body;
    try {
      const login = await userLogin(user, password);
      res.json(login); // nessa situação não será possível usar o status junto com o res.json. derruba a api
    } catch (Error) {
      res.status(404).send("não foi possível fazer login");
    }
  }
}
