import "./globals.css";
import Nav from "@/componenets/Nav";

export const metadata = {
  title: "ChatGpt Api Poc",
  description: "Kevins ChatGpt Api Poc",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
