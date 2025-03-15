import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"
import { getEmailTemplate } from "@/lib/emailTemplates"

export async function POST(request: Request) {
  const { to, subject, formData, formType } = await request.json()

  try {
    const htmlContent = getEmailTemplate(formType, formData)
    await sendEmail(to, subject, htmlContent)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 })
  }
}

