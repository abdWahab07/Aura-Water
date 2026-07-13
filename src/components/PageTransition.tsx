"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

type PageTransitionContextValue = {
  /** Call when navigating to another page (navbar / menu links). */
  startNavigation: (href?: string) => void;
  isLoading: boolean;
};

const PageTransitionContext = createContext<PageTransitionContextValue>({
  startNavigation: () => {},
  isLoading: false,
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

function resolvePath(href: string) {
  try {
    return new URL(href, window.location.origin).pathname;
  } catch {
    return href.split("?")[0].split("#")[0];
  }
}

function PageLoader() {
  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1b4ef5]"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-52 w-52 items-center justify-center md:h-60 md:w-60"
      >
        {/* Spinner ring around the logo */}
        <div
          className="absolute inset-0 animate-spin rounded-full border-[3px] border-white/20 border-t-white"
          aria-hidden
        />

        <Image
          src="/assets/logo.png"
          alt="Aura Water"
          width={1024}
          height={1536}
          priority
          className="h-36 w-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)] md:h-44"
        />
      </motion.div>
    </motion.div>
  );
}

const MIN_LOADER_MS = 700;

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const pendingRef = useRef(false);
  const startTimeRef = useRef(0);
  const prevPathRef = useRef(pathname);

  const startNavigation = useCallback(
    (href?: string) => {
      if (href) {
        if (href.startsWith("#")) return;
        const nextPath = resolvePath(href);
        if (nextPath === pathname) return;
      }

      pendingRef.current = true;
      startTimeRef.current = Date.now();
      setContentVisible(false);
      setIsLoading(true);
    },
    [pathname],
  );

  useEffect(() => {
    if (pathname === prevPathRef.current) return;
    prevPathRef.current = pathname;

    const finish = () => {
      pendingRef.current = false;
      setIsLoading(false);
      // Brief beat so the loader exit and content enter don't overlap harshly.
      requestAnimationFrame(() => setContentVisible(true));
    };

    if (!pendingRef.current) {
      // Browser back/forward or external nav — still animate content in.
      setContentVisible(false);
      const t = setTimeout(() => {
        setIsLoading(false);
        setContentVisible(true);
      }, 80);
      return () => clearTimeout(t);
    }

    const elapsed = Date.now() - startTimeRef.current;
    const remaining = Math.max(0, MIN_LOADER_MS - elapsed);
    const t = setTimeout(finish, remaining);
    return () => clearTimeout(t);
  }, [pathname]);

  // Safety: never leave the loader stuck if navigation is cancelled.
  useEffect(() => {
    if (!isLoading) return;
    const t = setTimeout(() => {
      pendingRef.current = false;
      setIsLoading(false);
      setContentVisible(true);
    }, 8000);
    return () => clearTimeout(t);
  }, [isLoading]);

  // Lock scroll while the loader is showing.
  useEffect(() => {
    if (!isLoading) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isLoading]);

  return (
    <PageTransitionContext.Provider value={{ startNavigation, isLoading }}>
      <AnimatePresence>{isLoading && <PageLoader />}</AnimatePresence>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={
          contentVisible && !isLoading
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 20 }
        }
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </PageTransitionContext.Provider>
  );
}
