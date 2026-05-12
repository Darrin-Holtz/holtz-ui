import type { CSSProperties } from "react";

interface Props {
  productName: string;
  version: number;
}

export default function ProductUpdateEmail({ productName, version }: Props) {
  return (
    <html>
      <head>
        <title>{productName} has been updated</title>
      </head>
      <body style={bodyStyle}>
        <div style={containerStyle}>
          <p style={headingStyle}>New version available</p>
          <p style={paragraphStyle}>
            Good news — <strong>{productName}</strong> has been updated to{" "}
            <strong>v{version}</strong>.
          </p>
          <p style={paragraphStyle}>
            Sign in to HoltzDigitalUI and visit{" "}
            <strong>My Purchases</strong> to download the latest version.
          </p>
          <a
            href="https://holtzdigitalui.com/my-purchases"
            style={buttonStyle}
          >
            Go to My Purchases
          </a>
          <p style={footerStyle}>
            You received this because you purchased {productName} on HoltzDigitalUI.
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

const buttonStyle: CSSProperties = {
  display: "inline-block",
  backgroundColor: "#4f46e5",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 600,
  textDecoration: "none",
  padding: "12px 24px",
  borderRadius: "6px",
  margin: "8px 0 24px",
};

const footerStyle: CSSProperties = {
  color: "#9ca3af",
  fontSize: "12px",
  lineHeight: "20px",
  margin: "0",
};
