import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GraphDataDto } from "./dto/graph-data.dto";
import { TransactionFilterDto } from "./dto/transaction-filter.dto";
import { GraphData } from "./graph-data.entity";
import { GraphDataRepository } from "./graph-data.repository";

@Injectable()
export class GraphDataService {
  constructor(
    @InjectRepository(GraphDataRepository)
    private graphDataRepository: GraphDataRepository
  ) {}

  async getAllGraphData(): Promise<GraphData[]> {
    const found = await this.graphDataRepository.getAllGraphData();
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async getGraphDataById(id: string): Promise<GraphData> {
    const found = await this.graphDataRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async createGraphData(graphDataDto: GraphDataDto): Promise<GraphData> {
    return this.graphDataRepository.createGraphData(graphDataDto);
  }

  async deleteGraphDataById(id: string): Promise<void> {
    const result = await this.graphDataRepository.delete(id);
    if (!result) {
      throw new NotFoundException();
    }
  }

  async updateGraphDataById(
    id: string,
    graphDataDto: GraphDataDto
  ): Promise<GraphData> {
    const { name, data } = graphDataDto,
      graphData = await this.getGraphDataById(id);

    if (!graphData) {
      throw new NotFoundException();
    }

    graphData.name = name;
    graphData.data = data;

    await graphData.save();
    return graphData;
  }

  async getTransactionSum(
    columnname: string,
    tablename: string,
    groupidentity: string,
    operation: string,
    datefilter: TransactionFilterDto
  ): Promise<any> {
    const foundSum = await this.graphDataRepository.getTransactionSum(
      columnname,
      tablename,
      groupidentity,
      operation,
      datefilter
    );
    if (!foundSum) {
      throw new NotFoundException();
    }
    return foundSum;
  }
}
