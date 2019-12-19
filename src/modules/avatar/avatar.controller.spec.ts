import { Test, TestingModule } from '@nestjs/testing';
import { AvatarController } from './avatar.controller';

describe('Avatar Controller', () => {
  let controller: AvatarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AvatarController],
    }).compile();

    controller = module.get<AvatarController>(AvatarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
