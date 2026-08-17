import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { RouteGuard } from "@/components/auth/route-guard";
import { VerifyEmailBanner } from "@/components/dashboard/verify-email-banner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard>
      <div className="relative min-h-screen overflow-hidden bg-canvas">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/3 h-125 w-200 -translate-x-1/2 rounded-full bg-brand/10 blur-[140px]" />
          <div className="absolute -bottom-40 right-0 h-100 w-125 rounded-full bg-gold/5 blur-[140px]" />
        </div>

        <div className="relative">
          <Sidebar />
          <div className="md:pl-24">
            <Topbar />
            <main className="px-6 py-6">
              <VerifyEmailBanner />
              {children}
            </main>
          </div>
        </div>
      </div>
    </RouteGuard>
  );
}