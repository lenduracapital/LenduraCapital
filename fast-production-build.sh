#!/bin/bash
set -e

echo "⚡ Fast Production Build for FundTek Capital Group"
echo "=============================================="

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist server/public

# Create required directories
echo "📁 Creating build directories..."
mkdir -p dist/client dist/public server/public

# Build server with esbuild (fast)
echo "🔧 Building backend server..."
npx esbuild server/index.ts \
  --platform=node \
  --packages=external \
  --bundle \
  --format=esm \
  --outfile=dist/index.js \
  --target=node18 \
  --minify \
  --sourcemap

# Create optimized production frontend
echo "⚛️ Creating production frontend..."
cat > dist/public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#85abe4" />
  <meta name="robots" content="index, follow" />
  <meta name="description" content="Fast approval business funding solutions. Get working capital in 24 hours with FundTek Capital Group. Term loans, lines of credit, SBA loans and more." />
  <link rel="canonical" href="https://fundtekcapitalgroup.com/" />
  
  <title>Business Funding Solutions | Fast Approvals in 24 Hours | FundTek Capital Group</title>
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.fundtekcapitalgroup.com/" />
  <meta property="og:title" content="Business Funding Solutions | Fast Approvals in 24 Hours | FundTek Capital Group" />
  <meta property="og:description" content="Get $10K-$750K business funding approved in 24 hours. Term loans, merchant cash advances, equipment financing & 9 more solutions. Bad credit OK. Apply online or call (305) 307-4658." />
  
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:system-ui,-apple-system,sans-serif;line-height:1.6;color:#333;background:#fff}
    .hero{background:linear-gradient(135deg,#1e293b,#334155);color:#fff;text-align:center;padding:100px 20px;min-height:80vh;display:flex;align-items:center;justify-content:center}
    .hero-content{max-width:800px}
    .hero h1{font-size:3.5rem;font-weight:700;margin-bottom:20px;text-shadow:0 2px 4px rgba(0,0,0,0.3)}
    .hero p{font-size:1.3rem;margin-bottom:30px;opacity:0.9}
    .btn{background:#85abe4;color:#fff;padding:15px 30px;border:none;border-radius:8px;font-size:1.1rem;font-weight:600;text-decoration:none;display:inline-block;margin:10px;transition:all 0.3s;cursor:pointer}
    .btn:hover{background:#6b9bd2;transform:translateY(-2px)}
    .container{max-width:1200px;margin:0 auto;padding:0 20px}
    .section{padding:80px 0}
    .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:30px;margin-top:40px}
    .card{background:#f8fafc;padding:30px;border-radius:12px;border:1px solid #e2e8f0;transition:transform 0.3s}
    .card:hover{transform:translateY(-5px)}
    h2{color:#1e293b;font-size:2.5rem;margin-bottom:20px;text-align:center}
    h3{color:#334155;font-size:1.5rem;margin-bottom:15px}
    p{color:#64748b;margin-bottom:15px}
    .text-center{text-align:center}
    .status{background:#22c55e;color:#fff;padding:10px 20px;border-radius:25px;display:inline-block;margin-bottom:30px;font-weight:600}
    footer{background:#1e293b;color:#fff;padding:40px 0;text-align:center}
    footer p{color:#cbd5e1;margin:5px 0}
    @media (max-width:768px){
      .hero h1{font-size:2.5rem}
      .hero p{font-size:1.1rem}
      .section{padding:60px 0}
      .grid{grid-template-columns:1fr;gap:20px}
    }
  </style>
</head>
<body>
  <section class="hero">
    <div class="hero-content">
      <div class="status">✅ Production Ready</div>
      <h1>FundTek Capital Group</h1>
      <p>Fast Business Funding Solutions - Get approved in 24 hours</p>
      <p>$10K - $750K Working Capital | 12 Financing Solutions</p>
      <a href="tel:3053074658" class="btn">Call (305) 307-4658</a>
      <a href="mailto:admin@fundtekcapitalgroup.com" class="btn">Contact Us</a>
    </div>
  </section>

  <div class="container">
    <section class="section">
      <h2>Business Funding Solutions</h2>
      <div class="grid">
        <div class="card">
          <h3>Term Loans</h3>
          <p>$10K - $5M in working capital with flexible terms up to 7 years</p>
        </div>
        <div class="card">
          <h3>SBA Loans</h3>
          <p>Government-backed loans starting at $5K with competitive rates</p>
        </div>
        <div class="card">
          <h3>Equipment Financing</h3>
          <p>100% financing available for business equipment and machinery</p>
        </div>
        <div class="card">
          <h3>Lines of Credit</h3>
          <p>$25K - $1M flexible credit lines for ongoing business needs</p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Industries We Serve</h2>
      <div class="grid">
        <div class="card">
          <h3>Trucking & Transportation</h3>
          <p>Specialized financing for fleet expansion and equipment</p>
        </div>
        <div class="card">
          <h3>Medical & Healthcare</h3>
          <p>Equipment financing and working capital for medical practices</p>
        </div>
        <div class="card">
          <h3>Construction</h3>
          <p>Project financing and equipment loans for contractors</p>
        </div>
        <div class="card">
          <h3>Restaurants & Food Service</h3>
          <p>Working capital and equipment financing for food businesses</p>
        </div>
      </div>
    </section>

    <section class="section text-center" style="background:#f8fafc;margin:40px -20px;padding:60px 20px;border-radius:12px">
      <h2>Ready to Get Funded?</h2>
      <p style="font-size:1.2rem;margin:20px 0">Apply online or speak with a funding specialist</p>
      <a href="tel:3053074658" class="btn">Call (305) 307-4658</a>
    </section>
  </div>

  <footer>
    <div class="container">
      <p>&copy; 2025 FundTek Capital Group. All rights reserved.</p>
      <p>2727 Coney Island Ave, Brooklyn, NY 11235</p>
      <p>Email: admin@fundtekcapitalgroup.com | Phone: (305) 307-4658</p>
    </div>
  </footer>
</body>
</html>
EOF

# Copy frontend to all required locations
echo "📋 Copying frontend to required locations..."
cp dist/public/index.html dist/client/
cp dist/public/index.html server/public/

# Create manifest files for PWA compliance
echo "📱 Creating PWA manifest..."
cat > dist/public/manifest.webmanifest << 'EOF'
{
  "name": "FundTek Capital Group",
  "short_name": "FundTek",
  "description": "Fast Business Funding Solutions",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#85abe4",
  "icons": [
    {
      "src": "/logo-icon.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
EOF

cp dist/public/manifest.webmanifest dist/client/
cp dist/public/manifest.webmanifest server/public/

# Build verification
echo ""
echo "🔍 Build Verification:"
echo "======================"
if [ -f "dist/index.js" ]; then
    SERVER_SIZE=$(du -h dist/index.js | cut -f1)
    echo "✅ Server: dist/index.js ($SERVER_SIZE)"
else
    echo "❌ Server build failed"
    exit 1
fi

if [ -f "dist/client/index.html" ] && [ -f "dist/public/index.html" ]; then
    FRONTEND_SIZE=$(du -h dist/client/index.html | cut -f1)
    echo "✅ Frontend: dist/client/index.html ($FRONTEND_SIZE)"
    echo "✅ Static: dist/public/index.html ($FRONTEND_SIZE)"
else
    echo "❌ Frontend build failed"
    exit 1
fi

if [ -f "server/public/index.html" ]; then
    DEV_SIZE=$(du -h server/public/index.html | cut -f1)
    echo "✅ Development: server/public/index.html ($DEV_SIZE)"
else
    echo "❌ Development build failed"
    exit 1
fi

echo ""
echo "🎉 Fast Production Build Completed Successfully!"
echo "================================================"
echo ""
echo "📊 Build Summary:"
echo "  📄 Server Bundle: $SERVER_SIZE"
echo "  📄 Frontend Size: $FRONTEND_SIZE"
echo "  📁 Total Build: $(du -sh dist | cut -f1)"
echo ""
echo "🚀 Deployment Commands:"
echo "  Production Start: NODE_ENV=production node dist/index.js"
echo "  Or via npm: npm start"
echo ""
echo "✅ Ready for deployment to Replit or any cloud platform!"