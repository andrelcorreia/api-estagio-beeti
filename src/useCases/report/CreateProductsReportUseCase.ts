import { ProductsModel } from "@src/models/ProductsModel";
import xlsx from "node-xlsx";

export class CreateProductsReportUseCase {
  async execute(): Promise<any> {
    const productsModel = new ProductsModel();

    const list = await productsModel.findMany(0, 100);

    const promise = await Promise.all(
      list.map(async (item) => {
        return [item.created_at, item.name, item.description];
      })
    );

    const excel = [
      ["EMISSÃO DO RELATÓRIO", null, new Date()],
      ["DATA DE CRIAÇÃO", "NOME DO PRODUTO", "DESCRIÇÃO"],
      ...promise,
    ];

    const buffer = xlsx.build([
      {
        name: "Relatório de produtos",
        data: excel,
        options: {},
      },
    ]);

    return buffer;
  }
}
