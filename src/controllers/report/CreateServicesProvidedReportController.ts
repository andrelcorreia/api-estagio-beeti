import { CreateServicesProvidedReportUseCase } from "@src/useCases/report/CreateServicesProvidedReportUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreateServicesProvidedReportController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createServicesProvidedReportUseCase =
      new CreateServicesProvidedReportUseCase();

    // const { initial_date, final_date, store_id } = request.query as {
    //   initial_date: string;
    //   final_date: string;
    //   store_id: string;
    // };

    const response = await createServicesProvidedReportUseCase.execute();

    reply.header("Content-Disposition", "attachment; filename=report.xlsx");

    // return reply.status(200).send(
    //   new AppResponse({
    //     code: 0,
    //     result: "success",
    //     message: "Transação listada com sucesso!",
    //     data: response,
    //   })
    // );

    return reply.send(response);
  }
}
