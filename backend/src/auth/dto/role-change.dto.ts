import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/roles';

export class RoleChangeDto {
  @IsNotEmpty({ message: 'Rol tanlanishi kerak' })
  @IsEnum(Role, { message: "Noto'g'ri rol qiymati" })
  requestedRole: Role;
}
