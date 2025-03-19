import { AppDataSource } from "../database/data-source";
import { User } from "../entity/entity";

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
export async function deleteUser(id_user: number) {
  const userRepository = AppDataSource.getRepository(User);
  const userRepo = await userRepository.findOne({
    where: { id_user: Number(id_user) },
  });
  await userRepository.delete(id_user);
}

export async function getAllUser() {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const userRepo = userRepository.find();
    return userRepo;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    throw error;
  }
}
export async function getOneUser(id_user: string) {
  const userRepository = AppDataSource.getRepository(User);
  const userRepo = await userRepository.findOne({
    where: { id_user: Number(id_user) },
  });
  return userRepo;
}

export async function createUser(
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
  const userRepository = AppDataSource.getRepository(User);
  await userRepository.save(newUser);
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
