import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create email transporter (works with Ethereal in dev, Gmail in production)
const createTransport = async () => {
  // Development / testing: use Ethereal (temporary test SMTP)
  if (process.env.NODE_ENV !== "production") {
    const testAccount = await nodemailer.createTestAccount();

    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  // Production: Gmail using App Password (or replace with another SMTP provider)
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // e.g. yourgmail@gmail.com
      pass: process.env.EMAIL_PASS, // app password or SMTP password
    },
  });

  // If you prefer SendGrid/Mailgun/other SMTP, replace above with provider config:
  // return nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: parseInt(process.env.SMTP_PORT || '587', 10),
  //   secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASS
  //   }
  // });
};

// Send contact form email
export const sendContactEmail = async (contactData) => {
  try {
    // createTransport is async (because of createTestAccount in dev)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const {
      firstName,
      lastName,
      email,
      phone,
      message,
      projectType,
      submittedAt,
    } = contactData;

    // Business email (to you)
    const businessEmail = {
      from: process.env.EMAIL_FROM || "noreply@pinkertonconstruction.org",
      to: process.env.BUSINESS_EMAIL || "info@pinkertonconstruction.org",
      subject: `🏗️ New Contact Form Submission - ${projectType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">

            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #f59e0b;">
              <h1 style="color: #1e3a5f; margin: 0; font-size: 28px;">
                🏗️ Pinkerton Construction
              </h1>
              <h2 style="color: #6b7280; margin: 10px 0 0 0; font-size: 18px;">
                New Contact Form Submission
              </h2>
            </div>

            <!-- Customer Info -->
            <div style="margin-bottom: 25px;">
              <h3 style="color: #1e3a5f; margin-bottom: 15px; font-size: 20px;">
                Customer Information
              </h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 120px;">
                    Name:
                  </td>
                  <td style="padding: 8px 0; color: #6b7280;">
                    ${firstName} ${lastName}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">
                    Email:
                  </td>
                  <td style="padding: 8px 0; color: #6b7280;">
                    <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">
                      ${email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">
                    Phone:
                  </td>
                  <td style="padding: 8px 0; color: #6b7280;">
                    <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none;">
                      ${phone}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">
                    Project Type:
                  </td>
                  <td style="padding: 8px 0; color: #6b7280;">
                    ${projectType}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #374151;">
                    Submitted:
                  </td>
                  <td style="padding: 8px 0; color: #6b7280;">
                    ${new Date(submittedAt).toLocaleString()}
                  </td>
                </tr>
              </table>
            </div>

            <!-- Message -->
            <div style="margin-bottom: 25px;">
              <h3 style="color: #1e3a5f; margin-bottom: 15px; font-size: 20px;">
                Project Details
              </h3>
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; line-height: 1.6; color: #374151; font-size: 16px;">
                  ${message ? message.replace(/\n/g, "<br>") : "No message provided."}
                </p>
              </div>
            </div>

            <!-- Call to Action -->
            <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #eff6ff; border-radius: 8px;">
              <p style="margin: 0 0 15px 0; color: #1e40af; font-weight: bold; font-size: 16px;">
                ⏰ Follow up within 24 hours for best results!
              </p>
              <div style="margin-top: 15px;">
                <a href="mailto:${email}" style="display: inline-block; background-color: #f59e0b; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px;">
                  Reply via Email
                </a>
                <a href="tel:${phone}" style="display: inline-block; background-color: #1e3a5f; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 0 10px;">
                  Call Customer
                </a>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                This email was sent because a contact form was submitted on your site.
                Pinkerton Construction LLC | Your City, State | (555) 123-4567
              </p>
            </div>

          </div>
        </div>
      `,
    };

    // Auto-reply email to customer (full expanded HTML)
    const customerEmail = {
      from: process.env.EMAIL_FROM || "info@pinkertonconstruction.org",
      to: email,
      subject: "🏗️ Thank you for contacting Pinkerton Construction!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">

            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #1e3a5f; margin: 0; font-size: 32px;">
                🏗️ Pinkerton Construction
              </h1>
              <p style="color: #f59e0b; margin: 5px 0 0 0; font-size: 16px; font-weight: bold;">
                A Construction Company You Can Trust
              </p>
            </div>

            <!-- Thank You Message -->
            <div style="margin-bottom: 25px; text-align: center;">
              <h2 style="color: #1e3a5f; margin-bottom: 15px;">
                Thank You for Your Interest!
              </h2>
              <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">
                Hi ${firstName},<br><br>
                We received your inquiry about
                <strong>${projectType}</strong>
                and we're excited to help bring your vision to life!
              </p>
            </div>

            <!-- What's Next -->
            <div style="background-color: #eff6ff; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
              <h3 style="color: #1e40af; margin-top: 0; margin-bottom: 15px;">
                What happens next?
              </h3>
              <ul style="color: #374151; line-height: 1.8; margin: 0; padding-left: 20px;">
                <li>We'll review your project details carefully</li>
                <li>A team member will contact you within <strong>24 hours</strong></li>
                <li>We'll schedule a free consultation at your convenience</li>
                <li>You'll receive a detailed, transparent quote</li>
              </ul>
            </div>

            <!-- Submission Summary -->
            <div style="margin-bottom: 25px;">
              <h3 style="color: #1e3a5f; margin-bottom: 15px;">
                Your Submission Summary:
              </h3>
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #374151;">
                  <strong>Project Type:</strong> ${projectType}
                </p>
                <p style="margin: 10px 0 0 0; color: #374151;">
                  <strong>Your Message:</strong>
                </p>
                <p style="margin: 5px 0 0 0; color: #6b7280; font-style: italic;">
                  "${message ? message : "No message provided."}"
                </p>
              </div>
            </div>

            <!-- Contact Info -->
            <div style="text-align: center; background-color: #1e3a5f; color: white; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
              <h3 style="margin-top: 0; margin-bottom: 15px; color: #f59e0b;">
                Need to reach us immediately?
              </h3>
              <p style="margin: 0; font-size: 18px;">
                <strong>📞 (555) 123-4567</strong>
              </p>
              <p style="margin: 5px 0 0 0; font-size: 14px;">
                Available Mon-Fri 7AM-6PM, Sat 8AM-4PM
              </p>
              <p style="margin: 15px 0 0 0; font-size: 14px;">
                ✉️ info@pinkertonconstruction.org
              </p>
            </div>

            <!-- Why Choose Us -->
            <div style="text-align: center;">
              <h3 style="color: #1e3a5f; margin-bottom: 15px;">
                Why Choose Pinkerton Construction?
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-top: 20px;">
                <div style="text-align: center;">
                  <div style="font-size: 24px; margin-bottom: 8px;">
                    🏆
                  </div>
                  <p style="margin: 0; font-size: 14px; color: #6b7280; font-weight: bold;">
                    25+ Years Experience
                  </p>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: 24px; margin-bottom: 8px;">
                    🛡️
                  </div>
                  <p style="margin: 0; font-size: 14px; color: #6b7280; font-weight: bold;">
                    Licensed & Insured
                  </p>
                </div>
                <div style="text-align: center;">
                  <div style="font-size: 24px; margin-bottom: 8px;">
                    ⭐
                  </div>
                  <p style="margin: 0; font-size: 14px; color: #6b7280; font-weight: bold;">
                    5-Star Reviews
                  </p>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                This email was sent because you submitted a contact form on our website.<br>
                Pinkerton Construction LLC | Your City, State | (555) 123-4567
              </p>
            </div>

          </div>
        </div>
      `,
    };

    // Send both emails and capture info objects
    const infoBusiness = await transporter.sendMail(businessEmail);
    const infoCustomer = await transporter.sendMail(customerEmail);

    // If in development, log Ethereal preview URLs
    if (process.env.NODE_ENV !== "production") {
      const previewBusiness = nodemailer.getTestMessageUrl(infoBusiness);
      const previewCustomer = nodemailer.getTestMessageUrl(infoCustomer);

      console.log("Ethereal preview URL (business):", previewBusiness);
      console.log("Ethereal preview URL (customer):", previewCustomer);
    }

    console.log(
      `📧 Contact form emails sent successfully for ${firstName} ${lastName}`
    );

    return {
      success: true,
      message: "Emails sent successfully",
    };
  } catch (error) {
    console.error("Email service error:", error);

    return {
      success: false,
      error: error.message,
    };
  }
};
