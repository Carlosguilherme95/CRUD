import { AppDataSource } from "../database/data-source";
import { User } from "../entity/entity";

export class UserService {
  private userRepository;
  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }
  async createUser(
    nome: string,
    email: string,
    password: string,
    user: string
  ) {
    const newUser = new User();
    newUser.name = nome;
    newUser.email = email;
    newUser.password = password;
    newUser.user = user;

    await this.userRepository.save(newUser);
  }
  async getOneUser(id_user: number) {
    const userRepo = await this.userRepository.findOne({
      where: { id_user: Number(id_user) },
    });
  }
  async getAllUser() {
    const userRepo = await this.userRepository.find();
  }
  async modifyUser(
    id_user: number,
    updateData: { name: string; email: string; user: string; password: string }
  ) {
    const userRepo = await this.userRepository.findOne({
      where: {
        id_user: Number(id_user),
      },
    });
    if (!userRepo) {
      throw new Error("o usuário que você quer modificar não foi encontrado");
    } else {
      userRepo.name = updateData.name;
      userRepo.email = updateData.email;
      userRepo.user = updateData.user;
      userRepo.password = updateData.password;
      await this.userRepository.save(userRepo);
    }
  }
  async deleteUser(id_user: number) {
    const userRepo = this.userRepository.findOne({
      where: { id_user: Number(id_user) },
    });
    await this.userRepository.delete(id_user);
  }
}
