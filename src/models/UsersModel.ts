import env from "@src/config/config";
import { Users } from "@src/dtos/UsersDto";
import { prisma } from "@src/libs/prisma";

export interface IUsersModel {
  create(data: Omit<Users, "id" | "created_at" | "active">): Promise<Users>;
  findById(id: string): Promise<Users | null>;
  findByEmail(email: string): Promise<Users | null>;
  findAll(): Promise<Users[]>;
  update(
    data: Omit<Users, "father" | "active" | "password" | "created_at">
  ): Promise<Users>;
}

export class UsersModel implements IUsersModel {
  async create(data: Omit<Users, "created_at" | "active">): Promise<Users> {
    console.log({ data });
    const rows: Users[] = await prisma.$queryRaw<Users[]>`
    INSERT INTO users 
    (
      id,
      email,
      name,
      password,
      access_level_id
    )
    VALUES
    (
      ${data.id}::uuid,
      PGP_SYM_ENCRYPT(${data.email}, CAST(${env.DATABASE_KEY} AS varchar)),
      PGP_SYM_ENCRYPT(${data.name}, CAST(${env.DATABASE_KEY} AS varchar)),
      ${data.password}::varchar,
      ${data.access_level_id}
    )
    RETURNING
      id,
      PGP_SYM_DECRYPT(email, CAST(${env.DATABASE_KEY} AS varchar)) AS email,
      PGP_SYM_DECRYPT(name, CAST(${env.DATABASE_KEY} AS varchar)) AS name,
      created_at,
      active,
      access_level_id
    `;

    return rows[0];
  }

  async findById(id: string): Promise<Users | null> {
    const rows = await prisma.$queryRaw<Users[]>`
    SELECT 
    id,
    PGP_SYM_DECRYPT(email, CAST(${env.DATABASE_KEY} AS varchar)) AS email,
    PGP_SYM_DECRYPT(name, CAST(${env.DATABASE_KEY} AS varchar)) AS name,
    password,
    created_at,
    active,
    access_level_id
    FROM users
    WHERE id = ${id}::varchar`;

    return rows[0];
  }

  async findByEmail(email: string): Promise<Users> {
    const rows: Users[] = await prisma.$queryRaw<Users[]>`
    SELECT 
    id,
    PGP_SYM_DECRYPT(email, CAST(${env.DATABASE_KEY} AS varchar)) AS email,
    PGP_SYM_DECRYPT(name, CAST(${env.DATABASE_KEY} AS varchar)) AS name,
    password,
    created_at,
    active,
    access_level_id
    FROM users
    WHERE  
    PGP_SYM_DECRYPT(email, CAST(${env.DATABASE_KEY} AS varchar)) = CAST(${email} AS varchar)
    `;

    return rows[0];
  }

  async findAll(): Promise<Users[]> {
    const rows = await prisma.$queryRaw<Users[]>`
    SELECT 
    id,
    PGP_SYM_DECRYPT(email, CAST(${env.DATABASE_KEY} AS varchar)) AS email,
    PGP_SYM_DECRYPT(name, CAST(${env.DATABASE_KEY} AS varchar)) AS name,
    password,
    created_at,
    active,
    access_level_id
    FROM users
    `;

    return rows;
  }

  async update(
    data: Omit<Users, "father" | "active" | "password" | "created_at">
  ): Promise<Users> {
    const rows = await prisma.$queryRaw<Users[]>`
    UPDATE users SET
    email = PGP_SYM_ENCRYPT(${data.email}, CAST(${env.DATABASE_KEY} AS varchar)),
    name = PGP_SYM_ENCRYPT(${data.name}, CAST(${env.DATABASE_KEY} AS varchar))
    WHERE id = ${data.id}::varchar
    RETURNING
    id,
    PGP_SYM_DECRYPT(email, CAST(${env.DATABASE_KEY} AS varchar)) AS email,
    PGP_SYM_DECRYPT(name, CAST(${env.DATABASE_KEY} AS varchar)) AS name,
    password,
    created_at,
    active,
    access_level_id
    `;

    return rows[0];
  }

  async updatePassword(id: string, password: string): Promise<Users> {
    const rows = await prisma.$queryRaw<Users[]>`
    UPDATE users SET
    password =  ${password}::varchar
    WHERE id = ${id}::varchar
    RETURNING
    id,
    PGP_SYM_DECRYPT(email, CAST(${env.DATABASE_KEY} AS varchar)) AS email,
    PGP_SYM_DECRYPT(name, CAST(${env.DATABASE_KEY} AS varchar)) AS name,
    password,
    created_at,
    active,
    access_level_id
    `;

    return rows[0];
  }

  async count(): Promise<number> {
    return prisma.users.count();
  }
}
