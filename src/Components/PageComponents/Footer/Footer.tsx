import * as React from "react";

import "./Footer.css";

export default function Footer() {
  let currentYear: any = new Date();

  currentYear = currentYear.getFullYear();

  return (
    <div className="footer">
      <p className="text-lg">© Copyright {currentYear} Kosovo Jobs™</p>
    </div>
  );
}
