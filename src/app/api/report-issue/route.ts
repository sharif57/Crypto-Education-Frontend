import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const issue = formData.get("issue") as string;
    const email = formData.get("email") as string;
    const photo = formData.get("photo") as File | null;

    // Validation
    if (!issue?.trim() || !email?.trim()) {
      return NextResponse.json(
        { message: "Issue and email are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email address" },
        { status: 400 }
      );
    }

    // TODO: Implement your backend logic here
    // 1. Save to database
    // 2. Send email notification to admin
    // 3. Upload photo to storage service if provided

    // Example: Save to database
    // await db.reportedIssues.create({
    //   issue,
    //   email,
    //   photoUrl: photo ? uploadedPhotoUrl : null,
    //   createdAt: new Date(),
    // });

    // Example: Send email notification
    // await sendEmail({
    //   to: process.env.ADMIN_EMAIL,
    //   subject: "New Issue Report",
    //   body: `
    //     New issue report from ${email}:
    //     ${issue}
    //   `,
    // });

    console.log("Issue Report Received:", {
      email,
      issue,
      hasPhoto: !!photo,
      photoSize: photo?.size,
      photoType: photo?.type,
    });

    return NextResponse.json(
      {
        message: "Report submitted successfully",
        data: {
          email,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing report:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
