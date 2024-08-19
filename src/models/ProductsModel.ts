import { ProductsDto } from "@src/dtos/ProductsDto";
import { prisma } from "@src/libs/prisma";

export interface IProductsModel {
  create(
    props: Omit<ProductsDto, "created_at" | "active">
  ): Promise<ProductsDto>;
  findById(id: string): Promise<ProductsDto | null>;
  findMany(page: number, limit: number): Promise<ProductsDto[]>;
  update(props: Omit<ProductsDto, "created_at">): Promise<ProductsDto>;
}

export class ProductsModel implements IProductsModel {
  async create(
    props: Omit<ProductsDto, "created_at" | "active">
  ): Promise<ProductsDto> {
    return prisma.products.create({ data: props });
  }

  async findById(id: string): Promise<ProductsDto | null> {
    return prisma.products.findFirst({
      where: {
        id,
        active: true,
      },
    });
  }

  async findMany(page: number, limit: number): Promise<ProductsDto[]> {
    return prisma.products.findMany({
      where: { active: true },
      take: limit,
      skip: page,
    });
  }

  async update(props: Omit<ProductsDto, "created_at">): Promise<ProductsDto> {
    return prisma.products.update({ where: { id: props.id }, data: props });
  }
}
