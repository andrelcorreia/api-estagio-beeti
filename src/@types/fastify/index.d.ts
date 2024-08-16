/* eslint-disable no-unused-vars */
import "fastify";

interface Multer {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

type MulterFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
};
declare module "fastify" {
  interface FastifyRequest {
    usrId: string;
    usrLocalId: number;
    usrCmpId: string;
    usrActive: boolean;
    usrAccId: number;
    moment: Date;
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      buffer: Buffer;
      size: number;
    };
    files: MulterFile | MulterFile[];
    Iss: string;
    Body: string;
  }

  interface FastifyReply {}

  interface FastifyInstance {
    authenticate: any;
    authenticateImage: any;
    upload: any;
  }
}
