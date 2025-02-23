import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { Role } from '../common/roles';
import { NotificationService } from 'src/notifications/notifications.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private readonly notificationService: NotificationService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      where: {
        [Op.or]: [
          { email: createUserDto.email },
          { phone: createUserDto.phone },
        ],
      },
    });

    if (existingUser) {
      throw new ForbiddenException(
        'Email yoki telefon raqami allaqachon mavjud',
      );
    }

    if (createUserDto.password.length < 5) {
      throw new BadRequestException(
        'Parol kamida 5 ta belgidan iborat bolishi kerak',
      );
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.userModel.create(createUserDto);

    if (createUserDto.role === Role.ADMIN) {
      await this.notificationService.notifySuperAdminAboutNewAdminRequest(
        newUser.id,
      );
    }

    return newUser;
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.role = Role.USER;
    return this.createUser(createUserDto);
  }

  async createAdmin(createUserDto: CreateUserDto) {
    createUserDto.role = Role.ADMIN;
    return this.createUser(createUserDto);
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('Bunday foydalanuvchi mavjud emas');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    return await user.update(updateUserDto);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await user.destroy();
  }
}
