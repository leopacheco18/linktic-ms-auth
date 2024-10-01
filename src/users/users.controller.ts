import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @ApiOperation({ summary: 'Validar el token JWT ADMIN' })
  @ApiBearerAuth()
  @Post('validate-token-admin')
  @UseGuards(JwtAuthGuard)
  async validateTokenAdmin(@Request() req) {
    const user = req.user;
    if (user.role === 'admin') return user;
    throw new UnauthorizedException('No tienes permiso de administrador');
  }

  @ApiOperation({ summary: 'Validar el token JWT' })
  @ApiBearerAuth()
  @Post('validate-token')
  @UseGuards(JwtAuthGuard)
  async validateToken(@Request() req) {
    return req.user;
  }
}
