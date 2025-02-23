import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from 'src/common/roles';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Ism bosh bolmasligi kerak' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Email toldirilishi kerak' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Parol bosh bolmasligi kerak' })
  @MinLength(8, { message: 'Parol kamida 8 ta belgi bolishi kerak' })
  password: string;

  @IsEnum(Role)
  role: Role;
}
