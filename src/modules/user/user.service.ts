import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto, UpdatePasswordDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { /** */ }

  async create(data: UserDto) {
    const { username } = data;
    const user = await this.userRepository.findOne({ username });
    if (user) {
      throw new BadRequestException('用户已存在！');
    }
    const entity = await this.userRepository.create(data);
    await this.userRepository.save(entity);
    return entity;
  }

  async getOneByUserName(username: string) {
    const result = await this.userRepository.findOne({ username }, { relations: ['posts'] });
    if (!result) {
      throw new BadRequestException('没有该用户!');
    }
    return result;
  }

  async updatePassword(data: UpdatePasswordDto) {
    // 获取用户提交
    const { username, password, newPassword } = data;
    // 使用用户名进行查询得到用户实体
    const userEntity = await this.userRepository.findOne({ username });
    // 如果没有则抛出异常
    if (!userEntity) { throw new NotFoundException('未找到该用户'); }
    // 对比用户输入的密码
    const isPass = await userEntity.comparePassword(password);
    // 如果密码比对失败则抛出异常
    if (!isPass) { throw new BadRequestException('密码验证失败'); }
    // 将密码修改
    userEntity.password = newPassword;
    return await this.userRepository.save(userEntity);
  }
}
