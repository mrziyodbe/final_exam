import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/common/roles';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create-admin')
  @UseGuards(RoleGuard)
  @Roles(Role.SUPER_ADMIN)
  createAdmin(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createAdmin(createUserDto);
  }

  @Post('/create-seller')
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  createSeller(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createSeller(createUserDto);
  }

  @Patch('/approve-seller/:id')
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN)
  approveSeller(@Param('id') id: number) {
    return this.usersService.approveSeller(id);
  }

  @Patch('/approve-admin/:id')
  @UseGuards(RoleGuard)
  @Roles(Role.SUPER_ADMIN)
  approveAdmin(@Param('id') id: number) {
    return this.usersService.approveAdmin(id);
  }

  @Get()
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(RoleGuard)
  @Roles(Role.USER, Role.ADMIN, Role.SUPER_ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
