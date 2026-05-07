"use client";

import { useState } from "react";

export default function TestPage() {
  const [open, setOpen] = useState(false);
  return (


<nav
  style={{
    backgroundColor: "var(--navbar-background)",
    color: "var(--navbar-text)",
    borderBottom: "1px solid var(--navbar-border)",
  }}
>
  <div className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
    <div className="md:col-span-3">
      <div className="text-2xl font-semibold">Holtz<span style={{ color: "var(--primary)" }}>UI</span></div>
    </div>
    <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
      <a href="/" className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted text-sm font-medium">Home</a>
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted text-sm font-medium">Templates</a>
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted text-sm font-medium">Ui Kits</a>
      <a href="#" className="text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-md hover:bg-muted text-sm font-medium">Icons</a>
    </div>
    <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
      <button
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
          borderRadius: "var(--radius)",
        }}
        className="hidden md:block px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Login
      </button>
      <button
        style={{
          backgroundColor: "var(--secondary)",
          color: "var(--secondary-foreground)",
          borderRadius: "var(--radius)",
        }}
        className="hidden md:block px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Register
      </button>
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        aria-label="Toggle menu"
        onClick={() => setOpen(!open)}
      >
        <span className="block w-5 h-0.5" style={{ backgroundColor: "var(--navbar-text)" }} />
        <span className="block w-5 h-0.5" style={{ backgroundColor: "var(--navbar-text)" }} />
        <span className="block w-5 h-0.5" style={{ backgroundColor: "var(--navbar-text)" }} />
      </button>
    </div>
  </div>
  {open && (
    <div
      className="md:hidden border-t px-6 py-4 flex flex-col gap-4"
      style={{ borderColor: "var(--navbar-border)" }}
    >
      <a href="/" className="text-sm font-medium hover:opacity-70 transition-opacity">Home</a>
      <a href="#" className="text-sm font-medium hover:opacity-70 transition-opacity">Templates</a>
      <a href="#" className="text-sm font-medium hover:opacity-70 transition-opacity">Ui Kits</a>
      <a href="#" className="text-sm font-medium hover:opacity-70 transition-opacity">Icons</a>
      <div className="flex gap-2">
        <button
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            borderRadius: "var(--radius)",
          }}
          className="px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Login
        </button>
        <button
          style={{
            backgroundColor: "var(--secondary)",
            color: "var(--secondary-foreground)",
            borderRadius: "var(--radius)",
          }}
          className="px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Register
        </button>
      </div>
    </div>
  )}
</nav>
  );
}