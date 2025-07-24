import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import ReduxProvider from "../store/ReduxProvider";

export const metadata = {
  title: "Gentle Wheel | Car Rentle Website",
  description: "Gentle Wheel | Car Rentle Website",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ReduxProvider>
          <body>{children}</body>
        </ReduxProvider>
      </html>
    </ClerkProvider>
  );
}
