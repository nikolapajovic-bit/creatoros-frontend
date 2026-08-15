export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-125 w-200 -translate-x-1/2 rounded-full bg-brand/20 blur-[120px]" />
        <div className="absolute -bottom-40 right-0 h-100 w-125 rounded-full bg-gold/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="flex items-center justify-center">
          <img src="/logo-full.png" alt="CreatorOS" className="h-45 w-auto" />
        </div>
        {children}
      </div>
    </div>
  );
}