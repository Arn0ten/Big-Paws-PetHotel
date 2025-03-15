// import formData from "form-data";
// import Mailgun from "mailgun.js";

// const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN!;
// const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY!;

// const mailgun = new Mailgun(formData);
// const client = mailgun.client({ username: "api", key: MAILGUN_API_KEY });

// export async function sendEmail(
//   to: string,
//   subject: string,
//   htmlContent: string,
// ) {
//   return client.messages.create(MAILGUN_DOMAIN, {
//     from: `Big Paws Pet Hotel <noreply@${MAILGUN_DOMAIN}>`,
//     to: [to],
//     subject: subject,
//     html: htmlContent,
//   });
// }

//Pag mag postmark ra ni gamiton
// import formData from "form-data";
// import { ServerClient } from "postmark";

// const POSTMARK_API_KEY = process.env.POSTMARK_API_KEY!;

// const postmark = new ServerClient(POSTMARK_API_KEY);
// const client = postmark;

// export async function sendEmail(
//   to: string,
//   subject: string,
//   htmlContent: string,
// ) {
//   return client.sendEmail({
//     //ilisdan ra nig from if verified na akong post mark AHHAHAHA
//     From: "a.bautista.129340.tc@umindanao.edu.ph",
//     To: to,
//     Subject: subject,
//     HtmlBody: htmlContent,
//   });
// }
import { Resend } from "resend"

const RESEND_API_KEY = process.env.RESEND_API_KEY!

if (!RESEND_API_KEY) {
  console.error("RESEND_API_KEY is not set")
  throw new Error("RESEND_API_KEY is not set")
}

const resend = new Resend(RESEND_API_KEY)

export async function sendEmail(to: string, subject: string, htmlContent: string) {
  try {
    console.log("Sending email to:", to)
    console.log("Subject:", subject)

    const response = await resend.emails.send({
      from: "Big Paws Pet Hotel <noreply@big-paws-petsupplies.tech>",
      to: to,
      subject: subject,
      html: htmlContent,
    })

    console.log("Email sent successfully:", response)
    return response
  } catch (error) {
    console.error("Failed to send email:", error)
    throw error
  }
}

