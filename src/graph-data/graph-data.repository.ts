import { EntityRepository, Repository } from "typeorm";
import { GraphDataDto } from "./dto/graph-data.dto";
import { TransactionFilterDto } from "./dto/transaction-filter.dto";
import { GraphData } from "./graph-data.entity";

@EntityRepository(GraphData)
export class GraphDataRepository extends Repository<GraphData> {
  async createGraphData(graphDataDto: GraphDataDto): Promise<GraphData> {
    const { name, data } = graphDataDto,
      graphData = new GraphData();
    graphData.name = name;
    graphData.data = data;

    await graphData.save();
    return graphData;
  }

  async getAllGraphData(): Promise<GraphData[]> {
    const query = this.createQueryBuilder("graph-data"),
      graphDatas = await query.getMany();
    return graphDatas;
  }

  async getTransactionSum(
    tablename: string,
    columnname: string,
    groupidentity: string,
    operation: string,
    datefilter: TransactionFilterDto
  ): Promise<any> {
    /*
     *   Let filterDate= {}
     * for (const filterkey of Object.keys(datefilter)) {
     *    filterDate = `${filterkey}: ${datefilter[filterkey]}`
     * }
     */
    const query = this.createQueryBuilder()
      .select(`t.${columnname}`)
      .from(`${tablename}`, "t")
      .getRawMany();

    /*
     * .groupBy(`t.${groupidentity}`)
     * .addSelect(`${operation}(a)`, "total_amount")
     * .where('datefilter.column = :column', {column: datefilter.column})
     * .andWhere('datefilter.value = : value', {value: datefilter.value})
     */
  }
}
