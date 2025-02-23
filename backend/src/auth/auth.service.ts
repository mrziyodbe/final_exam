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

      const isAdmin = createUserDto.role === Role.ADMIN;
      const isSeller = createUserDto.role === Role.SELLER;

      const user = await this.userModel.create({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: hashedPassword,
        phone: createUserDto.phone,
        gender: createUserDto.gender,
        age: createUserDto.age,
        role: createUserDto.role || Role.USER, // Default USER
        isApproved: isAdmin || isSeller ? false : true, // Admin & Seller tasdiq kerak
      });

      return {
        success: true,
        message: isAdmin
          ? 'Admin sifatida roʻyxatdan oʻtildi. Super admin tasdigʻini kuting.'
          : isSeller
            ? 'Seller sifatida roʻyxatdan oʻtildi. Admin tasdigʻini kuting.'
            : 'Roʻyxatdan muvaffaqiyatli oʻtdingiz.',
        userId: user.id,
      };
    } catch (error) {
      console.error(' Roʻyxatdan oʻtishda xatolik:', error);
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
      },
      {
        secret: process.env.JWT_SECRET, // 🔥 JWT_SECRET qo‘shildi
        expiresIn: process.env.JWT_EXPIRATION_TIME || '1h', // 🔥 Expiration qo‘shildi
      },
    );

    return {
      success: true,
      message: 'Tizimga muvaffaqiyatli kirdingiz.',
      token,
    };
  }

  async confirmUser(userId: number) {
    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new UnauthorizedException('Foydalanuvchi topilmadi.');
    }

    user.isApproved = true;
    await user.save();

    return {
      success: true,
      message: 'Foydalanuvchi tasdiqlandi.',
    };
  }
}
