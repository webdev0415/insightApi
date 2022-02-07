import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { DatasetsService } from "./datasets.service";
import { CreateDatasetDto } from "./entities/dto/create-dataset.dto";
import { UpdateDatasetDto } from "./entities/dto/update-dataset.dto";

@Controller("datasets")
export class DatasetsController {
  constructor(private readonly datasetsService: DatasetsService) {}

  @Get()
  findAll() {
    return this.datasetsService.findAll();
  }

  @Get("/data")
  findData(
    @Query("table") table: string,
    @Query("column") column: string,
    @Query("measureColumn") measureColumn: string,
    @Query("operation") operation: string,
    @Query("filters") filters: any,
    @Query("columnFormat") columnFormat?: string,
    @Query("orderBy") orderBy?: string,
    @Query("groupColumn") groupColumn?: string
  ) {
    const parsedFilters = JSON.parse(decodeURIComponent(filters));

    return this.datasetsService.findData(
      table,
      column,
      measureColumn,
      operation,
      parsedFilters,
      columnFormat,
      orderBy,
      groupColumn
    );
  }
}
