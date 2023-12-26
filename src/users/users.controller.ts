import { Controller, Get, Query, Delete, Param, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAllPaginated(
    @Query('page') page: number = 1, 
    @Query('pageSize') pageSize: number = 10
  ) {
    if(page < 1 || pageSize < 1) {
      throw new HttpException('Invalid pagination parameters', HttpStatus.BAD_REQUEST);
    }
    return this.usersService.findAllPaginated(page, pageSize);
  }

  @Get('/all')
  async findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Delete(':telegramId')
  async deleteUser(@Param('telegramId') telegramId: number) {
    const deletedUser = await this.usersService.deleteUser(telegramId);
    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return deletedUser;
  }

  @Patch(':telegramId/block')
  async blockUser(@Param('telegramId') telegramId: number) {
    const updatedUser = await this.usersService.blockUser(telegramId);
    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return updatedUser;
  }
}
