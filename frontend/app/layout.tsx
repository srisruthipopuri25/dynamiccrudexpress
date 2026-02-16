import "./globals.css";

export const metadata = {
  title: "User CRUD App",
  description: "Config-driven MERN CRUD"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
