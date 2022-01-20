import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotFoundSwagger } from 'src/shared/helpers/swagger/not-found.swagger';
import Role from '../../entities/Role';
import { FindRoleByIdService } from '../../services/find-role-by-id/find-role-by-id.service';

@Controller('roles')
@ApiTags('roles')
@UseGuards(AuthGuard('jwt'))
export class FindRoleByIdController {
  constructor(private readonly service: FindRoleByIdService) {}
  @Get(':id')
  @ApiOperation({ summary: 'Find role by id' })
  @ApiResponse({
    status: 200,
    description: 'Find role success',
    type: Role,
  })
  @ApiResponse({
    status: 404,
    description: 'Role not found',
    type: NotFoundSwagger,
  })
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return await this.service.execute(id);
  }
}