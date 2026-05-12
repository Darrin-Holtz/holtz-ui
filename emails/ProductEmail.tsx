import type { CSSProperties } from "react";

export default function ProductEmail() {
  return (
    <html>
      <head>
        <title>Your product is here...</title>
      </head>
      <body style={bodyStyle}>
        <div style={containerStyle}>
          <p style={headingStyle}>Hi Friend,</p>
          <p style={paragraphStyle}>Thank you for buying your product at HoltzDigitalUI!</p>
          <p style={paragraphStyle}>
            Your purchase is ready to download. Click your avatar in the top-right
            corner of HoltzDigitalUI and select <strong>My Purchases</strong> from the dropdown menu.
          </p>
          <p style={paragraphStyle}>
            Best,
            <br />
            HoltzDigitalUI Team
          </p>
        </div>
      </body>
    </html>
  );
}

const bodyStyle: CSSProperties = {
  backgroundColor: "#ffffff",
  fontFamily: "Arial, sans-serif",
  margin: 0,
  padding: "24px",
};

const containerStyle: CSSProperties = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const headingStyle: CSSProperties = {
  fontSize: "24px",
  fontWeight: 600,
  margin: "0 0 16px",
};

const paragraphStyle: CSSProperties = {
  color: "#4b5563",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
};


