import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphDataController } from "./graph-data.controller";
import { GraphDataService } from "./graph-data.service";
import { GraphDataRepository } from "./graph-data.repository";

@Module({
  imports: [TypeOrmModule.forFeature([GraphDataRepository])],
  controllers: [GraphDataController],
  providers: [GraphDataService],
  exports: [GraphDataService],
})
export class GraphDataModule {}
