import { ClientsDto } from "@src/dtos/ClientsDto";
import { prisma } from "@src/libs/prisma";
import env from "@src/config/config";

export interface IClientsModel {
  create(data: Omit<ClientsDto, "created_at" | "active">): Promise<ClientsDto>;
  findById(id: string): Promise<ClientsDto | null>;
  findByDocument(document: string): Promise<ClientsDto | null>;
  findByTelephone(telephone: string): Promise<ClientsDto | null>;
  findAll(page: number, limit: number): Promise<ClientsDto[]>;
  update(
    data: Omit<ClientsDto, "document" | "active" | "created_at">
  ): Promise<ClientsDto>;
}

export class ClientsModel implements IClientsModel {
  async create(
    data: Omit<ClientsDto, "created_at" | "active">
  ): Promise<ClientsDto> {
    const rows: ClientsDto[] = await prisma.$queryRaw`
    INSERT INTO clients 
    (
      id,
      name,
      document,
      full_address,
      telephone
    )
    VALUES
    (
      ${data.id}::uuid,
      PGP_SYM_ENCRYPT(${data.name}, CAST(${env.DATABASE_KEY} AS varchar)),
      PGP_SYM_ENCRYPT(${data.document}, CAST(${env.DATABASE_KEY} AS varchar)),
      PGP_SYM_ENCRYPT(${data.full_address}, CAST(${env.DATABASE_KEY} AS varchar)),
      PGP_SYM_ENCRYPT(${data.telephone}, CAST(${env.DATABASE_KEY} AS varchar))
    )
    RETURNING
      id,
      PGP_SYM_DECRYPT(name, CAST(${env.DATABASE_KEY} AS varchar)) AS name,
      PGP_SYM_DECRYPT(document, CAST(${env.DATABASE_KEY} AS varchar)) AS document,
      PGP_SYM_DECRYPT(full_address, CAST(${env.DATABASE_KEY} AS varchar)) AS full_address,
      PGP_SYM_DECRYPT(telephone, CAST(${env.DATABASE_KEY} AS varchar)) AS telephone,
      created_at,
      active
    `;

    return rows[0];
  }

  async findById(id: string): Promise<ClientsDto | null> {
    const rows: ClientsDto[] = await prisma.$queryRaw`
    SELECT
    id,
    PGP_SYM_DECRYPT(name, CAST(${env.DATABASE_KEY} AS varchar)) AS name,
    PGP_SYM_DECRYPT(document, CAST(${env.DATABASE_KEY} AS varchar)) AS document,
    PGP_SYM_DECRYPT(full_address, CAST(${env.DATABASE_KEY} AS varchar)) AS full_address,
    PGP_SYM_DECRYPT(telephone, CAST(${env.DATABASE_KEY} AS varchar)) AS telephone,
    created_at,
    active
    FROM clients
    WHERE active = TRUE AND id = ${id}::varchar
    `;

    return rows[0];
  }

  async findByDocument(document: string): Promise<ClientsDto | null> {
    const rows: ClientsDto[] = await prisma.$queryRaw`
    SELECT
    id,
    PGP_SYM_DECRYPT(name, CAST(${env.DATABASE_KEY} AS varchar)) AS name,
    PGP_SYM_DECRYPT(document, CAST(${env.DATABASE_KEY} AS varchar)) AS document,
    PGP_SYM_DECRYPT(full_address, CAST(${env.DATABASE_KEY} AS varchar)) AS full_address,
    PGP_SYM_DECRYPT(telephone, CAST(${env.DATABASE_KEY} AS varchar)) AS telephone,
    created_at,
    active
    FROM clients
    WHERE active = TRUE AND PGP_SYM_DECRYPT(document, CAST(${env.DATABASE_KEY} AS varchar)) = ${document}::varchar`;

    return rows[0];
  }

  async findByTelephone(telephone: string): Promise<ClientsDto | null> {
    const rows: ClientsDto[] = await prisma.$queryRaw`
    SELECT
    id,
    PGP_SYM_DECRYPT(name, CAST(${env.DATABASE_KEY} AS varchar)) AS name,
    PGP_SYM_DECRYPT(document, CAST(${env.DATABASE_KEY} AS varchar)) AS document,
    PGP_SYM_DECRYPT(full_address, CAST(${env.DATABASE_KEY} AS varchar)) AS full_address,
    PGP_SYM_DECRYPT(telephone, CAST(${env.DATABASE_KEY} AS varchar)) AS telephone,
    created_at,
    active
    FROM clients
    WHERE active = TRUE AND PGP_SYM_DECRYPT(document, CAST(${env.DATABASE_KEY} AS varchar)) = ${telephone}::varchar`;

    return rows[0];
  }

  async findAll(page: number, limit: number): Promise<ClientsDto[]> {
    const rows: ClientsDto[] = await prisma.$queryRaw`
    SELECT
    id,
    PGP_SYM_DECRYPT(name, CAST(${env.DATABASE_KEY} AS varchar)) AS name,
    PGP_SYM_DECRYPT(document, CAST(${env.DATABASE_KEY} AS varchar)) AS document,
    PGP_SYM_DECRYPT(full_address, CAST(${
      env.DATABASE_KEY
    } AS varchar)) AS full_address,
    PGP_SYM_DECRYPT(telephone, CAST(${
      env.DATABASE_KEY
    } AS varchar)) AS telephone,
    created_at,
    active
    FROM clients
    WHERE active = TRUE
    LIMIT ${limit}
    OFFSET ${Number(page) * Number(limit)}
    `;

    return rows;
  }

  async update(
    data: Omit<ClientsDto, "document" | "created_at">
  ): Promise<ClientsDto> {
    const rows: ClientsDto[] = await prisma.$queryRaw`
    UPDATE clients SET
    name = PGP_SYM_ENCRYPT(${data.name}, CAST(${env.DATABASE_KEY} AS varchar)),
    full_address = PGP_SYM_ENCRYPT(${data.full_address}, CAST(${env.DATABASE_KEY} AS varchar)),
    telephone = PGP_SYM_ENCRYPT(${data.telephone}, CAST(${env.DATABASE_KEY} AS varchar)),
    active = ${data.active}::boolean
    WHERE id = ${data.id}::varchar
    RETURNING
    id,
    PGP_SYM_DECRYPT(name, CAST(${env.DATABASE_KEY} AS varchar)) AS name,
    PGP_SYM_DECRYPT(document, CAST(${env.DATABASE_KEY} AS varchar)) AS document,
    PGP_SYM_DECRYPT(full_address, CAST(${env.DATABASE_KEY} AS varchar)) AS full_address,
    PGP_SYM_DECRYPT(telephone, CAST(${env.DATABASE_KEY} AS varchar)) AS telephone,
    created_at,
    active
    `;

    return rows[0];
  }

  async inactive(id: string): Promise<ClientsDto> {
    const rows: ClientsDto[] = await prisma.$queryRaw`
    UPDATE clients SET
    active = false
    WHERE id = ${id}::varchar
    RETURNING
    id,
    PGP_SYM_DECRYPT(name, CAST(${env.DATABASE_KEY} AS varchar)) AS name,
    PGP_SYM_DECRYPT(document, CAST(${env.DATABASE_KEY} AS varchar)) AS document,
    PGP_SYM_DECRYPT(full_address, CAST(${env.DATABASE_KEY} AS varchar)) AS full_address,
    PGP_SYM_DECRYPT(telephone, CAST(${env.DATABASE_KEY} AS varchar)) AS telephone,
    created_at,
    active
    `;

    return rows[0];
  }
}
