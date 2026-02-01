import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER || 'hello@govconedu.com',
    pass: process.env.SMTP_PASSWORD,
  },
});

interface SendVerificationEmailParams {
  to: string;
  verificationLink: string;
}

// Email for free resource email verification
export async function sendFreeResourceVerificationEmail({
  to,
  verificationLink,
}: SendVerificationEmailParams): Promise<boolean> {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">GovCon Giants</h1>
    <p style="color: #a7f3d0; margin: 10px 0 0 0;">Free Resources</p>
  </div>

  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
    <h2 style="color: #059669; margin-top: 0;">Verify Your Email to Access Free Resources</h2>

    <p>Hi there!</p>

    <p>Click the button below to verify your email and unlock <strong>all free GovCon resources</strong>:</p>

    <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 20px; margin: 25px 0;">
      <h3 style="color: #166534; margin: 0 0 10px 0;">What You'll Get:</h3>
      <ul style="color: #15803d; margin: 0; padding-left: 20px;">
        <li>SBLO Contact List (225+ contacts)</li>
        <li>Tier-2 Supplier Directory (50+ primes)</li>
        <li>75+ AI Prompts for GovCon</li>
        <li>2026 Action Plan</li>
        <li>December Spend Forecast</li>
        <li>GovCon Guides & Templates</li>
        <li>Free Expiring Contracts CSV</li>
        <li>Tribal Contractor List</li>
        <li>And more!</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${verificationLink}" style="background: #059669; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 18px;">Verify Email & Get Access</a>
    </div>

    <p style="color: #6b7280; font-size: 14px;">Or copy and paste this link into your browser:</p>
    <p style="background: #f3f4f6; padding: 12px; border-radius: 6px; word-break: break-all; font-size: 14px;">
      <a href="${verificationLink}" style="color: #059669;">${verificationLink}</a>
    </p>

    <p style="color: #9ca3af; font-size: 12px;">This verification link expires in 24 hours.</p>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

    <p style="color: #6b7280; font-size: 12px; text-align: center;">
      Didn't request this? You can safely ignore this email.
    </p>

    <p style="text-align: center; color: #9ca3af; font-size: 12px;">
      &copy; ${new Date().getFullYear()} GovCon Giants. All rights reserved.
    </p>
  </div>
</body>
</html>
`;

  try {
    await transporter.sendMail({
      from: `"GovCon Giants" <${process.env.SMTP_USER || 'hello@govconedu.com'}>`,
      to,
      subject: 'Verify Your Email for Free GovCon Resources',
      html: htmlContent,
      text: `Verify Your Email for Free GovCon Resources

Hi there!

Click the link below to verify your email and unlock all free GovCon resources:

${verificationLink}

What You'll Get:
- SBLO Contact List (225+ contacts)
- Tier-2 Supplier Directory (50+ primes)
- 75+ AI Prompts for GovCon
- 2026 Action Plan
- December Spend Forecast
- GovCon Guides & Templates
- Free Expiring Contracts CSV
- Tribal Contractor List
- And more!

This verification link expires in 24 hours.

Didn't request this? You can safely ignore this email.

- GovCon Giants Team`,
    });

    console.log(`✅ Verification email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('❌ Failed to send verification email:', error);
    return false;
  }
}

interface SendAccessCodeEmailParams {
  to: string;
  companyName?: string;
  accessCode: string;
  accessLink: string;
}

interface SendDatabaseAccessEmailParams {
  to: string;
  customerName?: string;
  accessLink: string;
}

interface SendOpportunityHunterProEmailParams {
  to: string;
  customerName?: string;
}

