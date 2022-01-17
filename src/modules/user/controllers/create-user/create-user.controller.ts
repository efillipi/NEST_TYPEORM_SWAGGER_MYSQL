import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from '../../services/create-user/create-user.service';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import { CreateUserSwagger } from '../../swagger/CreateUser.swagger';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';

@Controller('users')
@ApiTags('users')
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}
  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 201,
    description: 'Create new user success',
    type: CreateUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  async create(@Body() body: ICreateUserDTO) {
    return await this.service.create(body);
  }
}
