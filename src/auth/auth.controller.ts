import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('validate-token')
  async validateToken(@Req() req: any) {
    return this.authService.validateToken(req.user);
  }

  @Put('reset-password/:id')
  async resetPassword(@Param('id') id: number, @Body() password: string) {
    console.log('Malhas');
    return this.authService.resetPassword(id, password);
  }
}
