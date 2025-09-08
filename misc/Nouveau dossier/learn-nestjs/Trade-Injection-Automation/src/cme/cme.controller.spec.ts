import { Test, TestingModule } from '@nestjs/testing';
import { CmeController } from './cme.controller';

describe('CmeController', () => {
  let controller: CmeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CmeController],
    }).compile();

    controller = module.get<CmeController>(CmeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
