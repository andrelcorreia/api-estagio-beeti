import { MaintenanceModel } from "@src/models/MaintenanceModel";
import xlsx from "node-xlsx";

export class CreateMaintenanceReportUseCase {
  async execute(): Promise<any> {
    const maintenanceModel = new MaintenanceModel();

    // const test = await maintenanceModel.findById()

    const list = await maintenanceModel.findManyComplete(0, 100, undefined);

    const promise = await Promise.all(
      list.map(async (item) => {
        return [
          item.created_at,
          item.description,
          item.estimated_date,
          item.technical_date ? "Sim" : "Não",
          item.client.name,
          item.user.name,
          item.product.name,
        ];
      })
    );

    const excel = [
      ["EMISSÃO DO RELATÓRIO", null, new Date()],
      [
        "DATA DE CRIAÇÃO",
        "DESCRIÇÃO",
        "DATA ESTIMADA",
        "VISITA TÉCNICA",
        "NOME DO CLIENTE",
        "NOME DO USUÁRIO",
        "NOME DO PRODUTO",
      ],
      ...promise,
    ];

    const buffer = xlsx.build([
      {
        name: "Relatório de manutenção",
        data: excel,
        options: {},
      },
    ]);

    return buffer;
  }
}
