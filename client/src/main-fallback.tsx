// Emergency fallback - renders FundTek directly to DOM
const fundtekHTML = `
<div style="font-family: Arial, sans-serif;">
  <div style="position: fixed; top: 0; width: 100%; background: rgba(0,0,0,0.9); color: white; padding: 15px 0; z-index: 1000;">
    <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 20px;">
      <div style="font-size: 24px; font-weight: bold; color: #85abe4;">FundTek Capital Group</div>
      <a href="https://form.jotform.com/251417715331047" target="_blank" style="background: #85abe4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Apply Now</a>
    </div>
  </div>
  
  <div style="height: 100vh; background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), #f0f8ff; display: flex; align-items: center; justify-content: center; text-align: center; color: white;">
    <div>
      <h1 style="font-size: 3.5rem; margin-bottom: 1rem; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">Flexible Financing for Every Industry</h1>
      <p style="font-size: 1.5rem; margin-bottom: 2rem;">Get working capital in 24 hours with competitive rates</p>
      <a href="https://form.jotform.com/251417715331047" target="_blank" style="background: #85abe4; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px; margin-right: 15px;">Get Approved Today</a>
      <a href="tel:+13053074658" style="background: transparent; color: white; border: 2px solid white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-size: 18px;">Call (305) 307-4658</a>
    </div>
  </div>
  
  <div style="padding: 60px 20px; background: white;">
    <div style="max-width: 1200px; margin: 0 auto; text-align: center;">
      <h2 style="font-size: 2.5rem; margin-bottom: 3rem; color: #333;">Our Financing Solutions</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
        <div style="background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 2px solid #85abe4;">
          <h3 style="color: #85abe4; margin-bottom: 1rem;">Term Loans</h3>
          <p>Traditional fixed-rate business loans with predictable monthly payments.</p>
        </div>
        <div style="background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 2px solid #85abe4;">
          <h3 style="color: #85abe4; margin-bottom: 1rem;">Lines of Credit</h3>
          <p>Flexible access to capital when you need it most.</p>
        </div>
        <div style="background: white; padding: 2rem; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border: 2px solid #85abe4;">
          <h3 style="color: #85abe4; margin-bottom: 1rem;">SBA Loans</h3>
          <p>Government-backed loans with competitive rates and terms.</p>
        </div>
      </div>
    </div>
  </div>
  
  <div style="background: #85abe4; color: white; padding: 60px 20px;">
    <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; text-align: center;">
      <div><h3 style="font-size: 3rem; margin-bottom: 0.5rem;">50+</h3><p style="font-size: 1.2rem;">Expert Specialists</p></div>
      <div><h3 style="font-size: 3rem; margin-bottom: 0.5rem;">12</h3><p style="font-size: 1.2rem;">Financing Solutions</p></div>
      <div><h3 style="font-size: 3rem; margin-bottom: 0.5rem;">$20M</h3><p style="font-size: 1.2rem;">Maximum Funding</p></div>
      <div><h3 style="font-size: 3rem; margin-bottom: 0.5rem;">24 hrs</h3><p style="font-size: 1.2rem;">Average Approval</p></div>
    </div>
  </div>
  
  <div style="background: #333; color: white; padding: 40px 20px; text-align: center;">
    <p>&copy; 2025 FundTek Capital Group. All rights reserved.</p>
    <p>Fast, flexible business funding solutions for growing businesses.</p>
  </div>
</div>
`;

// Try React first, fallback to direct HTML
try {
  const { createRoot } = await import("react-dom/client");
  const { default: App } = await import("./App");
  
  const rootElement = document.getElementById("root");
  if (rootElement) {
    const root = createRoot(rootElement);
    root.render(React.createElement(App));
    console.log("React loaded successfully");
  } else {
    throw new Error("Root element not found");
  }
} catch (error) {
  console.log("Using fallback rendering", error);
  document.getElementById("root")!.innerHTML = fundtekHTML;
}