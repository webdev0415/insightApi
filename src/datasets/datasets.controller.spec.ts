import { Test, TestingModule } from "@nestjs/testing";
import { DatasetsController } from "./datasets.controller";
import { DatasetsService } from "./datasets.service";

describe("DatasetsController", () => {
  let controller: DatasetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatasetsController],
      providers: [DatasetsService],
    }).compile();

    controller = module.get<DatasetsController>(DatasetsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
