import { Users } from "@src/dtos/UsersDto";
import { UsersModel } from "@src/models/UsersModel";

export class ListAllUsersUseCase {
  async execute(): Promise<Users[]> {
    const usersModel = new UsersModel();

    const list = await usersModel.findAll();

    return list;
  }
}
