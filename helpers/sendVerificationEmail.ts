import resend from "../lib/resend";
import VerificationEmail from "../emails/VerificationEmail";
import { ApiResponse } from "../types/ApiResponse";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const response = await resend.emails.send({
      from: "Verify <verify@resend.dev>",
      to: email,
      subject: "Verify your email",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to send verification email",
      error: error,
    };
  }
}
