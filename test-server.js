const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>FundTek Capital Group - Working</title>
      <style>
        body { 
          font-family: Arial; 
          text-align: center; 
          padding: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          margin: 0;
        }
        .status {
          background: rgba(255,255,255,0.2);
          padding: 30px;
          border-radius: 15px;
          margin: 20px auto;
          max-width: 600px;
        }
        .btn {
          background: #ff6b6b;
          color: white;
          padding: 15px 30px;
          text-decoration: none;
          border-radius: 5px;
          display: inline-block;
          margin: 10px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <h1>🎉 FundTek Capital Group</h1>
      <div class="status">
        <h2>✅ SUCCESS: Website is working!</h2>
        <p>Server connected on port ${process.env.PORT || 5000}</p>
        <p>Webview connectivity confirmed</p>
        <p>Ready for business funding applications</p>
      </div>
      
      <a href="https://form.jotform.com/251417715331047" target="_blank" class="btn">
        Apply for Business Funding
      </a>
      <a href="tel:305-307-4658" class="btn">
        Call (305) 307-4658
      </a>
      
      <div class="status">
        <h3>Business Funding Solutions</h3>
        <p>• Term Loans • Merchant Cash Advance</p>
        <p>• Equipment Financing • SBA Loans</p>
        <p>• Lines of Credit • Invoice Factoring</p>
      </div>
    </body>
    </html>
  `);
});

const port = parseInt(process.env.PORT || "5000");
app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 FundTek test server running on http://0.0.0.0:${port}`);
});