// Email for Federal Contractor Database access
export async function sendDatabaseAccessEmail({
  to,
  customerName,
  accessLink,
}: SendDatabaseAccessEmailParams): Promise<boolean> {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">GovCon Giants</h1>
    <p style="color: #93c5fd; margin: 10px 0 0 0;">Federal Contractor Database</p>
  </div>

  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
    <h2 style="color: #1e3a8a; margin-top: 0;">Thank You for Your Purchase!</h2>

    <p>Hi${customerName ? ` ${customerName}` : ''},</p>

    <p>Your payment has been confirmed. You now have <strong>lifetime access</strong> to our Federal Contractor Database featuring:</p>

    <ul style="color: #4b5563;">
      <li><strong>3,500+</strong> federal prime contractors</li>
      <li><strong>$430B+</strong> in contract data</li>
      <li><strong>800+</strong> SBLO contacts with emails</li>
      <li><strong>115+</strong> supplier portal links</li>
      <li>Searchable and filterable by NAICS, agency, contract size</li>
    </ul>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${accessLink}" style="background: #2563eb; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 18px;">Access Your Database</a>
    </div>

    <p style="color: #6b7280; font-size: 14px;">Or copy and paste this link into your browser:</p>
    <p style="background: #f3f4f6; padding: 12px; border-radius: 6px; word-break: break-all; font-size: 14px;">
      <a href="${accessLink}" style="color: #2563eb;">${accessLink}</a>
    </p>

    <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 20px; margin: 25px 0;">
      <h3 style="color: #166534; margin: 0 0 10px 0;">💡 Pro Tips:</h3>
      <ul style="color: #15803d; margin: 0; padding-left: 20px;">
        <li>Use filters to find contractors by your NAICS codes</li>
        <li>Look for companies with "Supplier Portal" badges to register directly</li>
        <li>Export your filtered results to CSV for outreach</li>
        <li>Bookmark the database page for easy access</li>
      </ul>
    </div>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

    <p style="color: #6b7280; font-size: 12px; text-align: center;">
      Save this email for future access.<br>
      Questions? Reply to this email for support.
    </p>

    <p style="text-align: center; color: #9ca3af; font-size: 12px;">
      &copy; ${new Date().getFullYear()} GovCon Giants. All rights reserved.
    </p>
  </div>
</body>
</html>
`;

  try {
    await transporter.sendMail({
      from: `"GovCon Giants" <${process.env.SMTP_USER || 'hello@govconedu.com'}>`,
      to,
      subject: 'Your Federal Contractor Database Access | GovCon Giants',
      html: htmlContent,
      text: `Thank You for Your Purchase!

Hi${customerName ? ` ${customerName}` : ''},

Your payment has been confirmed. You now have lifetime access to our Federal Contractor Database.

Access your database here: ${accessLink}

Features included:
- 3,500+ federal prime contractors
- $430B+ in contract data
- 800+ SBLO contacts with emails
- 115+ supplier portal links
- Searchable and filterable by NAICS, agency, contract size

Pro Tips:
- Use filters to find contractors by your NAICS codes
- Look for companies with "Supplier Portal" badges to register directly
- Export your filtered results to CSV for outreach
- Bookmark the database page for easy access

Save this email for future access.
Questions? Reply to this email for support.

- GovCon Giants Team`,
    });

    console.log(`✅ Database access email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('❌ Failed to send database email:', error);
    return false;
  }
}

