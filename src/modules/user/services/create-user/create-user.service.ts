import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { RoleRepositoryService } from 'src/modules/roles/repositories/RoleRepository';
import { HashProviderService } from 'src/shared/providers/hash-provider/hash-provider.service';
import User from '../../entities/User';
import { UserRepositoryService } from '../../repositories/UserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  roles: string[];
}

@Injectable()
export class CreateUserService {
  private user: User;
  constructor(
    private readonly userRepository: UserRepositoryService,
    private readonly roleRepository: RoleRepositoryService,

    private hashProviderService: HashProviderService,
  ) {}
  async execute(data: IRequest): Promise<User> {
    const userExsists = await this.userRepository.findSomething({
      email: data.email,
    });

    if (userExsists) {
      throw new ConflictException('Email is already being used');
    }

    const rolesExists = await this.roleRepository.findByNames(data.roles);

    if (rolesExists.length !== data.roles.length) {
      throw new NotFoundException('Role or Roles not found');
    }

    const hash = await this.hashProviderService.generateHash(data.password);

    this.user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hash,
      roles: rolesExists,
    });

    return this.user;
  }
}
