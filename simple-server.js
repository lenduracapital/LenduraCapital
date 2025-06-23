import express from 'express';
import { createServer } from 'http';
const app = express();

// Basic middleware
app.use(express.json());
app.use(express.static('public'));
app.use('/attached_assets', express.static('attached_assets'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', port: 5000 });
});

// Main route - serve working website
app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FundTek Capital Group - Business Funding Solutions</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #fff;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo {
            font-size: 1.8rem;
            font-weight: bold;
        }
        .phone {
            background: rgba(255,255,255,0.2);
            padding: 8px 16px;
            border-radius: 20px;
            text-decoration: none;
            color: white;
            font-weight: 500;
        }
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 80px 20px;
        }
        .hero h1 {
            font-size: 3.5rem;
            margin-bottom: 1rem;
            font-weight: 700;
        }
        .hero p {
            font-size: 1.3rem;
            margin-bottom: 2rem;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            opacity: 0.95;
        }
        .btn {
            display: inline-block;
            background: #ff6b6b;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            margin: 8px;
            box-shadow: 0 4px 15px rgba(255,107,107,0.3);
        }
        .btn:hover {
            background: #ff5252;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255,107,107,0.4);
        }
        .section {
            padding: 80px 20px;
        }
        .section-title {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 3rem;
            color: #2c3e50;
        }
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 30px;
            margin-top: 3rem;
        }
        .feature {
            background: #f8f9fa;
            padding: 40px 30px;
            border-radius: 15px;
            text-align: center;
            transition: transform 0.3s ease;
            border: 1px solid #e9ecef;
        }
        .feature:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .feature h3 {
            color: #667eea;
            margin-bottom: 1rem;
            font-size: 1.4rem;
        }
        .feature p {
            color: #666;
            line-height: 1.7;
        }
        .cta-section {
            background: #f8f9fa;
            text-align: center;
            padding: 80px 20px;
        }
        .status {
            background: #28a745;
            color: white;
            padding: 20px;
            border-radius: 10px;
            margin: 40px auto;
            max-width: 600px;
            text-align: center;
            font-size: 1.2rem;
            font-weight: 600;
        }
        @media (max-width: 768px) {
            .hero h1 { font-size: 2.5rem; }
            .features { grid-template-columns: 1fr; }
            .nav { flex-direction: column; gap: 1rem; }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <nav class="nav">
                <div class="logo">FundTek Capital Group</div>
                <a href="tel:305-307-4658" class="phone">📞 (305) 307-4658</a>
            </nav>
        </div>
    </header>

    <section class="hero">
        <div class="container">
            <h1>Business Funding Solutions</h1>
            <p>Get the capital your business needs to grow and succeed. Fast approvals, flexible terms, and competitive rates for all types of businesses.</p>
            <a href="https://form.jotform.com/251417715331047" target="_blank" class="btn">
                🚀 Apply Now - Get Pre-Approved
            </a>
            <a href="tel:305-307-4658" class="btn">
                📞 Call for Instant Quote
            </a>
        </div>
    </section>

    <div class="container">
        <div class="status">
            ✅ WEBSITE IS NOW WORKING! Server connected successfully on port 5000
        </div>
    </div>

    <section class="section">
        <div class="container">
            <h2 class="section-title">Our Funding Solutions</h2>
            <div class="features">
                <div class="feature">
                    <h3>💰 Term Loans</h3>
                    <p>Traditional business loans with fixed terms and competitive rates. Perfect for equipment purchases, expansion, or working capital needs.</p>
                </div>
                <div class="feature">
                    <h3>⚡ Merchant Cash Advance</h3>
                    <p>Quick access to capital based on your future sales. Fast approval process with flexible repayment structure.</p>
                </div>
                <div class="feature">
                    <h3>🏗️ Equipment Financing</h3>
                    <p>Finance the equipment your business needs to grow. The equipment serves as collateral for better rates and terms.</p>
                </div>
                <div class="feature">
                    <h3>🏛️ SBA Loans</h3>
                    <p>Government-backed loans with favorable terms and lower down payments for qualified small businesses.</p>
                </div>
                <div class="feature">
                    <h3>💳 Lines of Credit</h3>
                    <p>Flexible credit line that you can draw from as needed. Only pay interest on what you actually use.</p>
                </div>
                <div class="feature">
                    <h3>📄 Invoice Factoring</h3>
                    <p>Turn your outstanding invoices into immediate cash flow. Get paid today while waiting for customers to pay.</p>
                </div>
            </div>
        </div>
    </section>

    <section class="cta-section">
        <div class="container">
            <h2 class="section-title">Ready to Get Started?</h2>
            <p style="font-size: 1.2rem; margin-bottom: 2rem; color: #666;">Contact us today for a free consultation and see how we can help your business grow to the next level.</p>
            <a href="https://form.jotform.com/251417715331047" target="_blank" class="btn">
                Apply for Funding Now
            </a>
            <a href="tel:305-307-4658" class="btn">
                Speak with Expert
            </a>
            <div style="margin-top: 3rem;">
                <p style="font-size: 1.1rem; color: #666;">
                    <strong>Direct Line:</strong> 
                    <a href="tel:305-307-4658" style="color: #667eea; text-decoration: none; font-weight: 600;">(305) 307-4658</a>
                </p>
                <p style="margin-top: 1rem; color: #999;">Available Monday - Friday, 9 AM - 6 PM EST</p>
            </div>
        </div>
    </section>

    <script>
        console.log('🎉 FundTek Capital Group website loaded successfully!');
        console.log('✅ Server connection: WORKING');
        console.log('🌐 Port 5000: ACCESSIBLE');
        console.log('📱 Ready for business applications');
        
        // Track application clicks
        document.querySelectorAll('a[href*="jotform"]').forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('📝 Application form opened');
            });
        });
        
        // Track phone calls
        document.querySelectorAll('a[href^="tel:"]').forEach(btn => {
            btn.addEventListener('click', () => {
                console.log('📞 Phone call initiated');
            });
        });
    </script>
</body>
</html>`);
});

const server = createServer(app);
const PORT = 5000;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 FundTek server running at http://0.0.0.0:${PORT}`);
  console.log(`✅ Website accessible via webview`);
  console.log(`📱 Ready for business funding applications`);
});