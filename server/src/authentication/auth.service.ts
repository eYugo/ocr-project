import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { RegisterUsersDto } from './dto/register-user.dto';
import { Users } from '../users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  // Login
  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    // find user by email
    const users = await this.prismaService.users.findUnique({
      where: { email },
    });

    if (!users) {
      throw new NotFoundException('user not found');
    }

    // compare password
    const validatePassword = await bcrypt.compare(password, users.password);

    if (!validatePassword) {
      throw new NotFoundException('Invalid password');
    }

    return {
      token: this.jwtService.sign({ email }),
    };
  }

  // Register
  async register(createDto: RegisterUsersDto): Promise<any> {
    const createUser = new Users();
    createUser.name = createDto.name;
    createUser.email = createDto.email;
    createUser.password = await bcrypt.hash(createDto.password, 10);

    // create user
    const user = await this.usersService.createUser(createUser);

    return {
      token: this.jwtService.sign({ email: user.email }),
    };
  }
}
