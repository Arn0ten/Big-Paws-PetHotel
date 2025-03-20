"use server";

import { Resend } from "resend";
import * as postmark from "postmark";
import formData from "form-data";
import Mailgun from "mailgun.js";

type EmailProvider = "resend" | "postmark" | "mailgun";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
  text?: string;
}

// Default configuration
const DEFAULT_FROM = "Big Paws Pet Hotel <notifications@bigpawspethotel.me>";
const DEFAULT_PROVIDER: EmailProvider = "resend";

/**
 * Send an email using the configured provider
 */
export async function sendEmail(options: EmailOptions) {
  const provider =
    (process.env.EMAIL_PROVIDER as EmailProvider) || DEFAULT_PROVIDER;
  const from = options.from || DEFAULT_FROM;

  try {
    switch (provider) {
      case "resend":
        return await sendWithResend({
          ...options,
          from,
        });
      case "postmark":
        return await sendWithPostmark({
          ...options,
          from,
        });
      case "mailgun":
        return await sendWithMailgun({
          ...options,
          from,
        });
      default:
        throw new Error(`Unsupported email provider: ${provider}`);
    }
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send email");
  }
}

/**
 * Send email using Resend
 */
async function sendWithResend(options: EmailOptions) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }

  return data;
}

/**
 * Send email using Postmark
 */
async function sendWithPostmark(options: EmailOptions) {
  const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY || "");

  const response = await client.sendEmail({
    From: options.from,
    To: options.to,
    Subject: options.subject,
    HtmlBody: options.html,
    TextBody: options.text,
    MessageStream: "outbound",
  });

  return response;
}

/**
 * Send email using Mailgun
 */
async function sendWithMailgun(options: EmailOptions) {
  const mailgun = new Mailgun(formData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "",
  });

  const response = await mg.messages.create(process.env.MAILGUN_DOMAIN || "", {
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });

  return response;
}
