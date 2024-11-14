import env from "@src/config/config";
import {
  INodemailerProvider,
  ReceiverEmailOptions,
} from "../INodemailerProvider";
import nodemailer from "nodemailer";
import {
  ForgotPasswordBody,
  ReminderBody,
} from "@src/utils/htmls/forgotPasswordBody";

export class NodemailerProvider implements INodemailerProvider {
  async sendEmail(receiver: ReceiverEmailOptions, hash: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: env.USER_EMAIL_PROVIDER,
        pass: env.USER_EMAIL_PASSWORD,
      },
    });

    const html = await ForgotPasswordBody(
      `${env.API_FORGOT_PASSWORD_URL}/${hash}`
    );

    // send mail with defined transport object
    const mailOptions = {
      from: env.USER_EMAIL_PROVIDER, // sender address
      to: receiver.email, // list of receivers
      subject: "Recuperação de senha", // Subject line
      text: "Recuperação de senha!", // plain text body
      html, // html body
    };
    console.log({ mailOptions });
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
    });
  }

  async onlySendEmail(props: {
    cli_name: string;
    prod_name: string;
    email: string;
  }): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: env.USER_EMAIL_PROVIDER,
        pass: env.USER_EMAIL_PASSWORD,
      },
    });

    const html = await ReminderBody(props.cli_name, props.prod_name);

    // send mail with defined transport object
    const mailOptions = {
      from: env.USER_EMAIL_PROVIDER, // sender address
      to: props.email, // list of receivers
      subject: "Lembrete de manutenção", // Subject line
      text: "Lembrete de manutenção!", // plain text body
      html, // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
    });
  }
}
