import { Module } from '@nestjs/common';
import { UserMailerService } from './user-mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  providers: [UserMailerService],
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASWORD,
            accessToken: process.env.MAIL_ACCESS_TOKEN
          }
        }
      })
    })
  ],
  exports: [UserMailerService]
})
export class UserMailerModule {
}
