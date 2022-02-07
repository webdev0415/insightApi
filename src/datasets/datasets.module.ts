import { Module } from "@nestjs/common";
import { DatasetsService } from "./datasets.service";
import { DatasetsController } from "./datasets.controller";

@Module({
  controllers: [DatasetsController],
  providers: [DatasetsService],
})
export class DatasetsModule {}
