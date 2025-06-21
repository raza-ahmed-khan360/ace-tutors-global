import { google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

interface EnrollmentData {
  forms: EnrollmentForm[];
}

// Helper function to format date as DD/MM/YYYY
function formatDateToDDMMYYYY(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is 0-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export async function POST(req: NextRequest) {
  try {
    const body: EnrollmentData = await req.json();
    const forms = body.forms;

    if (!forms || !Array.isArray(forms)) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    // console.log("=== STARTING ENROLLMENT PROCESS ===");
    // console.log("Processing", forms.length, "enrollment forms");
    // console.log("Form data received:", JSON.stringify(forms, null, 2));

    // Validate environment variables
    const requiredEnvVars = [
      "GOOGLE_CLIENT_EMAIL",
      "GOOGLE_PRIVATE_KEY",
      "GOOGLE_DRIVE_FILE_ID",
      "NO_REPLY_EMAIL",
      "NO_REPLY_EMAIL_PASS",
      "OWNER_EMAIL",
    ];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        throw new Error(`Missing required environment variable: ${envVar}`);
      }
    }

    // console.log("✓ Environment variables validated");
    // console.log("Service Account Email:", process.env.GOOGLE_CLIENT_EMAIL);
    // console.log("Target File ID:", process.env.GOOGLE_DRIVE_FILE_ID);

    // Google Sheets API setup
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_DRIVE_FILE_ID as string;

    // Check if the sheet exists and get metadata
    // console.log("\n=== CHECKING SPREADSHEET ACCESS ===");
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
    });
    // console.log("✓ Spreadsheet accessible");
    // console.log("Spreadsheet title:", spreadsheet.data.properties?.title);

    const sheetName = spreadsheet.data.sheets?.[0]?.properties?.title || "Sheet1";
    // console.log("Target sheet:", sheetName);

    // Get current data to check headers
    const range = `${sheetName}!A1:J1`;
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const headers = headerResponse.data.values?.[0];
    const expectedHeaders = [
      "Child Name",
      "Parent Name",
      "WhatsApp",
      "Email",
      "Class Level",
      "Appearing Year",
      "Appearing Session",
      "Board",
      "Subjects",
      "Timestamp",
    ];

    if (!headers || !headers.every((h, i) => h === expectedHeaders[i])) {
      console.log("Adding or updating headers to empty/inconsistent sheet");
      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        requestBody: {
          values: [expectedHeaders],
        },
      });
      // console.log("✓ Headers added/updated");
    } else {
      // console.log("✓ Headers already present and correct");
    }

    // Prepare data to append
    const values = forms.map((form) => [
      form.childName || "",
      form.parentName || "",
      form.whatsapp || "",
      form.email || "",
      form.classLevel || "",
      form.appearingYear || "",
      form.appearingSession || "",
      Array.isArray(form.board) ? form.board.join(", ") : form.board || "",
      Array.isArray(form.subjects) ? form.subjects.join(", ") : form.subjects || "",
      formatDateToDDMMYYYY(new Date()), // Format timestamp as DD/MM/YYYY
    ]);

    // console.log("\n=== APPENDING DATA ===");
    // console.log("Data to append:", JSON.stringify(values, null, 2));

    if (values.length === 0) {
      throw new Error("No data to append");
    }

    // Append data starting from row 2
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A2`, // Explicitly start from row 2
      valueInputOption: "RAW",
      requestBody: {
        values,
      },
    });

    // Send email notification
    console.log("\n=== SENDING EMAIL ===");
    let emailBody = `
      <div style="font-family: 'Poppins', sans-serif; background-color: #f9fafb; padding: 20px; border-radius: 10px; color: #1e1b4b; max-width: 600px; margin: auto;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://acetutorsglobal.com/assets/Logo-main.svg" alt="Logo" style="width: 120px; margin-bottom: 10px;">
          <h2 style="font-size: 24px; font-weight: bold; color: #1e1b4b;">New Enrollment Submission</h2>
          <p style="color: #6b7280; font-size: 14px;">A new enrollment form has been submitted and added to the spreadsheet.</p>
        </div>
    `;

    emailBody += forms
      .map(
        (form, index) => `
      <div style="background-color: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); margin-bottom: 15px;">
        <h3 style="font-size: 20px; font-weight: bold; color: #1e1b4b;">Enrollment #${
          index + 1
        }</h3>
        <p><strong style="color: #4f46e5;">Child's Name:</strong> ${form.childName || "N/A"}</p>
        <p><strong style="color: #4f46e5;">Parent Name:</strong> ${form.parentName || "N/A"}</p>
        <p><strong style="color: #4f46e5;">WhatsApp:</strong> ${form.whatsapp || "N/A"}</p>
        <p><strong style="color: #4f46e5;">Email:</strong> ${form.email || "N/A"}</p>
        <p><strong style="color: #4f46e5;">Class Level:</strong> ${form.classLevel || "N/A"}</p>
        <p><strong style="color: #4f46e5;">Appearing Year:</strong> ${form.appearingYear || "N/A"}</p>
        <p><strong style="color: #4f46e5;">Appearing Session:</strong> ${form.appearingSession || "N/A"}</p>
        <p><strong style="color: #4f46e5;">Board:</strong> ${
          Array.isArray(form.board) ? form.board.join(", ") : form.board || "N/A"
        }</p>
        <p><strong style="color: #4f46e5;">Subjects:</strong> ${
          Array.isArray(form.subjects) ? form.subjects.join(", ") : form.subjects || "N/A"
        }</p>
      </div>
    `
      )
      .join("");

    emailBody += `
      <div style="text-align: center; margin-top: 20px;">
        <p style="font-size: 14px; color: #6b7280;">
          View the updated spreadsheet: <a href="https://docs.google.com/spreadsheets/d/${spreadsheetId}" target="_blank">Open Spreadsheet</a>
        </p>
        <p style="font-size: 14px; color: #6b7280;">
          Your dedication to guiding students and providing top-quality education is truly commendable.  
          Your expertise and commitment continue to make a real impact. Keep up the great work!
        </p>
      </div>
    </div>
    `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NO_REPLY_EMAIL,
        pass: process.env.NO_REPLY_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.NO_REPLY_EMAIL,
      to: process.env.OWNER_EMAIL,
      subject: "New Enrollment Submission - Spreadsheet Updated",
      html: emailBody,
    });

    // console.log("✓ Email sent successfully");
    // console.log("=== ENROLLMENT PROCESS COMPLETED ===");

    return NextResponse.json({
      success: true,
      message: "Submission successful, spreadsheet updated, and email sent!",
    });

  } catch (error) {
    // console.error("\n=== ERROR OCCURRED ===");
    // console.error("Error:", error.message);
    // console.error("Stack:", error.stack);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to process enrollment.",
        error: process.env.NODE_ENV === "development" ? { message: (error as Error).message, stack: (error as Error).stack } : "Internal server error",
      },
      { status: 500 }
    );
  }
}