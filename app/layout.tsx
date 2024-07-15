import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CarePulse",
  description:
    "A healthcare patient management System designed to streamline patient registration, appointment scheduling, and medical records management for healthcare providers.",
  icons: {
    icon: "/assets/icons/logo-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-dark-300 font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>

        <Script id="google-translate-1" type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit">
</Script>

<Script id="google-translate" strategy="afterInteractive">{`

function googleTranslateElementInit() {
  new google.translate.TranslateElement({
          pageLanguage: 'en'
      },
      'google_translate_element'
  );
}
window.location.hash='#googtrans('+navigator.language.split("-")[0]+')';`}
</Script> 

<Script id="tawk-to" strategy="afterInteractive">
            {`
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/66959885becc2fed692550e2/1i2s5nj9o';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
            `}
          </Script>
      </body>
    </html>
  );
}
