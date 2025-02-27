import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dto/login';
import { User } from 'src/users/user.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/common/roles';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = await this.userModel.create({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: hashedPassword,
        phone: createUserDto.phone,
        gender: createUserDto.gender,
        age: createUserDto.age,
        role: Role.USER,
        isApproved: true,
      });

      return {
        success: true,
        message: 'Roʻyxatdan muvaffaqiyatli oʻtdingiz.',
        userId: user.id,
      };
    } catch (error) {
      console.error('Roʻyxatdan oʻtishda xatolik:', error);
      return {
        success: false,
        message: 'Roʻyxatdan oʻtishda xatolik yuz berdi.',
        error: error.message,
      };
    }
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.userModel.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Foydalanuvchi topilmadi.');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Noto'g'ri parol.");
    }

    if (!user.isApproved) {
      throw new UnauthorizedException('Hisobingiz hali tasdiqlanmagan.');
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRATION_TIME || '24h',
      },
    );

    return {
      success: true,
      message: 'Tizimga muvaffaqiyatli kirdingiz.',
      token,
      role: user.role,
    };
  }

  async requestRoleChange(userId: number, requestedRole: Role) {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new UnauthorizedException('Foydalanuvchi topilmadi.');
    }

    if (requestedRole === Role.SUPER_ADMIN) {
      return {
        success: false,
        message: "Bu rolni so'rash mumkin emas.",
      };
    }

    user.role = requestedRole;
    user.isApproved = false;
    await user.save();

    return {
      success: true,
      message: `${requestedRole} roli uchun so'rov yuborildi. Tasdiqni kuting.`,
    };
  }

  async confirmUser(userId: number, approverRole: Role) {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new UnauthorizedException('Foydalanuvchi topilmadi.');
    }

    if (user.role === Role.ADMIN && approverRole !== Role.SUPER_ADMIN) {
      return {
        success: false,
        message: "Admin so'rovlarini faqat Super Admin tasdiqlashi mumkin.",
      };
    }

    if (
      user.role === Role.SELLER &&
      approverRole !== Role.ADMIN &&
      approverRole !== Role.SUPER_ADMIN
    ) {
      return {
        success: false,
        message:
          "Seller so'rovlarini faqat Admin yoki Super Admin tasdiqlashi mumkin.",
      };
    }

    user.isApproved = true;
    await user.save();

    return {
      success: true,
      message: 'Foydalanuvchi tasdiqlandi.',
    };
  }

  async getUserProfile(userId: number) {
    const user = await this.userModel.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw new UnauthorizedException('Foydalanuvchi topilmadi.');
    }

    return user;
  }
}
