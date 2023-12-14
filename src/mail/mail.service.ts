import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Admin } from '../admin/model/admin.model';

@Injectable()
export class MailService {
  constructor(private mailerservice: MailerService) {}
  async sendAdminConfrmation(admin: Admin): Promise<void> {
    const url = `https://informationsbackend-production.up.railway.app/api/admin/activate/${admin.unique_id}`;
    await this.mailerservice.sendMail({
      to: admin.email,
      subject: '"Malumotlar" saytiga xush kelibsiz! Emailingizni tasdqilang!',
      template: './confirmation',
      context: {
        name: admin.first_name,
        url,
      },
    });
  }
}
