import DimoInterface from "@/_components/DIMO/DimoInterface";
import NavWrapper from "@/_components/Navigation/NavWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DimoInterface>
      <NavWrapper>
        {children}
      </NavWrapper>
    </DimoInterface>
  );
}
