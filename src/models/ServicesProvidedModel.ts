import { ProductsDto } from "@src/dtos/ProductsDto";
import { ServicesProvided } from "@src/dtos/ServicesProvidedDto";
import { prisma } from "@src/libs/prisma";

export interface IServicesProvidedModel {
  create(
    props: Omit<ServicesProvided, "created_at" | "active">
  ): Promise<ServicesProvided>;
  findById(id: string): Promise<ServicesProvided | null>;
  findMany(page: number, limit: number): Promise<ServicesProvided[]>;
  update(
    props: Omit<ServicesProvided, "created_at">
  ): Promise<ServicesProvided>;
}

export class ServicesProvidedModel implements IServicesProvidedModel {
  async create(
    props: Omit<ServicesProvided, "created_at" | "active">
  ): Promise<ServicesProvided> {
    return prisma.services_provided.create({ data: props });
  }

  async findById(id: string): Promise<ServicesProvided | null> {
    return prisma.services_provided.findFirst({
      where: {
        id,
        active: true,
      },
    });
  }

  async findMany(page: number, limit: number): Promise<ServicesProvided[]> {
    return prisma.services_provided.findMany({
      where: { active: true },
      take: limit,
      skip: page,
    });
  }

  async update(
    props: Omit<ServicesProvided, "created_at">
  ): Promise<ServicesProvided> {
    return prisma.services_provided.update({
      where: { id: props.id },
      data: props,
    });
  }
}
