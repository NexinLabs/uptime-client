


/**Class for email templates */
export default class EmailTemplates {



  static forgotPassword(userName: string, resetLink: string): { subject: string; html: string } {
    return {
      subject: 'Reset Your Password - Uptime Monitor',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
            .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
            .content h2 { color: #667eea; margin-top: 0; font-size: 24px; }
            .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 6px; font-weight: 600; margin: 20px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .button:hover { transform: translateY(-2px); box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); }
            .footer { background-color: #f8f9fa; padding: 20px 30px; text-align: center; color: #666666; font-size: 14px; }
            .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 4px; padding: 15px; margin: 20px 0; color: #856404; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset</h1>
            </div>
            <div class="content">
              <h2>Hello ${userName},</h2>
              <p>We received a request to reset your password for your Uptime Monitor account. If you didn't make this request, you can safely ignore this email.</p>
              <p>To reset your password, click the button below:</p>
              <a href="${resetLink}" class="button">Reset Password</a>
              <div class="warning">
                <strong>Security Notice:</strong> This link will expire in 1 hour for your security. If the button doesn't work, copy and paste this URL into your browser: ${resetLink}
              </div>
              <p>If you have any questions, feel free to contact our support team.</p>
              <p>Best regards,<br>The Uptime Monitor Team</p>
            </div>
            <div class="footer">
              <p>This email was sent to you because you requested a password reset. If you didn't request this, please ignore this email.</p>
              <p>&copy; 2025 Uptime Monitor. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  }

  static verifyAccount(userName: string, verificationLink: string): { subject: string; html: string } {
    return {
      subject: 'Verify Your Account - Uptime Monitor',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Account</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
            .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
            .content h2 { color: #4facfe; margin-top: 0; font-size: 24px; }
            .button { display: inline-block; background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 6px; font-weight: 600; margin: 20px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .button:hover { transform: translateY(-2px); box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); }
            .footer { background-color: #f8f9fa; padding: 20px 30px; text-align: center; color: #666666; font-size: 14px; }
            .highlight { background-color: #e8f5e8; border-left: 4px solid #4facfe; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Verify Your Account</h1>
            </div>
            <div class="content">
              <h2>Welcome ${userName}!</h2>
              <p>Thank you for signing up for Uptime Monitor. To complete your registration and start monitoring your services, please verify your email address.</p>
              <div class="highlight">
                <strong>Why verify?</strong> Account verification helps us keep your account secure and ensures you receive important notifications about your monitored services.
              </div>
              <p>Click the button below to verify your account:</p>
              <a href="${verificationLink}" class="button">Verify Account</a>
              <p>If the button doesn't work, copy and paste this URL into your browser: ${verificationLink}</p>
              <p>Once verified, you'll have full access to all Uptime Monitor features.</p>
              <p>Best regards,<br>The Uptime Monitor Team</p>
            </div>
            <div class="footer">
              <p>This email was sent because you recently created an account with Uptime Monitor.</p>
              <p>&copy; 2025 Uptime Monitor. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  }

  static loginWithLink(userName: string, loginLink: string): { subject: string; html: string } {
    return {
      subject: 'Your Login Link - Uptime Monitor',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Login Link</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
            .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
            .content h2 { color: #fa709a; margin-top: 0; font-size: 24px; }
            .button { display: inline-block; background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 6px; font-weight: 600; margin: 20px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .button:hover { transform: translateY(-2px); box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); }
            .footer { background-color: #f8f9fa; padding: 20px 30px; text-align: center; color: #666666; font-size: 14px; }
            .info { background-color: #e7f3ff; border: 1px solid #b3d9ff; border-radius: 4px; padding: 15px; margin: 20px 0; color: #004085; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔗 Secure Login Link</h1>
            </div>
            <div class="content">
              <h2>Hello ${userName},</h2>
              <p>You requested a secure login link for your Uptime Monitor account. This link allows you to sign in without entering your password.</p>
              <div class="info">
                <strong>Security Info:</strong> This link is valid for 15 minutes and can only be used once. It was generated specifically for your account security.
              </div>
              <p>Click the button below to sign in:</p>
              <a href="${loginLink}" class="button">Sign In Now</a>
              <p>If the button doesn't work, copy and paste this URL into your browser: ${loginLink}</p>
              <p>If you didn't request this login link, please ignore this email and consider changing your password.</p>
              <p>Best regards,<br>The Uptime Monitor Team</p>
            </div>
            <div class="footer">
              <p>This email was sent because you requested a login link for Uptime Monitor.</p>
              <p>&copy; 2025 Uptime Monitor. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  }

  static welcome(userName: string): { subject: string; html: string } {
    return {
      subject: 'Welcome to Uptime Monitor!',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to Uptime Monitor</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); color: #333; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
            .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
            .content h2 { color: #4a90e2; margin-top: 0; font-size: 24px; }
            .features { background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin: 20px 0; }
            .features h3 { color: #4a90e2; margin-top: 0; }
            .features ul { padding-left: 20px; }
            .features li { margin-bottom: 8px; }
            .button { display: inline-block; background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 6px; font-weight: 600; margin: 20px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .button:hover { transform: translateY(-2px); box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); }
            .footer { background-color: #f8f9fa; padding: 20px 30px; text-align: center; color: #666666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome to Uptime Monitor!</h1>
            </div>
            <div class="content">
              <h2>Hello ${userName},</h2>
              <p>Welcome to Uptime Monitor! We're excited to have you on board. Your account has been successfully created and verified.</p>
              <div class="features">
                <h3>🚀 Get Started with These Features:</h3>
                <ul>
                  <li><strong>Monitor Websites & APIs:</strong> Keep track of your services' uptime and response times</li>
                  <li><strong>Real-time Alerts:</strong> Get notified instantly when your services go down</li>
                  <li><strong>Detailed Reports:</strong> Analyze performance trends and identify issues</li>
                  <li><strong>Multi-location Monitoring:</strong> Check your services from different geographic locations</li>
                  <li><strong>Custom Dashboards:</strong> Visualize your monitoring data with customizable charts</li>
                </ul>
              </div>
              <p>Ready to start monitoring? Click below to access your dashboard:</p>
              <a href="#" class="button">Go to Dashboard</a>
              <p>If you have any questions or need help getting started, don't hesitate to reach out to our support team.</p>
              <p>Happy monitoring!<br>The Uptime Monitor Team</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 Uptime Monitor. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  }

  static passwordResetConfirmation(userName: string): { subject: string; html: string } {
    return {
      subject: 'Password Reset Successful - Uptime Monitor',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset Successful</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .header { background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%); color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
            .content { padding: 40px 30px; color: #333333; line-height: 1.6; }
            .content h2 { color: #56ab2f; margin-top: 0; font-size: 24px; }
            .success { background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 4px; padding: 15px; margin: 20px 0; color: #155724; }
            .button { display: inline-block; background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%); color: white; text-decoration: none; padding: 15px 30px; border-radius: 6px; font-weight: 600; margin: 20px 0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
            .button:hover { transform: translateY(-2px); box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); }
            .footer { background-color: #f8f9fa; padding: 20px 30px; text-align: center; color: #666666; font-size: 14px; }
            .tips { background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin: 20px 0; }
            .tips h3 { color: #56ab2f; margin-top: 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Password Reset Successful</h1>
            </div>
            <div class="content">
              <h2>Hello ${userName},</h2>
              <div class="success">
                <strong>✓ Success!</strong> Your password has been successfully reset. You can now sign in to your Uptime Monitor account with your new password.
              </div>
              <p>If you didn't make this change, please contact our support team immediately to secure your account.</p>
              <div class="tips">
                <h3>🔒 Security Tips:</h3>
                <ul>
                  <li>Use a strong, unique password</li>
                  <li>Enable two-factor authentication when available</li>
                  <li>Never share your password with anyone</li>
                  <li>Sign out of shared devices</li>
                </ul>
              </div>
              <p>Click below to sign in with your new password:</p>
              <a href="#" class="button">Sign In Now</a>
              <p>Thank you for keeping your account secure!</p>
              <p>Best regards,<br>The Uptime Monitor Team</p>
            </div>
            <div class="footer">
              <p>This email confirms that your password was successfully reset.</p>
              <p>&copy; 2025 Uptime Monitor. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  }
}
