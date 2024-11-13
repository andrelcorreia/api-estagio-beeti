import { ServicesProvidedModel } from "@src/models/ServicesProvidedModel";
import xlsx from "node-xlsx";

export class CreateServicesProvidedReportUseCase {
  async execute(): Promise<any> {
    const servicesProvidedModel = new ServicesProvidedModel();

    const list = await servicesProvidedModel.findManyComplete(
      0,
      100,
      undefined
    );

    const promise = await Promise.all(
      list.map(async (item) => {
        return [
          item.created_at,
          item.description,
          item.estimated_date,
          item.technical_date ? "Sim" : "Não",
          item.client.name,
          item.user.name,
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
      ],
      ...promise,
    ];

    const buffer = xlsx.build([
      {
        name: "Relatório de serviços",
        data: excel,
        options: {},
      },
    ]);

    return buffer;
  }
}
