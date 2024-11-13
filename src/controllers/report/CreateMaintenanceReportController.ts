import { CreateMaintenanceReportUseCase } from "@src/useCases/report/CreateMaintenanceReportUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreateMaintenanceReportController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const createMaintenanceReportUseCase = new CreateMaintenanceReportUseCase();

    // const { initial_date, final_date, store_id } = request.query as {
    //   initial_date: string;
    //   final_date: string;
    //   store_id: string;
    // };

    const response = await createMaintenanceReportUseCase.execute();

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
