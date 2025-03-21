import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { User } from "../entity/entity";
import { createDatabaseConnection } from "../database";

import jwt from "jsonwebtoken";
export const SECRET: string = process.env.JWT_SECRET || "JWT";

export async function modifyUser(
  id_user: number,
  updateData: { name: string; email: string; user: string; password: string }
) {
  const userRepository = AppDataSource.getRepository(User);
  const userRepo = await userRepository.findOne({
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
    await userRepository.save(userRepo);
  }
}

export async function userLogin(user: string, password: string) {
  const userRepository = AppDataSource.getRepository(User);
  const userRepo = await userRepository.findOne({
    where: {
      user: user,
      password: password,
    },
  });
  if (!userRepo) {
    throw new Error("usuário ou senha não encontrado");
  }
  const token = jwt.sign(
    {
      userId: userRepo.id_user,
      user: userRepo.user,
    },
    SECRET,
    { expiresIn: "1h" }
  );
  return {
    token,
  };
}

export class UserService {
  constructor(private userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  async findAll() {
    return this.userRepository.find();
  }
  async FindOne(id_user: number): Promise<User | null> {
    const user = this.userRepository.findOne({
      where: { id_user },
    });
    return user;
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
    const addUser = this.userRepository.save(newUser);
    return addUser;
  }
  async deleteUser(id_user: number) {
    const user = this.userRepository.findOne({
      where: { id_user },
    });
    await this.userRepository.delete(id_user);
  }
  async modifyUser(
    id_user: number,
    updateData: { name: string; email: string; user: string; password: string }
  ) {
    const user = await this.userRepository.findOne({
      where: { id_user },
    });
    if (!user) {
      throw new Error("usuário não encontrado na base de dados");
    }
    user.name = updateData.name;
    user.email = updateData.email;
    user.user = updateData.user;
    user.password = updateData.password;
    console.log(`usuário modificado com sucesso ${user}`);
    return await this.userRepository.save(user);
  }
}

export async function createUserService(): Promise<UserService> {
  const { userRepository } = await createDatabaseConnection();
  return new UserService(userRepository);
}
