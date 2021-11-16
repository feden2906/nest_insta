import { Controller, Get, Redirect, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response } from 'express';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { ExpressRequestInterface } from "@app/types/expressRequest.interface";

@Controller('auth/google')
export class GoogleOauthController {
  constructor(
    // private jwtAuthService: JwtAuthService
  ) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req) {
    console.log(1);
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: ExpressRequestInterface, @Res() res: Response) {
    // For now, we'll just show the user object
    // console.log(req);

    console.log(req.user);

    res.redirect('http://localhost:3000/api', 203)
  }
}
