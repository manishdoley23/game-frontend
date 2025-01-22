export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <div className="w-full mx-auto space-y-8">{children}</div>
    </div>
  );
}
