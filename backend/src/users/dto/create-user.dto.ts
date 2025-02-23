import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsBoolean,
  Matches,
  Length,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { Role } from 'src/common/roles';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Ism bosh bo‘lmasligi kerak' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Familya bosh bo‘lmasligi kerak' })
  lastName: string;

  @IsString()
  @IsNotEmpty({ message: 'Email bosh bo‘lmasligi kerak' })
  @IsEmail({}, { message: 'Email noto‘g‘ri formatda' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(13, 13, { message: 'Phone number must be exactly 13 digits' })
  @Matches(/^\+998\d{9}$/, {
    message: 'Phone number must start with +998 and contain exactly 9 digits',
  })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Parol bosh bo‘lmasligi kerak' })
  @MinLength(8, { message: 'Parol kamida 8 ta belgi bo‘lishi kerak' })
  password: string;

  @IsNotEmpty({ message: 'Role tanlanishi kerak' })
  @IsEnum(Role, { message: 'Noto‘g‘ri role qiymati' })
  role: Role;

  @IsEnum(Gender, {
    message: 'Gender faqat "male" yoki "female" bo‘lishi kerak',
  })
  @IsNotEmpty({ message: 'Gender tanlanishi kerak' })
  gender: Gender;

  @IsInt({ message: 'Yosh butun son bo‘lishi kerak' })
  @Min(12, { message: 'Yosh 12 dan kichik bo‘lishi mumkin emas' })
  @Max(100, { message: 'Yosh 100 dan katta bo‘lishi mumkin emas' })
  @IsOptional()
  age?: number;

  @IsBoolean()
  @IsOptional()
  isApproved?: boolean;
}
