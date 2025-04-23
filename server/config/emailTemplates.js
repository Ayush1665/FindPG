// config/emailTemplates.js

export const welcomeEmailTemplate = (name = "User") => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      @media only screen and (max-width: 600px) {
        .container {
          width: 100% !important;
          border-radius: 0 !important;
          box-shadow: none !important;
        }
        .header {
          padding: 20px !important;
        }
        .logo {
          width: 80px !important;
          margin-bottom: 10px !important;
        }
        h1 {
          font-size: 24px !important;
        }
        .content {
          padding: 20px !important;
        }
        .cta-button {
          padding: 10px 20px !important;
          font-size: 14px !important;
        }
        .social-icon {
          width: 20px !important;
          height: 20px !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f8f9fa; line-height: 1.6;">
    <div style="padding: 20px 0;">
      <div class="container" style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        <!-- Header -->
        <div class="header" style="background: linear-gradient(135deg, #2196F3 0%, #21CBF3 100%); padding: 30px; text-align: center;">
          <img src="https://res.cloudinary.com/dlnbsgyfz/image/upload/v1744229551/pg-owners/id-proofs/kal8opi1dry2cu78u4xl.png" alt="Find MyPG Logo" class="logo" style="width: 100px; height: auto; margin-bottom: 15px;" />
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">Welcome to Find MyPG!</h1>
        </div>
        
        <!-- Content -->
        <div class="content" style="padding: 30px;">
          <p style="font-size: 16px; color: #555; margin-bottom: 20px;">Hi <strong style="color: #2196F3;">${name}</strong>,</p>
          
          <p style="font-size: 16px; color: #555; margin-bottom: 20px;">
            Thank you for joining Find MyPG! We're thrilled to have you as part of our community.
          </p>
          
          <p style="font-size: 16px; color: #555; margin-bottom: 25px;">
            Your account has been successfully created and you're now ready to explore the best PG accommodations tailored just for you.
          </p>
        
          <div style="text-align: center; margin: 30px 0;">
            <a href="#" class="cta-button" style="display: inline-block; background: #2196F3; color: white; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: bold; font-size: 16px;">
              Explore PGs Now
            </a>
          </div>
          
          <p style="font-size: 16px; color: #555; margin-bottom: 0;">
            If you have any questions, feel free to reach out to our support team at <a href="mailto:support@findmypg.com" style="color: #2196F3;">support@findmypg.com</a>.
          </p>
        </div>
        
        <!-- Footer -->
        <div style="background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #e0e0e0;">
          <p style="margin: 0 0 10px 0;">This is an automated message. Please do not reply.</p>
          <p style="margin: 0;">Copyright © ${new Date().getFullYear()} Find MyPG. All rights reserved.</p>
          
          <!-- Social links -->
          <div style="margin-top: 15px;">
            <a href="#" style="margin: 0 8px; display: inline-block;"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" class="social-icon" style="width: 24px; height: 24px;"></a>
            <a href="#" style="margin: 0 8px; display: inline-block;"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" class="social-icon" style="width: 24px; height: 24px;"></a>
            <a href="#" style="margin: 0 8px; display: inline-block;"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" class="social-icon" style="width: 24px; height: 24px;"></a>
          </div>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
};

export const resetPasswordTemplate = (otp, name = "User") => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #f8fafc;
        color: #334155;
        line-height: 1.6;
      }
      .container {
        max-width: 500px;
        margin: 30px auto;
        background: #ffffff;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
      }
      .header {
        background: linear-gradient(135deg, #3b82f6, #2563eb);
        padding: 30px;
        text-align: center;
      }
      .content {
        padding: 30px;
      }
      .otp-container {
        margin: 30px 0;
        text-align: center;
      }
      .otp-code {
        display: inline-block;
        font-size: 28px;
        font-weight: bold;
        color: #1e40af;
        background: #f8fafc;
        padding: 18px 36px;
        border-radius: 12px;
        letter-spacing: 4px;
        border: 2px dashed #e2e8f0;
        margin: 10px 0;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      }
      .footer {
        background: #f1f5f9;
        padding: 20px;
        text-align: center;
        font-size: 13px;
        color: #64748b;
        border-top: 1px solid #e2e8f0;
      }
      .social-icons {
        margin-top: 15px;
      }
      .social-icon {
        margin: 0 10px;
        display: inline-block;
        transition: transform 0.2s;
      }
      .social-icon:hover {
        transform: translateY(-2px);
      }
      .cta-text {
        font-size: 16px;
        margin-bottom: 25px;
      }
      .expiry-note {
        font-size: 14px;
        color: #475569;
        text-align: center;
        margin-top: 20px;
      }
      .disclaimer {
        font-size: 12px;
        color: #94a3b8;
        margin-top: 25px;
        padding-top: 20px;
        border-top: 1px solid #e2e8f0;
      }

      @media only screen and (max-width: 600px) {
        .container {
          width: 95% !important;
          margin: 20px auto !important;
          border-radius: 12px !important;
        }
        .header {
          padding: 25px 20px !important;
        }
        h2 {
          font-size: 20px !important;
        }
        .otp-code {
          font-size: 24px !important;
          padding: 15px 25px !important;
          letter-spacing: 3px !important;
        }
        .content {
          padding: 25px 20px !important;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <h2 style="color: #fff; margin: 0; font-size: 24px; font-weight: 600;">🔒 Password Reset Code</h2>
      </div>
      
      <!-- Content -->
      <div class="content">
        <p style="font-size: 16px; margin-bottom: 5px;">Hello ${name},</p>
        
        <p class="cta-text">
          We received a request to reset your password. Here's your verification code:
        </p>
        
        <div class="otp-container">
          <div style="margin-bottom: 15px; font-size: 15px; color: #475569;">
            Your one-time password
          </div>
          <div class="otp-code">${otp}</div>
          <p class="expiry-note">
            This code expires in <strong>10 minutes</strong>. Please don't share it with anyone.
          </p>
        </div>
        
        <p style="font-size: 15px; color: #475569; margin-bottom: 0;">
          If you didn't request this, you can safely ignore this email.
        </p>
        
        <div class="disclaimer">
          <p style="margin: 5px 0;">Need help? Contact our support team at support@findmypg.com</p>
          <p style="margin: 5px 0;">© ${new Date().getFullYear()} Find MyPG. All rights reserved.</p>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <div class="social-icons">
          <a href="#" class="social-icon"><img src="https://cdn-icons-png.flaticon.com/512/124/124010.png" alt="Facebook" width="22"></a>
          <a href="#" class="social-icon"><img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" width="22"></a>
          <a href="#" class="social-icon"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="22"></a>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
};