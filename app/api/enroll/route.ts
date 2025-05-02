import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface EnrollmentData {
  name: string;
  email: string;
  phone: string;
  message: string;
  forms: EnrollmentForm[];
  childName?: string;
  parentName?: string;
  whatsapp?: string;
  classLevel?: string;
  appearingYear?: string;
  appearingSession?: string;
  board?: string[];
  subjects?: string[];
}

interface EnrollmentForm {
  childName?: string;
  parentName?: string;
  whatsapp?: string;
  email?: string;
  classLevel?: string;
  appearingYear?: string;
  appearingSession?: string;
  board?: string[];
  subjects?: string[];
}

export async function POST(req: NextRequest) {
  try {
    const body: EnrollmentData = await req.json();

    // Determine if multiple forms exist or a single form object
    let emailBody = `
      <div style="font-family: 'Poppins', sans-serif; background-color: #f9fafb; padding: 20px; border-radius: 10px; color: #1e1b4b; max-width: 600px; margin: auto;">
        <!-- Logo Section -->
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://ace-tutors-global.vercel.app/assets/Logo-main.svg" alt="Logo" style="width: 120px; margin-bottom: 10px;">
          <h2 style="font-size: 24px; font-weight: bold; color: #1e1b4b; margin-bottom: 5px;">New Enrollment Submission</h2>
          <p style="color: #6b7280; font-size: 14px;">A new enrollment form has been submitted.</p>
        </div>
    `;

    if (Array.isArray(body.forms)) {
      emailBody += body.forms
        .map(
          (form: EnrollmentForm, index: number) => `
        <div style="background-color: white; padding: 15px; border-radius: 8px; box-shadow: 0px 2px 10px rgba(0,0,0,0.05); margin-bottom: 15px;">
          <h3 style="font-size: 20px; font-weight: bold; color: #1e1b4b; border-bottom: 2px solid #4f46e5; padding-bottom: 5px; margin-bottom: 10px;">Enrollment #${index + 1}</h3>
          <p><strong style="color: #4f46e5;">Child’s Name:</strong> ${form.childName || "N/A"}</p>
          <p><strong style="color: #4f46e5;">Parent Name:</strong> ${form.parentName || "N/A"}</p>
          <p><strong style="color: #4f46e5;">WhatsApp:</strong> ${form.whatsapp || "N/A"}</p>
          <p><strong style="color: #4f46e5;">Email:</strong> ${form.email || "N/A"}</p>
          <p><strong style="color: #4f46e5;">Class Level:</strong> ${form.classLevel || "N/A"}</p>
          <p><strong style="color: #4f46e5;">Appearing Year:</strong> ${form.appearingYear || "N/A"}</p>
          <p><strong style="color: #4f46e5;">Appearing Session:</strong> ${form.appearingSession || "N/A"}</p>
          <p><strong style="color: #4f46e5;">Board:</strong> ${(form.board || []).join(", ") || "N/A"}</p>
          <p><strong style="color: #4f46e5;">Subjects:</strong> ${(form.subjects || []).join(", ") || "N/A"}</p>
        </div>
      `
        )
        .join("");
    } else {
      emailBody += `
        <div style="background-color: white; padding: 15px; border-radius: 8px; box-shadow: 0px 2px 10px rgba(0,0,0,0.05);">
          <h3 style="font-size: 20px; font-weight: bold; color: #1e1b4b; border-bottom: 2px solid #4f46e5; padding-bottom: 5px; margin-bottom: 10px;">Enrollment Details</h3>
          <p><strong style="color: #4f46e5;">Child’s Name:</strong> ${body.childName || "N/A"}</p>
          <p><strong style="color: #4f46e5;">Parent Name:</strong> ${body.parentName || "N/A"}</p>
          <p><strong style="color: #4f46e5;">WhatsApp:</strong> ${body.whatsapp || "N/A"}</p>
          <p><strong style="color: #4f46e5;">Email:</strong> ${body.email || "N/A"}</p>
          <p><strong style="color: #4f46e5;">Class Level:</strong> ${body.classLevel || "N/A"}</p>
          <p><strong style="color: #4f46e5;">Appearing Year:</strong> ${body.appearingYear || "N/A"}</p>
          <p><strong style="color: #4f46e5;">Appearing Session:</strong> ${body.appearingSession || "N/A"}</p>
          <p><strong style="color: #4f46e5;">Board:</strong> ${(body.board || []).join(", ") || "N/A"}</p>
          <p><strong style="color: #4f46e5;">Subjects:</strong> ${(body.subjects || []).join(", ") || "N/A"}</p>
        </div>
      `;
    }

    emailBody += `
      <div style="text-align: center; margin-top: 20px;">
        <p style="font-size: 14px; color: #6b7280;">
          Your dedication to guiding students and providing top-quality education is truly commendable.  
          Your expertise and commitment continue to make a real impact. Keep up the great work!
        </p>
      </div>
    </div>
    `;

    // Setup Nodemailer with Gmail SMTP and App Password
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.NO_REPLY_EMAIL,
      to: process.env.OWNER_EMAIL, // Use OWNER_EMAIL from .env
      subject: "New Enrollment Submission",
      html: emailBody,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: "Failed to send email." }, { status: 500 });
  }
}
