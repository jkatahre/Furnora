import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FloatingWhatsApp, MobileContactBar } from "../components/ContactBar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { EnquiryProvider } from "../context/EnquiryContext";

/** Scrolls to the top when the page changes, or to the #section in the URL. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

export default function MainLayout() {
  const { pathname } = useLocation();
  // Product pages show their own sticky bar with the price.
  const onProductPage = pathname.startsWith("/products/");

  return (
    <EnquiryProvider>
      <div className="flex min-h-screen flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <ScrollToTop />
        <Header />
        <main id="main" className="flex-1">
          <Outlet />
        </main>
        <Footer />
        {!onProductPage && <MobileContactBar />}
        <FloatingWhatsApp />
      </div>
    </EnquiryProvider>
  );
}
