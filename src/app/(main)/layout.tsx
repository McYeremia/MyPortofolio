import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      {children}
    </>
  );
}
