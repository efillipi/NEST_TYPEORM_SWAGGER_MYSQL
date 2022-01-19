import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { RoleRepositoryService } from './repositories/RoleRepository';
import { CreateRoleService } from './services/create-role/create-role.service';
import { UpdateRoleService } from './services/update-role/update-role.service';
import { DeleteRoleService } from './services/delete-role/delete-role.service';
import { ListRolesService } from './services/list-roles/list-roles.service';
import { FindRoleByIdService } from './services/find-role-by-id/find-role-by-id.service';
import { CreateRoleController } from './controllers/create-role/create-role.controller';
import { UpdateRoleController } from './controllers/update-role/update-role.controller';
import { ListRolesController } from './controllers/list-roles/list-roles.controller';
import { DeleteRoleController } from './controllers/delete-role/delete-role.controller';
import { FindRoleByIdController } from './controllers/find-role-by-id/find-role-by-id.controller';
import Role from './entities/Role';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), UserModule],
  providers: [
    RoleRepositoryService,
    CreateRoleService,
    UpdateRoleService,
    DeleteRoleService,
    ListRolesService,
    FindRoleByIdService,
  ],
  exports: [
    RoleRepositoryService,
    CreateRoleService,
    UpdateRoleService,
    DeleteRoleService,
    ListRolesService,
  ],
  controllers: [CreateRoleController, UpdateRoleController, ListRolesController, DeleteRoleController, FindRoleByIdController],
})
export class RolesModule {}
