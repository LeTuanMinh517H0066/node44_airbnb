import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  async register(body: RegisterDto): Promise<object> {
    try {
      const { email, name, pass_word, phone, birth_day, role, gender } = body;
      const checkUser = await this.prisma.users.findFirst({
        where: { email },
      });
      if (checkUser) {
        throw new BadRequestException('Email already exists');
      }

      const user = await this.prisma.users.create({
        data: {
          email: email,
          pass_word: bcrypt.hashSync(pass_word, 10),
          phone: phone,
          birth_day: birth_day,
          role: role,
          gender: gender,
          name: name,
        },
      });

      let emailTo = email;
      let subject = 'Thông báo đăng ký tài khoản';
      let text = 'Chúc mừng bạn đã đăng ký tài khoản thành công';

      // let emailForm = "ltuanminh049@gmail.com";
      this.emailService.sendMail(emailTo, subject, text);

      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(body: LoginDto): Promise<string> {
    try {
      const { email, pass_word } = body;
      const checkUser = await this.prisma.users.findFirst({
        where: { email },
      });
      if (!checkUser) {
        throw new BadRequestException('Email is wrong');
      }
      let checkPass = bcrypt.compareSync(pass_word, checkUser.pass_word);
      if (!checkPass) {
        throw new BadRequestException('pass is wrong');
      }
      const token = this.jwtService.sign(
        { data: { userId: checkUser.id } },
        {
          expiresIn: '30m',
          secret: this.configService.get('SECRET_KEY'),
        },
      );
      return token;
      
    } catch (error) {
      throw new Error(error);
    }
  }
}
