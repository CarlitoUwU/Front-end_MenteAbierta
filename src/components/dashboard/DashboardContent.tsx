
export default function DashboardContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="p-8 flex flex-col gap-6">
      {children}
    </main>
  );
}
