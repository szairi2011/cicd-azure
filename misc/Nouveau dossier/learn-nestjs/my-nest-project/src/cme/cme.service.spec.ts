import { Test, TestingModule } from '@nestjs/testing';
import { CmeService } from './cme.service';

describe('CmeService', () => {
  let service: CmeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CmeService],
    }).compile();

    service = module.get<CmeService>(CmeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
