import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/shared/helpers/swagger/bad-request.swagger';
import ICreateRoleDTO from '../../dtos/ICreateRoleDTO';
import Role from '../../entities/Role';
import { CreateRoleService } from '../../services/create-role/create-role.service';

@Controller('roles')
@ApiTags('roles')
@UseGuards(AuthGuard('jwt'))
export class CreateRoleController {
  constructor(private readonly service: CreateRoleService) {}
  @Post()
  @ApiOperation({ summary: 'Create new role' })
  @ApiResponse({
    status: 201,
    description: 'Create new role success',
    type: Role,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 409,
    description: 'Role already registered',
    type: BadRequestSwagger,
  })
  async create(@Body() body: ICreateRoleDTO) {
    return await this.service.execute(body);
  }
}