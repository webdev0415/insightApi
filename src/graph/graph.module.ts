import { Module } from "@nestjs/common";
import { GraphService } from "./graph.service";
import { GraphController } from "./graph.controller";
import { GraphRepository } from "./graph.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphDataModule } from "src/graph-data/graph-data.module";
import { GraphDataRepository } from "src/graph-data/graph-data.repository";
@Module({
  imports: [
    TypeOrmModule.forFeature([GraphRepository, GraphDataRepository]),
    GraphDataModule,
  ],
  providers: [GraphService],
  controllers: [GraphController],
  exports: [GraphService],
})
export class GraphModule {}
