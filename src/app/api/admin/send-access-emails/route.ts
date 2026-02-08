import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER || 'hello@govconedu.com',
    pass: process.env.SMTP_PASSWORD,
  },
});

interface CustomerAccess {
  email: string;
  name?: string;
  products: string[];
}

// All tool customers and what they have access to
const TOOL_CUSTOMERS: CustomerAccess[] = [
  // Ultimate Bundle customers
  ...['service@clarityserves.com', 'sylwiak@hjgovcontractingcorp.com', 'hello@eganrose.com',
    'powerwealthprofits@protonmail.com', 'pa.joof@pjaygroup.com', 'vets@stableimprovementllc.com',
    'contact@blenaitechnologies.com', 'yvette@sharpernewaxe.com', 'sylvester.anderson@andslylegacy.com',
    'kenworthbudd@yahoo.com', 'jparker@pceconstruction.com', 'fernando.mercado@venerandavalor.com',
    'bonitascott15@hotmail.com', 'tblackella@yahoo.com', 'colinn.me@gmail.com',
    'obi@attendantsinc.com'].map(email => ({
    email,
    products: ['Federal Market Assassin (Premium)', 'AI Content Generator', 'Recompete Contracts Tracker', 'Federal Contractor Database'],
  })),
  // Opportunity Hunter Pro customers
  ...['bill.hinkson@gmail.com', 'jonathan.nolan@getdunamis.com', 'kym@dallasorganizer.com',
    'ken@hussarsystems.com', 'byron@kadaygroup.com', 'atkinsriddick@gmail.com',
    'covington723@gmail.com', 'dwilzon1@gmail.com', 'scott_taneshia@yahoo.com',
    'prempuplu@gmail.com', 'jayvib@gmail.com', 'qbcleaningllc@gmail.com',
    'wgreene@aegglobalconsulting.com'].map(email => ({
    email,
    products: ['Opportunity Hunter Pro'],
  })),
  // Recompete customer
  { email: 'rhendricks@horrangi.com', products: ['Recompete Contracts Tracker'] },
  // Contractor Database customers
  ...['jsumrall@diamondscaffold.com', 'cnroofs@gmail.com', 'austin@durhambrandco.com'].map(email => ({
    email,
    products: ['Federal Contractor Database'],
  })),
];

function buildEmail(customer: CustomerAccess): string {
  const productList = customer.products.map(p =>
    `<li style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;">${p}</li>`
  ).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">GovCon Giants</h1>
    <p style="color: #c4b5fd; margin: 10px 0 0 0;">Your Tools Are Ready!</p>
  </div>

  <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
    <h2 style="color: #1e3a8a; margin-top: 0;">Your GovCon Tools Are Activated</h2>

    <p>Hi there,</p>

    <p>Thank you for your purchase! We wanted to make sure you know exactly how to access your tools. You have <strong>lifetime access</strong> to the following:</p>

    <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <h3 style="color: #166534; margin: 0 0 10px 0;">Your Tools:</h3>
      <ul style="list-style: none; padding: 0; margin: 0; color: #15803d;">
        ${productList}
      </ul>
    </div>

    <div style="background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%); border: 2px solid #3b82f6; border-radius: 12px; padding: 25px; margin: 25px 0;">
      <h3 style="color: #1e40af; margin: 0 0 15px 0; text-align: center;">How to Access Your Tools:</h3>
      <ol style="color: #1e40af; margin: 0; padding-left: 20px;">
        <li style="padding: 5px 0;">Go to <a href="https://shop.govcongiants.org/activate" style="color: #1e40af; font-weight: bold;">shop.govcongiants.org/activate</a></li>
        <li style="padding: 5px 0;">Enter your purchase email: <strong>${customer.email}</strong></li>
        <li style="padding: 5px 0;">You'll see all your unlocked tools — click to start using them!</li>
      </ol>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="https://shop.govcongiants.org/activate" style="background: linear-gradient(135deg, #3b82f6 0%, #7c3aed 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 18px;">Access Your Tools Now</a>
    </div>

    <p style="background: #f3f4f6; border-radius: 8px; padding: 15px; color: #4b5563;">
      <strong>Your registered email:</strong> ${customer.email}<br>
      <span style="font-size: 14px;">Use this email to access all your tools anytime.</span>
    </p>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

    <p style="color: #6b7280; font-size: 12px; text-align: center;">
      Questions? Contact us at <a href="mailto:service@govcongiants.com" style="color: #3b82f6;">service@govcongiants.com</a> or call 786-477-0477
    </p>

    <p style="text-align: center; color: #9ca3af; font-size: 12px;">
      &copy; 2026 GovCon Giants. All rights reserved.
    </p>
  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const { password, dryRun } = await request.json();

    if (password !== (process.env.ADMIN_PASSWORD || 'admin123')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Filter out test emails
    const testEmails = ['eric@govcongiants.com', 'evankoffdev@gmail.com', 'test@gmail.com', 'test1@gmail.com', 'test2@gmail.com', 'test3@gmail.com'];
    const customers = TOOL_CUSTOMERS.filter(c => !testEmails.includes(c.email.toLowerCase()));

    if (dryRun) {
      return NextResponse.json({
        dryRun: true,
        total: customers.length,
        customers: customers.map(c => ({ email: c.email, products: c.products })),
      });
    }

    const results: Array<{ email: string; status: string }> = [];

    for (const customer of customers) {
      try {
        const html = buildEmail(customer);

        await transporter.sendMail({
          from: `"GovCon Giants" <${process.env.SMTP_USER || 'hello@govconedu.com'}>`,
          to: customer.email,
          subject: 'Your GovCon Tools Are Ready — Here\'s How to Access Them',
          html,
        });

        results.push({ email: customer.email, status: 'sent' });
      } catch (err) {
        results.push({ email: customer.email, status: `error: ${err instanceof Error ? err.message : 'unknown'}` });
      }
    }

    return NextResponse.json({
      success: true,
      total: results.length,
      sent: results.filter(r => r.status === 'sent').length,
      errors: results.filter(r => r.status.startsWith('error')).length,
      results,
    });

  } catch (error) {
    return NextResponse.json(
      { error: `Failed: ${error instanceof Error ? error.message : 'unknown'}` },
      { status: 500 }
    );
  }
}
