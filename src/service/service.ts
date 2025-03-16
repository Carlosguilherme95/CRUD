import { AppDataSource } from "../database/data-source";
import { User } from "../entity/entity";

export async function crateUser(
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
