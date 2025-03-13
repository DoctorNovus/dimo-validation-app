import NavWrapper from "@/_components/Navigation/NavWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NavWrapper>
      {children}
    </NavWrapper>
  );
}
