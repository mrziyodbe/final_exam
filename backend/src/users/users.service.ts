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
        'Parol kamida 5 ta belgidan iborat bo‘lishi kerak',
      );
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const isAdmin = createUserDto.role === Role.ADMIN;
    const isSeller = createUserDto.role === Role.SELLER;

    const newUser = await this.userModel.create({
      ...createUserDto,
      isApproved: isAdmin || isSeller ? false : true, // Admin va Seller tasdiqlanishi kerak
    });

    if (isAdmin) {
      await this.notificationService.sendNotificationToRole(
        Role.SUPER_ADMIN,
        `Yangi admin ro'yxatdan o'tdi: ${createUserDto.email}`,
      );
    } else if (isSeller) {
      await this.notificationService.sendNotificationToRoles(
        [Role.ADMIN, Role.SUPER_ADMIN],
        `Yangi seller ro'yxatdan o'tdi: ${createUserDto.email}`,
      );
    }

    return newUser;
  }

  // ✅ Oddiy foydalanuvchi yaratish
  async create(createUserDto: CreateUserDto) {
    createUserDto.role = Role.USER;
    return this.createUser(createUserDto);
  }

  // ✅ Super Admin faqat admin yaratishi mumkin
  async createAdmin(createUserDto: CreateUserDto) {
    createUserDto.role = Role.ADMIN;
    return this.createUser(createUserDto);
  }

  // ✅ Seller yaratish (tasdiqlanishi kerak)
  async createSeller(createUserDto: CreateUserDto) {
    createUserDto.role = Role.SELLER;
    return this.createUser(createUserDto);
  }

  async findAll() {
    return this.userModel.findAll();
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException('Bunday foydalanuvchi mavjud emas');
    }
    return user;
  }
  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return await user.update(updateUserDto);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return await user.destroy();
  }

  async findByApprovalStatus(isApproved: boolean) {
    return this.userModel.findAll({
      where: { isApproved },
    });
  }

  async findByRole(role: Role) {
    return this.userModel.findAll({
      where: { role },
    });
  }

  async getPendingApprovals() {
    return this.userModel.findAll({
      where: { isApproved: false },
    });
  }

  // ✅ **Super Admin faqat adminlarni tasdiqlashi mumkin**
  async approveAdmin(id: number) {
    const user = await this.findOne(id);
    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException('Faqat adminni tasdiqlash mumkin.');
    }

    user.isApproved = true;
    await user.save();
    return { message: `Admin tasdiqlandi: ${user.email}` };
  }

  // ✅ **Adminlar faqat sellerlarni tasdiqlashi mumkin**
  async approveSeller(id: number) {
    const user = await this.findOne(id);
    if (user.role !== Role.SELLER) {
      throw new ForbiddenException('Faqat sellerlarni tasdiqlash mumkin.');
    }

    user.isApproved = true;
    await user.save();
    return { message: `Seller tasdiqlandi: ${user.email}` };
  }
}
