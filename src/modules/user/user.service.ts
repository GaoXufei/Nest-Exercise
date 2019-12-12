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

  /**
   * 创建用户
   * @param data
   */
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
  /**
   * 根据用户名查找用户信息
   * @param username
   */
  async getOneByUserName(username: string, isShowPwd?: boolean) {
    const createBuilder = await this.userRepository.createQueryBuilder('user');
    createBuilder.leftJoinAndSelect('user.posts', 'posts');
    createBuilder.where(`user.username = :username`, { username });
    if (isShowPwd) {
      createBuilder.addSelect('user.password');
    }
    const entity = createBuilder.getOne();
    if (!entity) {
      throw new BadRequestException('没有该用户!');
    }
    return entity;
  }
  /**
   * 修改密码
   * @param data
   */
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
  /**
   * 查找用户赞过的文章
   * @param id
   */
  async findLinked(id: number) {
    return await this.userRepository.findOne(id, { relations: ['voted', 'voted.user'] });
  }
}
