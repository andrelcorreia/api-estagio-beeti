import { Prisma } from "@prisma/client";
import env from "@src/config/config";
import { ProductsDto } from "@src/dtos/ProductsDto";
import {
  ServicesProvided,
  ServicesProvidedCompleteInfo,
} from "@src/dtos/ServicesProvidedDto";
import { prisma } from "@src/libs/prisma";

export interface IServicesProvidedModel {
  create(
    props: Omit<ServicesProvided, "created_at" | "active">
  ): Promise<ServicesProvided>;
  findById(id: string): Promise<ServicesProvided | null>;
  findMany(
    page: number,
    limit: number,
    description: string
  ): Promise<ServicesProvided[]>;
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

  async findMany(
    page: number,
    limit: number,
    description: string | undefined
  ): Promise<ServicesProvided[]> {
    return prisma.services_provided.findMany({
      where: { active: true, description },
      include: {
        clients: true,
        users: true,
      },
      take: limit,
      skip: page,
    });
  }

  async findManyComplete(
    page: number,
    limit: number,
    description?: string
  ): Promise<ServicesProvidedCompleteInfo[]> {
    const rows = await prisma.$queryRaw<any[]>`SELECT 
        sp.id, 
        sp.description, 
        sp.created_at, 
        sp.active, 
        sp.estimated_date, 
        sp.technical_date, 
        sp.user_id, 
        sp.client_id, 
        PGP_SYM_DECRYPT(clients.name::bytea, CAST(${
          env.DATABASE_KEY
        } AS varchar)) AS client_name, 
        PGP_SYM_DECRYPT(users.name::bytea, CAST(${
          env.DATABASE_KEY
        } AS varchar)) AS user_name 
      FROM services_provided sp 
      INNER JOIN clients ON sp.client_id = clients.id 
      INNER JOIN users ON sp.user_id = users.id 
      WHERE sp.active = true 
      ${
        description
          ? Prisma.sql`AND sp.description ILIKE '%' || ${description} || '%'`
          : Prisma.empty
      }
      ORDER BY sp.created_at DESC 
      LIMIT ${limit} OFFSET ${page * limit}`;

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
      user: { name: row.user_name },
    }));
  }

  async findManyCompleteById(id: string): Promise<any | null> {
    const rows = await prisma.$queryRaw<any>`SELECT 
        sp.id, 
        sp.description, 
        sp.created_at, 
        sp.active, 
        sp.estimated_date, 
        sp.technical_date, 
        sp.user_id, 
        sp.client_id, 
        PGP_SYM_DECRYPT(clients.name::bytea, CAST(${env.DATABASE_KEY} AS varchar)) AS client_name, 
        PGP_SYM_DECRYPT(users.name::bytea, CAST(${env.DATABASE_KEY} AS varchar)) AS user_name 
      FROM services_provided sp 
      INNER JOIN clients ON sp.client_id = clients.id 
      INNER JOIN users ON sp.user_id = users.id 
      WHERE sp.active = true 
      AND sp.id = ${id}`;

    const row = rows[0];

    if (!row) return null;

    return {
      id: row.id,
      description: row.description,
      created_at: row.created_at,
      active: row.active,
      estimated_date: row.estimated_date,
      technical_date: row.technical_date,
      user_id: row.user_id,
      client_id: row.client_id,
      client: { name: row.client_name },
      user: { name: row.user_name },
    };
  }

  async update(
    props: Omit<ServicesProvided, "created_at" | "active">
  ): Promise<ServicesProvided> {
    return prisma.services_provided.update({
      where: { id: props.id },
      data: props,
    });
  }

  async inactive(id: string): Promise<void> {
    prisma.services_provided.update({
      where: { id },
      data: {
        active: false,
      },
    });
  }
}
