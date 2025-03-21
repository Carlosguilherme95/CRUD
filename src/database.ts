import { DataSource } from "typeorm";
import { User } from "./entity/entity";

export let dataSource: DataSource | null = null;

export async function createDatabaseConnection() {
  if (!dataSource || !dataSource.isInitialized) {
    dataSource = new DataSource({
      type: "mysql",
      host: "82.25.74.94",
      port: 3306,
      username: "root",
      password: "91016765Carlos@",
      database: "CRUD",
      synchronize: false,
      logging: false,
      entities: [User],
    });
    await dataSource.initialize();
    console.log("Conectado ao banco de dados");
  }
  return {
    userRepository: dataSource.getRepository(User),
  };
}
