import { CreateProductsReportUseCase } from "@src/useCases/report/CreateProductsReportUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreateProductsReportController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createProductsReportUseCase = new CreateProductsReportUseCase();

    const response = await createProductsReportUseCase.execute();

    reply.header("Content-Disposition", "attachment; filename=report.xlsx");

    return reply.send(response);
  }
}
