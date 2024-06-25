import { Test, TestingModule } from '@nestjs/testing';
import { BuildingReportsService } from './buildings.service';

describe('BuildingsService', () => {
  let service: BuildingReportsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuildingReportsService],
    }).compile();

    service = module.get<BuildingReportsService>(BuildingReportsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
