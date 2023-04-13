import Link from "next/link";
import { Squeeze as Hamburger } from "hamburger-react";
import { NavItem } from "@/components/navItem";
import { useIsMD } from "@/lib/mediaQuery";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
export function Navigation() {
  const isMD = useIsMD();
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    if (isMD) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isMD]);

  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 40) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <div
      className={[
        "transition-all duration-250 sticky top-0 flex justify-between items-center relative z-50 lg:px-10 px-6",
        scrolled
          ? "backdrop-filter backdrop-blur-sm bg-slate-900/30 py-2 mb-[44px]"
          : "lg:py-8 py-5 mb-0",
      ].join(" ")}
    >
      <Link
        href={"/"}
        className={[
          "z-20 underline_animated uppercase tracking-very-wide font-bold transition-all duration-250",
          scrolled ? "text-sm" : "sm:text-lg text-base",
        ].join(" ")}
      >
        Ecstatic Dance <span className={"font-normal text-sm"}>.nl</span>
      </Link>

      <AnimatePresence>
        {(isMD || (!isMD && isOpen)) && (
          <motion.nav
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -200 }}
            className={
              "absolute md:relative z-10 md:w-auto w-full md:bg-transparent bg-blue-950 left-0 top-0 md:h-auto h-screen lg:gap-8 gap-4 tracking-wider flex md:flex-row flex-col justify-center items-center"
            }
          >
            {!isMD && <NavItem href={"/"}>Home</NavItem>}
            <NavItem href={"/over"}>Introductie</NavItem>
            <NavItem href={"/locaties"}>Locaties</NavItem>
            <NavItem href={"/agenda"}>Agenda</NavItem>
          </motion.nav>
        )}
      </AnimatePresence>
      {!isMD && (
        <div className={"z-20 relative"}>
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </div>
      )}
    </div>
  );
}
