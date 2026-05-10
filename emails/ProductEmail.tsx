import type { CSSProperties } from "react";

export default function ProductEmail({ link }: { link: string }) {
  return (
    <html>
      <head>
        <title>Your product is here...</title>
      </head>
      <body style={bodyStyle}>
        <div style={containerStyle}>
          <p style={headingStyle}>Hi Friend,</p>
          <p style={paragraphStyle}>Thank you for buying your product at HoltzUI</p>
          <div style={buttonWrapStyle}>
            <a href={link} style={buttonStyle}>
              Your Download Link
            </a>
          </div>
          <p style={paragraphStyle}>
            Best,
            <br />
            HoltzUI Team
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

const buttonWrapStyle: CSSProperties = {
  margin: "28px 0",
};

const buttonStyle: CSSProperties = {
  display: "inline-block",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  padding: "12px 20px",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: 600,
};