export async function sendAccessCodeEmail({
  to,
  companyName,
  accessCode,
  accessLink,
}: SendAccessCodeEmailParams): Promise<boolean> {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; background: #f8fafc; }
    .container { background: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .brand { text-align: center; margin-bottom: 30px; }
    .brand-govcon { font-size: 28px; font-weight: 700; color: #1d4ed8; }
    .brand-giants { font-size: 28px; font-weight: 700; color: #f59e0b; }
    h1 { color: #1e40af; text-align: center; margin-bottom: 10px; }
    .subtitle { text-align: center; color: #64748b; margin-bottom: 30px; }
    .access-box { background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #3b82f6; border-radius: 12px; padding: 30px; text-align: center; margin: 30px 0; }
    .access-code { font-family: monospace; font-size: 24px; font-weight: bold; color: #1e40af; background: white; padding: 10px 20px; border-radius: 8px; display: inline-block; margin: 10px 0; letter-spacing: 2px; }
    .cta-button { display: inline-block; background: #3b82f6; color: white !important; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; font-size: 18px; margin: 20px 0; }
    .cta-button:hover { background: #2563eb; }
    .warning { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 8px; padding: 15px; margin: 20px 0; }
    .warning-title { color: #92400e; font-weight: 600; margin-bottom: 5px; }
    .warning-text { color: #78350f; font-size: 14px; }
    .steps { background: #f0fdf4; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .steps h3 { color: #166534; margin-top: 0; }
    .steps ol { margin: 0; padding-left: 20px; color: #15803d; }
    .steps li { margin-bottom: 8px; }
    .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="brand">
      <span class="brand-govcon">GovCon</span><span class="brand-giants">Giants</span>
    </div>

    <h1>Your Report Access is Ready!</h1>
    <p class="subtitle">Thank you for your purchase${companyName ? `, ${companyName}` : ''}!</p>

    <div class="access-box">
      <p style="margin: 0 0 10px 0; color: #1e40af; font-weight: 600;">Your One-Time Access Code:</p>
      <div class="access-code">${accessCode}</div>
      <br><br>
      <a href="${accessLink}" class="cta-button">Access Your Report Now</a>
    </div>

    <div class="warning">
      <div class="warning-title">⚠️ Important: One-Time Use Only</div>
      <div class="warning-text">This access link can only be used once. Make sure to download and save your report before leaving the page.</div>
    </div>

    <div class="steps">
      <h3>How to Get Your Report:</h3>
      <ol>
        <li>Click the button above or copy this link: ${accessLink}</li>
        <li>Enter your business information (NAICS code, location, etc.)</li>
        <li>Select the government agencies you want to target</li>
        <li>Generate and download your personalized report</li>
        <li><strong>Click "Print All (PDF)"</strong> to save a permanent copy of your report</li>
      </ol>
    </div>

    <div style="background: #eff6ff; border: 2px solid #3b82f6; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
      <h3 style="color: #1e40af; margin: 0 0 10px 0;">🎬 Watch the Tutorial</h3>
      <p style="color: #334155; margin: 0 0 15px 0;">Learn how to get the most out of your Federal Market Assassin report</p>
      <a href="https://vimeo.com/1150857756?fl=tl&fe=ec" style="display: inline-block; background: #1e40af; color: white !important; text-decoration: none; padding: 12px 30px; border-radius: 8px; font-weight: 600;">Watch Now</a>
    </div>

    <p style="text-align: center; color: #64748b;">
      Questions? Reply to this email or contact us at hello@govconedu.com
    </p>

    <div class="footer">
      <span class="brand-govcon">GovCon</span><span class="brand-giants">Giants</span>
      <p>Federal Market Assassin - Your Strategic Advantage in Government Contracting</p>
      <p>&copy; ${new Date().getFullYear()} GovCon Giants. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

  try {
    await transporter.sendMail({
      from: `"GovCon Giants" <${process.env.SMTP_USER || 'hello@govconedu.com'}>`,
      to,
      subject: 'Your Federal Market Assassin Report Access | GovCon Giants',
      html: htmlContent,
      text: `Your Federal Market Assassin Report Access\n\nThank you for your purchase!\n\nYour one-time access code: ${accessCode}\n\nAccess your report here: ${accessLink}\n\nHow to Get Your Report:\n1. Click the link above\n2. Enter your business information (NAICS code, location, etc.)\n3. Select the government agencies you want to target\n4. Generate and download your personalized report\n5. Click "Print All (PDF)" to save a permanent copy\n\nWATCH THE TUTORIAL\nLearn how to get the most out of your report:\nhttps://vimeo.com/1150857756?fl=tl&fe=ec\n\nIMPORTANT: This link can only be used once. Make sure to download your report before leaving the page.\n\n- GovCon Giants Team`,
    });

    console.log(`✅ Access code email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return false;
  }
}

// Email for Opportunity Hunter Pro access
interface SendUltimateBundleEmailParams {
  to: string;
  customerName?: string;
}

// Email for Ultimate Giant Bundle purchase
export async function sendUltimateBundleEmail({
  to,
  customerName,
}: SendUltimateBundleEmailParams): Promise<boolean> {
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #fbbf24; margin: 0; font-size: 28px;">GovCon Giants</h1>
    <p style="color: #f59e0b; margin: 10px 0 0 0; font-size: 18px; font-weight: bold;">ULTIMATE GIANT BUNDLE</p>
  </div>

  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
    <div style="text-align: center; margin-bottom: 20px;">
      <span style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #1f2937; padding: 8px 20px; border-radius: 20px; font-weight: bold; font-size: 14px;">WELCOME TO THE ULTIMATE TIER</span>
    </div>

    <h2 style="color: #1f2937; margin-top: 0; text-align: center;">Congratulations on Your Purchase!</h2>

    <p>Hi${customerName ? ` ${customerName}` : ''},</p>

    <p>Thank you for investing in your GovCon success! You now have <strong>lifetime access</strong> to our complete suite of tools:</p>

    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 25px 0;">
      <h3 style="color: #92400e; margin: 0 0 15px 0; text-align: center;">Your Ultimate Bundle Includes:</h3>
      <ul style="color: #78350f; margin: 0; padding-left: 20px;">
        <li><strong>Federal Market Assassin Premium</strong> - 8 Strategic Reports ($497 value)</li>
        <li><strong>AI Content Generator (Full Fix)</strong> - Unlimited LinkedIn Posts ($397 value)</li>
        <li><strong>Federal Contractor Database</strong> - 3,500+ Contractors ($497 value)</li>
        <li><strong>Recompete Contracts Tracker</strong> - Expiring Contracts ($397 value)</li>
        <li><strong>Opportunity Hunter Pro</strong> - Agency Matching ($49 value)</li>
        <li><strong>1-on-1 Strategy Session</strong> - Personal Consultation</li>
        <li><strong>Priority Support</strong> - Direct Access to Our Team</li>
        <li><strong>Future Tools Access</strong> - All New Releases Included</li>
      </ul>
    </div>

    <h3 style="color: #1f2937;">How to Access Your Tools:</h3>

    <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 15px; margin: 15px 0;">
      <p style="margin: 0; color: #166534;"><strong>1. Federal Market Assassin Premium</strong></p>
      <p style="margin: 5px 0 0 0; color: #15803d;">Visit <a href="https://shop.govcongiants.org/market-assassin" style="color: #166534;">shop.govcongiants.org/market-assassin</a> and click "I Have Access"</p>
    </div>

    <div style="background: #eff6ff; border: 1px solid #93c5fd; border-radius: 8px; padding: 15px; margin: 15px 0;">
      <p style="margin: 0; color: #1e40af;"><strong>2. AI Content Generator</strong></p>
      <p style="margin: 5px 0 0 0; color: #3b82f6;">Visit <a href="https://shop.govcongiants.org/ai-content" style="color: #1e40af;">shop.govcongiants.org/ai-content</a> and enter your email</p>
    </div>

    <div style="background: #fdf4ff; border: 1px solid #e879f9; border-radius: 8px; padding: 15px; margin: 15px 0;">
      <p style="margin: 0; color: #86198f;"><strong>3. Federal Contractor Database</strong></p>
      <p style="margin: 5px 0 0 0; color: #a855f7;">Visit <a href="https://shop.govcongiants.org/contractor-database" style="color: #86198f;">shop.govcongiants.org/contractor-database</a></p>
    </div>

    <div style="background: #ecfeff; border: 1px solid #67e8f9; border-radius: 8px; padding: 15px; margin: 15px 0;">
      <p style="margin: 0; color: #0e7490;"><strong>4. Recompete Contracts</strong></p>
      <p style="margin: 5px 0 0 0; color: #06b6d4;">Visit <a href="https://shop.govcongiants.org/recompete" style="color: #0e7490;">shop.govcongiants.org/recompete</a></p>
    </div>

    <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 8px; padding: 15px; margin: 15px 0;">
      <p style="margin: 0; color: #92400e;"><strong>5. Opportunity Hunter Pro</strong></p>
      <p style="margin: 5px 0 0 0; color: #d97706;">Visit <a href="https://shop.govcongiants.org/opportunity-hunter" style="color: #92400e;">shop.govcongiants.org/opportunity-hunter</a></p>
    </div>

    <div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); border-radius: 12px; padding: 20px; margin: 25px 0; text-align: center;">
      <h3 style="color: #fbbf24; margin: 0 0 10px 0;">Schedule Your Strategy Session</h3>
      <p style="color: #e5e7eb; margin: 0 0 15px 0;">As an Ultimate Giant member, you get a 1-on-1 call with our team.</p>
      <a href="mailto:hello@govconedu.com?subject=Ultimate%20Giant%20Strategy%20Session" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #1f2937; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">Book Your Call</a>
    </div>

    <p style="background: #f3f4f6; border-radius: 8px; padding: 15px; color: #4b5563;">
      <strong>Your registered email:</strong> ${to}<br>
      <span style="font-size: 14px;">Use this email to access all your tools.</span>
    </p>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

    <p style="color: #6b7280; font-size: 12px; text-align: center;">
      Save this email - it contains links to all your tools!<br>
      Questions? Reply to this email or contact hello@govconedu.com
    </p>

    <p style="text-align: center; color: #9ca3af; font-size: 12px;">
      &copy; ${new Date().getFullYear()} GovCon Giants. All rights reserved.
    </p>
  </div>
</body>
</html>
`;

  try {
    await transporter.sendMail({
      from: `"GovCon Giants" <${process.env.SMTP_USER || 'hello@govconedu.com'}>`,
      to,
      subject: 'Welcome to Ultimate Giant Bundle - Your Access is Ready! | GovCon Giants',
      html: htmlContent,
      text: `Welcome to the Ultimate Giant Bundle!

Hi${customerName ? ` ${customerName}` : ''},

Thank you for investing in your GovCon success! You now have lifetime access to our complete suite of tools:

YOUR ULTIMATE BUNDLE INCLUDES:
- Federal Market Assassin Premium - 8 Strategic Reports ($497 value)
- AI Content Generator (Full Fix) - Unlimited LinkedIn Posts ($397 value)
- Federal Contractor Database - 3,500+ Contractors ($497 value)
- Recompete Contracts Tracker - Expiring Contracts ($397 value)
- Opportunity Hunter Pro - Agency Matching ($49 value)
- 1-on-1 Strategy Session - Personal Consultation
- Priority Support - Direct Access to Our Team
- Future Tools Access - All New Releases Included

HOW TO ACCESS YOUR TOOLS:

1. Federal Market Assassin Premium
   Visit: https://shop.govcongiants.org/market-assassin

2. AI Content Generator
   Visit: https://shop.govcongiants.org/ai-content

3. Federal Contractor Database
   Visit: https://shop.govcongiants.org/contractor-database

4. Recompete Contracts
   Visit: https://shop.govcongiants.org/recompete

5. Opportunity Hunter Pro
   Visit: https://shop.govcongiants.org/opportunity-hunter

STRATEGY SESSION:
Reply to this email to schedule your 1-on-1 strategy session!

Your registered email: ${to}
Use this email to access all your tools.

Save this email - it contains links to all your tools!
Questions? Reply to this email or contact hello@govconedu.com

- GovCon Giants Team`,
    });

    console.log(\`✅ Ultimate Bundle email sent to \${to}\`);
    return true;
  } catch (error) {
    console.error('❌ Failed to send Ultimate Bundle email:', error);
    return false;
  }
}

export async function sendOpportunityHunterProEmail({
  to,
  customerName,
}: SendOpportunityHunterProEmailParams): Promise<boolean> {
  const accessLink = 'https://tools.govcongiants.org/opportunity-hunter';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">GovCon Giants</h1>
    <p style="color: #fef3c7; margin: 10px 0 0 0;">Opportunity Hunter Pro</p>
  </div>

  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
    <h2 style="color: #d97706; margin-top: 0;">Welcome to Opportunity Hunter Pro!</h2>

    <p>Hi${customerName ? ` ${customerName}` : ''},</p>

    <p>Thank you for your purchase! Your <strong>Opportunity Hunter Pro</strong> access is now active.</p>

    <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #f59e0b; border-radius: 12px; padding: 20px; margin: 25px 0;">
      <h3 style="color: #92400e; margin: 0 0 15px 0;">🎯 Your Pro Features:</h3>
      <ul style="color: #78350f; margin: 0; padding-left: 20px;">
        <li><strong>Agency Pain Points & Priorities</strong> - Know what challenges your target agencies face</li>
        <li><strong>Market Research Tips</strong> - Actionable guidance for each agency</li>
        <li><strong>CSV Export</strong> - Download results for your BD pipeline</li>
        <li><strong>Print Results</strong> - Save reports for offline use</li>
        <li><strong>Unlimited Searches</strong> - Search as many times as you need</li>
      </ul>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${accessLink}" style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 18px;">Access Opportunity Hunter Pro</a>
    </div>

    <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 20px; margin: 25px 0;">
      <h3 style="color: #166534; margin: 0 0 10px 0;">💡 How to Access:</h3>
      <ol style="color: #15803d; margin: 0; padding-left: 20px;">
        <li>Go to <a href="${accessLink}" style="color: #166534;">${accessLink}</a></li>
        <li>Click "I Have Access" and enter your email: <strong>${to}</strong></li>
        <li>Start discovering agencies that buy what you sell!</li>
      </ol>
    </div>

    <p style="background: #eff6ff; border: 1px solid #93c5fd; border-radius: 8px; padding: 15px; color: #1e40af;">
      <strong>Your registered email:</strong> ${to}<br>
      <span style="font-size: 14px;">Use this email to verify your Pro access anytime.</span>
    </p>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

    <p style="color: #6b7280; font-size: 12px; text-align: center;">
      Save this email for future reference.<br>
      Questions? Reply to this email for support.
    </p>

    <p style="text-align: center; color: #9ca3af; font-size: 12px;">
      &copy; ${new Date().getFullYear()} GovCon Giants. All rights reserved.
    </p>
  </div>
</body>
</html>
`;

  try {
    await transporter.sendMail({
      from: `"GovCon Giants" <${process.env.SMTP_USER || 'hello@govconedu.com'}>`,
      to,
      subject: 'Your Opportunity Hunter Pro Access is Ready! | GovCon Giants',
      html: htmlContent,
      text: `Welcome to Opportunity Hunter Pro!

Hi${customerName ? ` ${customerName}` : ''},

Thank you for your purchase! Your Opportunity Hunter Pro access is now active.

Your Pro Features:
- Agency Pain Points & Priorities - Know what challenges your target agencies face
- Market Research Tips - Actionable guidance for each agency
- CSV Export - Download results for your BD pipeline
- Print Results - Save reports for offline use
- Unlimited Searches - Search as many times as you need

How to Access:
1. Go to ${accessLink}
2. Click "I Have Access" and enter your email: ${to}
3. Start discovering agencies that buy what you sell!

Your registered email: ${to}
Use this email to verify your Pro access anytime.

Save this email for future reference.
Questions? Reply to this email for support.

- GovCon Giants Team`,
    });

    console.log(`✅ Opportunity Hunter Pro email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('❌ Failed to send Opportunity Hunter Pro email:', error);
    return false;
  }
}
