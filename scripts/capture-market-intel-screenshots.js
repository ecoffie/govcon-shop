/**
 * Capture Market Intelligence Screenshots
 *
 * Takes screenshots of:
 * 1. Briefings Dashboard
 * 2. Preferences Page
 * 3. Sample Briefing Email
 *
 * Usage: node scripts/capture-market-intel-screenshots.js
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, '../public/images/products/market-intelligence');

// Sample briefing email HTML (realistic example)
const sampleEmailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f3f4f6; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%); padding: 30px; color: white; }
    .header h1 { margin: 0 0 5px 0; font-size: 24px; }
    .header p { margin: 0; opacity: 0.9; font-size: 14px; }
    .content { padding: 30px; }
    .section { margin-bottom: 25px; }
    .section-title { font-size: 16px; font-weight: 600; color: #1e3a8a; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; }
    .opportunity { background: #f8fafc; border-radius: 8px; padding: 15px; margin-bottom: 12px; border-left: 4px solid #10b981; }
    .opportunity.high { border-left-color: #10b981; }
    .opportunity.medium { border-left-color: #f59e0b; }
    .opp-title { font-weight: 600; color: #1e293b; margin-bottom: 5px; font-size: 14px; }
    .opp-meta { font-size: 12px; color: #64748b; margin-bottom: 8px; }
    .opp-badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 500; }
    .badge-green { background: #dcfce7; color: #166534; }
    .badge-purple { background: #f3e8ff; color: #7c3aed; }
    .badge-blue { background: #dbeafe; color: #1e40af; }
    .fit-score { float: right; background: #10b981; color: white; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .teaming { background: #fef3c7; border-radius: 8px; padding: 15px; margin-bottom: 12px; }
    .teaming-title { font-weight: 600; color: #92400e; margin-bottom: 5px; }
    .teaming-desc { font-size: 13px; color: #78350f; }
    .footer { background: #f8fafc; padding: 20px 30px; text-align: center; font-size: 12px; color: #64748b; }
    .cta-btn { display: inline-block; background: #7c3aed; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 15px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your Daily GovCon Brief</h1>
      <p>Wednesday, April 9, 2026 | 5 opportunities matched</p>
    </div>
    <div class="content">
      <div class="section">
        <div class="section-title">
          <span>🎯</span> Top Opportunities
        </div>

        <div class="opportunity high">
          <span class="fit-score">87% fit</span>
          <div class="opp-title">IT Support Services - Department of Veterans Affairs</div>
          <div class="opp-meta">
            <span class="opp-badge badge-green">RFP</span>
            <span class="opp-badge badge-purple">8(a)</span>
            NAICS 541512 | $2.5M ceiling | Due: Apr 18
          </div>
        </div>

        <div class="opportunity high">
          <span class="fit-score">82% fit</span>
          <div class="opp-title">Cybersecurity Assessment - DHS CISA</div>
          <div class="opp-meta">
            <span class="opp-badge badge-blue">Sources Sought</span>
            <span class="opp-badge badge-purple">SDVOSB</span>
            NAICS 541512 | $1.8M est. | Due: Apr 22
          </div>
        </div>

        <div class="opportunity medium">
          <span class="fit-score">74% fit</span>
          <div class="opp-title">Cloud Migration Support - GSA FAS</div>
          <div class="opp-meta">
            <span class="opp-badge badge-green">RFQ</span>
            NAICS 541519 | $950K ceiling | Due: Apr 25
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          <span>🤝</span> Teaming Opportunities
        </div>

        <div class="teaming">
          <div class="teaming-title">CACI International seeking 8(a) partner</div>
          <div class="teaming-desc">Looking for cybersecurity SME for DHS BPA. Contact: partnerships@caci.com</div>
        </div>

        <div class="teaming">
          <div class="teaming-title">Booz Allen Hamilton - Cloud subcontractor needed</div>
          <div class="teaming-desc">AWS certified partner for VA modernization. 30% subcontract target.</div>
        </div>
      </div>

      <a href="#" class="cta-btn">View Full Briefing Dashboard →</a>
    </div>
    <div class="footer">
      <strong>GovCon Giants</strong> | Market Intelligence<br>
      Personalized for your NAICS: 541512, 541519 | VA, DHS, GSA
    </div>
  </div>
</body>
</html>
`;

async function captureScreenshots() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    // Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });

    // 1. Capture Dashboard
    console.log('Capturing dashboard...');
    try {
      await page.goto('https://tools.govcongiants.org/briefings', {
        waitUntil: 'networkidle2',
        timeout: 30000
      });
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'briefings-dashboard.png'),
        clip: { x: 0, y: 0, width: 1280, height: 900 }
      });
      console.log('✅ Dashboard captured');
    } catch (err) {
      console.log('⚠️ Dashboard requires auth, using placeholder');
    }

    // 2. Capture Preferences
    console.log('Capturing preferences...');
    try {
      await page.goto('https://tools.govcongiants.org/alerts/preferences', {
        waitUntil: 'networkidle2',
        timeout: 30000
      });
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({
        path: path.join(OUTPUT_DIR, 'preferences-page.png'),
        clip: { x: 0, y: 0, width: 1280, height: 900 }
      });
      console.log('✅ Preferences captured');
    } catch (err) {
      console.log('⚠️ Preferences page error:', err.message);
    }

    // 3. Capture Email Template
    console.log('Capturing email template...');
    await page.setContent(sampleEmailHTML);
    await page.setViewport({ width: 700, height: 1000, deviceScaleFactor: 2 });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({
      path: path.join(OUTPUT_DIR, 'briefing-email.png'),
      fullPage: false,
      clip: { x: 0, y: 0, width: 700, height: 950 }
    });
    console.log('✅ Email template captured');

    console.log('\n📁 Screenshots saved to:', OUTPUT_DIR);
    console.log('Files:');
    fs.readdirSync(OUTPUT_DIR).forEach(f => console.log('  -', f));

  } finally {
    await browser.close();
  }
}

captureScreenshots().catch(console.error);
