import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json(); // Parse JSON from frontend

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Set in .env file
        pass: process.env.EMAIL_PASS, // Set in .env file
      },
    });

    // Format email content
    const emailBody = `
      <h2>New Enrollment Submission</h2>
      <p><strong>Child’s Name:</strong> ${formData.childName}</p>
      <p><strong>Parent Name:</strong> ${formData.parentName}</p>
      <p><strong>WhatsApp:</strong> ${formData.whatsapp}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Class Level:</strong> ${formData.classLevel}</p>
      <p><strong>Year:</strong> ${formData.year}</p>
      <p><strong>Session:</strong> ${formData.session}</p>
      <p><strong>Board:</strong> ${formData.board.join(", ")}</p>
      <p><strong>Subjects:</strong> ${formData.subjects.join(", ")}</p>
    `;

    // Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "hafizrazaahmed42@gmail.com", // Replace with your recipient email
      subject: "New Enrollment Submission",
      html: emailBody,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ success: false, message: "Failed to send email." }, { status: 500 });
  }
}
