import { Express, Request, Response } from "express";
import { UserService } from "../service/service";
import { AppDataSource } from "../database/data-source";
import { User } from "../entity/entity";

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
      const userRepository = AppDataSource.getRepository(User);
      const userRepo = await userRepository.find();
      res.status(200).json(userRepo);
    } catch (Error) {
      res.status(404).send("não encontramos usuários");
    }
  }
  async userGetOne(req: Request, res: Response) {
    const { id_user } = req.params;
    try {
      const userRepository = AppDataSource.getRepository(User);
      const userRepo = await userRepository.findOne({
        where: {
          id_user: Number(id_user),
        },
      });
      res.status(200).json(userRepo);
    } catch {
      res.status(404).send("usuário não encontrado");
    }
  }
  async userPut(req: Request, res: Response) {
    const { id_user } = req.params;

    try {
      const userRepository = AppDataSource.getRepository(User);
      const userRepo = await userRepository.findOne({
        where: {
          id_user: Number(id_user),
        },
      });
      if (userRepo) {
        userRepo.name = req.body.name;
        userRepo.email = req.body.email;
        userRepo.user = req.body.user;
        userRepo.password = req.body.password;
        await userRepository.save(userRepo);
      }
      res.status(200).send("usuário modificado");
    } catch (Error) {
      res.status(404).send("o usuário não foi encontrado");
    }
  }
  async userDelete(req: Request, res: Response) {
    const { id_user } = req.params;
    try {
      const userRepository = AppDataSource.getRepository(User);
      const userRepo = await userRepository.findOne({
        where: {
          id_user: Number(id_user),
        },
      });
      await userRepository.delete(id_user);
      res.status(200).send("usuário deletado com sucesso");
    } catch (Error) {
      res.status(404).send("não foi possível deletar o usuário");
    }
  }
}
