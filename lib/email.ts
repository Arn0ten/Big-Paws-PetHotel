import { Resend } from "resend"
import formData from "form-data"
import Mailgun from "mailgun.js"
import { Client } from "postmark"

// Email configuration based on provider
const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || "resend"
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY || ""
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || ""
const POSTMARK_API_KEY = process.env.POSTMARK_API_KEY || ""
const RESEND_API_KEY = process.env.RESEND_API_KEY || ""

// Initialize email clients
const resend = new Resend(RESEND_API_KEY)
const mailgun = new Mailgun(formData).client({ username: "api", key: MAILGUN_API_KEY })
const postmark = new Client(POSTMARK_API_KEY)

type EmailTemplate = "request-processed" | "boarding-extended" | "grooming-scheduled" | "media-ready"

interface EmailOptions {
  to: string
  subject: string
  html: string
  from: string
  petName?: string
  ownerName?: string
  requestType?: string
  completionDetails?: string
  mediaUrl?: string
  extensionDays?: number
  groomingDate?: string
}

export const getEmailTemplate = (template: EmailTemplate, options: EmailOptions): string => {
  switch (template) {
    case "request-processed":
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Request Processed</h2>
          <p>Hello ${options.ownerName},</p>
          <p>We're happy to inform you that your ${options.requestType} request for ${options.petName} has been processed.</p>
          <p><strong>Details:</strong> ${options.completionDetails}</p>
          ${options.mediaUrl ? `<p><a href="${options.mediaUrl}" style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 10px;">View Media</a></p>` : ""}
          <p style="margin-top: 20px; font-size: 14px; color: #777;">Thank you for choosing our pet boarding services.</p>
          <div style="background-color: #f8f8f8; padding: 10px; border-radius: 4px; margin-top: 20px;">
            <p style="margin: 0; font-size: 12px;">This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      `
    case "boarding-extended":
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Boarding Stay Extended</h2>
          <p>Hello ${options.ownerName},</p>
          <p>We've confirmed the extension of ${options.petName}'s boarding stay by ${options.extensionDays} days as requested.</p>
          <p><strong>Details:</strong> ${options.completionDetails}</p>
          <p style="margin-top: 20px; font-size: 14px; color: #777;">Thank you for choosing our pet boarding services.</p>
          <div style="background-color: #f8f8f8; padding: 10px; border-radius: 4px; margin-top: 20px;">
            <p style="margin: 0; font-size: 12px;">This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      `
    case "grooming-scheduled":
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Grooming Scheduled</h2>
          <p>Hello ${options.ownerName},</p>
          <p>We've scheduled a grooming session for ${options.petName} on ${options.groomingDate}.</p>
          <p><strong>Details:</strong> ${options.completionDetails}</p>
          <p style="margin-top: 20px; font-size: 14px; color: #777;">Thank you for choosing our pet boarding services.</p>
          <div style="background-color: #f8f8f8; padding: 10px; border-radius: 4px; margin-top: 20px;">
            <p style="margin: 0; font-size: 12px;">This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      `
    case "media-ready":
      return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;">Pet Media Ready</h2>
          <p>Hello ${options.ownerName},</p>
          <p>Good news! The ${options.requestType} for ${options.petName} is now ready for you to view.</p>
          <p><a href="${options.mediaUrl}" style="background-color: #4CAF50; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block; margin-top: 10px;">View Media</a></p>
          <p style="margin-top: 20px; font-size: 14px; color: #777;">Thank you for choosing our pet boarding services.</p>
          <div style="background-color: #f8f8f8; padding: 10px; border-radius: 4px; margin-top: 20px;">
            <p style="margin: 0; font-size: 12px;">This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      `
    default:
      return ""
  }
}

export const sendEmail = async (options: EmailOptions): Promise<{ success: boolean; message: string }> => {
  try {
    const { to, subject, html, from } = options

    switch (EMAIL_PROVIDER) {
      case "resend":
        const resendResponse = await resend.emails.send({
          from,
          to,
          subject,
          html,
        })
        return { success: true, message: `Email sent via Resend: ${resendResponse.id}` }

      case "mailgun":
        const mailgunResponse = await mailgun.messages.create(MAILGUN_DOMAIN, {
          from,
          to,
          subject,
          html,
        })
        return { success: true, message: `Email sent via Mailgun: ${mailgunResponse.id}` }

      case "postmark":
        const postmarkResponse = await postmark.sendEmail({
          From: from,
          To: to,
          Subject: subject,
          HtmlBody: html,
        })
        return { success: true, message: `Email sent via Postmark: ${postmarkResponse.MessageID}` }

      default:
        return { success: false, message: "Invalid email provider specified" }
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
