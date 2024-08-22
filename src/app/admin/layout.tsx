import MainLayout from "../components/MainLayout";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      <div className="admin">{children}</div>
    </MainLayout>
  );
}
