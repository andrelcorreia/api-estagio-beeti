import { Prisma } from "@prisma/client";
import env from "@src/config/config";
import { Maintenance, MaintenanceCompleteInfo } from "@src/dtos/MaintenanceDto";
import { prisma } from "@src/libs/prisma";

export interface IMaintenanceModel {
  create(
    props: Omit<Maintenance, "created_at" | "active">
  ): Promise<Maintenance>;
  findById(id: string): Promise<Maintenance | null>;
  findMany(page: number, limit: number): Promise<Maintenance[]>;
  update(props: Omit<Maintenance, "created_at">): Promise<Maintenance>;
}

export class MaintenanceModel implements IMaintenanceModel {
  async create(
    props: Omit<Maintenance, "created_at" | "active">
  ): Promise<Maintenance> {
    return prisma.maintenance.create({ data: props });
  }

  async findById(id: string): Promise<Maintenance | null> {
    return prisma.maintenance.findFirst({
      where: {
        id,
        active: true,
      },
    });
  }

  async findbyIdComplete(id: string): Promise<any | null> {
    console.log({ id });
    const rows = await prisma.$queryRaw<any>`SELECT 
        main.id, 
        main.description, 
        main.created_at, 
        main.active, 
        main.estimated_date, 
        main.technical_date, 
        main.user_id, 
        main.client_id, 
        PGP_SYM_DECRYPT(clients.name::bytea, CAST(${env.DATABASE_KEY} AS varchar)) AS client_name, 
        PGP_SYM_DECRYPT(users.name::bytea, CAST(${env.DATABASE_KEY} AS varchar)) AS user_name 
      FROM maintenance main 
      INNER JOIN clients ON main.client_id = clients.id 
      INNER JOIN users ON main.user_id = users.id 
      WHERE main.active = true 
      AND main.id = ${id}
      `;

    // Mapeando para a interface correta
    return {
      id: rows.id,
      description: rows.description,
      created_at: rows.created_at,
      active: rows.active,
      estimated_date: rows.estimated_date,
      technical_date: rows.technical_date,
      user_id: rows.user_id,
      client_id: rows.client_id,
      client: { name: rows.client_name },
      user: { name: rows.user_name },
    };
  }

  async findMany(page: number, limit: number): Promise<Maintenance[]> {
    return prisma.maintenance.findMany({
      where: { active: true },
      take: limit,
      skip: page,
    });
  }

  async findManyComplete(
    page: number,
    limit: number,
    description: string | undefined
  ): Promise<MaintenanceCompleteInfo[]> {
    const rows = await prisma.$queryRaw<any[]>`SELECT 
        main.id, 
        main.description, 
        main.created_at, 
        main.active, 
        main.estimated_date, 
        main.technical_date, 
        main.user_id, 
        main.client_id, 
        PGP_SYM_DECRYPT(clients.name::bytea, CAST(${
          env.DATABASE_KEY
        } AS varchar)) AS client_name, 
        PGP_SYM_DECRYPT(users.name::bytea, CAST(${
          env.DATABASE_KEY
        } AS varchar)) AS user_name 
      FROM maintenance main 
      INNER JOIN clients ON main.client_id = clients.id 
      INNER JOIN users ON main.user_id = users.id 
      WHERE main.active = true 
      ${
        description
          ? Prisma.sql`AND main.description ILIKE '%' || ${description} || '%'`
          : Prisma.empty
      }
      ORDER BY main.created_at DESC 
      LIMIT ${limit} OFFSET ${page * limit}`;

    // Mapeando para a interface correta
    return rows.map((row) => ({
      id: row.id,
      description: row.description,
      created_at: row.created_at,
      active: row.active,
      estimated_date: row.estimated_date,
      technical_date: row.technical_date,
      user_id: row.user_id,
      client_id: row.client_id,
      client: { name: row.client_name },
      product: { name: row.product_name },
      user: { name: row.user_name },
    }));
  }

  async update(
    props: Omit<Maintenance, "created_at" | "active">
  ): Promise<Maintenance> {
    return prisma.maintenance.update({
      where: { id: props.id },
      data: props,
    });
  }

  async inactive(id: string): Promise<void> {
    prisma.maintenance.update({
      where: { id },
      data: {
        active: false,
      },
    });
  }
}
