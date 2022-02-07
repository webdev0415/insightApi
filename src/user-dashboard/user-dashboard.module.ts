import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GraphModule } from "../graph/graph.module";
import { GraphRepository } from "src/graph/graph.repository";
import { UserDashboardController } from "./user-dashboard.controller";
import { UserDashboardRepository } from "./user-dashboard.repository";
import { UserDashboardService } from "./user-dashboard.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDashboardRepository]),
    TypeOrmModule.forFeature([GraphRepository]),
    GraphModule,
  ],
  controllers: [UserDashboardController],
  providers: [UserDashboardService],
})
export class UserDashboardModule {}
