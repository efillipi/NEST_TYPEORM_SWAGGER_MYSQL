import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/guards/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/role.guard';
import { NotFoundSwagger } from 'src/shared/helpers/swagger/not-found.swagger';
import User from '../../entities/User';
import { FindUserByidService } from '../../services/find-user-byid/find-user-byid.service';

@Controller('users')
@ApiTags('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class FindUserByIdController {
  constructor(private readonly service: FindUserByidService) {}

  @Get(':id')
  @Roles('ADM', 'USER')
  @ApiOperation({ summary: 'Find user by id' })
  @ApiResponse({
    status: 200,
    description: 'Find user success',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: NotFoundSwagger,
  })
  async show(@Param('id', new ParseIntPipe()) id: number) {
    return await this.service.execute(id);
  }
}
