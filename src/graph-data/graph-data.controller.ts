import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { getManager } from "typeorm";
import { GraphDataDto } from "./dto/graph-data.dto";
import { TransactionFilterDto } from "./dto/transaction-filter.dto";
import { GraphData } from "./graph-data.entity";
import { GraphDataService } from "./graph-data.service";

@Controller("graph-data")
export class GraphDataController {
  constructor(private graphDataService: GraphDataService) {}

  @Get("/costing-codes")
  async getCostingCodes(): Promise<any> {
    const rawCostingCodes = await getManager().query(`SELECT x.job_id
      ,j.job_number
      ,x.cc_id
      ,c.code
      ,c.description
      ,x.expense_type
      ,SUM(x.base_cost_revised) budgeted_cost
      ,SUM(x.total_cost_posted_c) Actual_cost
      ,NULLIF(SUM(x.total_cost_posted_c),0) / nullIF(SUM(x.base_cost_revised),0) percent_spent
      FROM vd_bugted_vs_actual_costs x
      ,vd_job_info j
      ,costing_codes c
      WHERE x.job_Id = j.job_id
      AND x.cc_id = c.cc_id
      AND x.job_id= 7421
      GROUP BY x.job_id,x.cc_id,x.expense_type ,j.job_number ,c.code,c.description`);

    return rawCostingCodes;
  }

  @Get("/project-manager-cost")
  async getProjectManagerCosts(): Promise<any> {
    const rawProjectManagerCosts = await getManager().query(`
      SELECT e.employee_code
        , x.cost_code
        , x.cost_code_description
        , SUM(x.amount) COSTS
      FROM vd_job_actual_cost x
          , vd_job_info j
          , vd_employee_information e
      WHERE x.job_id = j.job_id
      AND j.employee_code_pm = e.employee_code
      GROUP BY x.cost_code
          , x.cost_code_description
          , e.employee_code
      ORDER BY employee_code, cost_code
    `);

    return rawProjectManagerCosts;
  }

  @Get("/data")
  async getTransactionSum(
    @Query("tablename") tablename: string,
    @Query("columnname") columnname: string,
    @Query("groupidentity") groupidentity: string,
    @Query("operation") operation: string,
    @Query("datefilter") datefilter: TransactionFilterDto
  ) {
    return this.graphDataService.getTransactionSum(
      tablename,
      columnname,
      groupidentity,
      operation,
      datefilter
    );
  }

  @Get()
  async getAllGraphData(): Promise<GraphData[]> {
    return this.graphDataService.getAllGraphData();
  }

  @Get("/:id")
  getUserDashboardById(
    @Param("id", ParseUUIDPipe)
    id: string
  ): Promise<GraphData> {
    return this.graphDataService.getGraphDataById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createGraphData(@Body() graphDataDto: GraphDataDto): Promise<GraphData> {
    return this.graphDataService.createGraphData(graphDataDto);
  }

  @Delete("/:id")
  deleteGraphDataById(
    @Param("id", ParseUUIDPipe)
    id: string
  ): Promise<void> {
    return this.graphDataService.deleteGraphDataById(id);
  }

  @Patch("/:id")
  updateUserDashboardById(
    @Param("id", ParseUUIDPipe)
    id: string,
    @Body() graphDataDto: GraphDataDto
  ): Promise<GraphData> {
    return this.graphDataService.updateGraphDataById(id, graphDataDto);
  }
}
