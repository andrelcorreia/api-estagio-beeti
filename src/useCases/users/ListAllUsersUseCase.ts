import { Users } from "@src/dtos/UsersDto";
import { UsersModel } from "@src/models/UsersModel";

export class ListAllUsersUseCase {
  async execute(): Promise<{ list: Users[]; total: number }> {
    const usersModel = new UsersModel();

    const list = await usersModel.findAll();

    const count = await usersModel.count();

    return { list, total: count };
  }
}
