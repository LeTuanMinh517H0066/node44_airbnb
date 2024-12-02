import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { RegisterDto } from './dto/register.dto';

@ApiTags("Auth")

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async Register(
    @Body() body: RegisterDto,
    @Res() res: Response
  ): Promise<any>  {
    try {
      const result = await this.authService.register(body);
      
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message:"server error"});
    }
  }

  @Post('Login')
  async Login(
    @Body() body: LoginDto,
    @Res() res: Response
  ): Promise<Response<string>> {
    try {
      const result = await this.authService.login(body);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({message: "server error"})
    }
  }
}
