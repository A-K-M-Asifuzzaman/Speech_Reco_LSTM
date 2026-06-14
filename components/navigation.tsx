"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, Home, Mic, LayoutDashboard, Info, Menu, X, Github, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/predict", label: "Predict", icon: Mic },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/about", label: "About", icon: Info },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileMenuOpen])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-card-strong border-b border-border/40 shadow-[0_4px_30px_oklch(0_0_0/0.5)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setMobileMenuOpen(false)}>
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="relative p-2 rounded-xl bg-primary/10 border border-primary/25 group-hover:border-primary/55 group-hover:bg-primary/18 transition-all duration-300 overflow-hidden"
              >
                <Brain className="w-5 h-5 text-primary relative z-10" />
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: "radial-gradient(circle, oklch(0.76 0.20 195 / 0.2) 0%, transparent 70%)" }}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
              </motion.div>
              <div className="flex items-baseline">
                <span className="font-bold text-lg tracking-tight text-foreground">Emoti</span>
                <span className="font-bold text-lg tracking-tight text-primary">Voice</span>
                <span className="ml-1.5 text-[9px] font-bold tracking-widest uppercase text-muted-foreground border border-border/60 rounded px-1.5 py-0.5 hidden sm:inline">
                  AI
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      className={cn(
                        "relative px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors duration-200",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 bg-primary/10 border border-primary/22 rounded-lg"
                          style={{ boxShadow: "0 0 14px oklch(0.76 0.20 195 / 0.14)" }}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
                        />
                      )}
                      <Icon className="w-3.5 h-3.5 relative z-10 shrink-0" />
                      <span className="relative z-10">{item.label}</span>
                    </motion.div>
                  </Link>
                )
              })}
            </div>

            {/* Desktop right side */}
            <div className="hidden md:flex items-center gap-2">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: "oklch(0.76 0.20 195)" }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <Link href="/predict">
                <motion.div
                  whileHover={{ scale: 1.04, boxShadow: "0 0 22px oklch(0.76 0.20 195 / 0.45)" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold cursor-pointer transition-all duration-200"
                >
                  Try Now
                  <ExternalLink className="w-3 h-3" />
                </motion.div>
              </Link>
            </div>

            {/* Mobile toggle */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.88 }}
              className="md:hidden relative w-9 h-9 rounded-lg flex items-center justify-center hover:bg-secondary/70 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-background/75 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-[300px] glass-card-strong border-l border-border/35 z-50 md:hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-border/30">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                <span className="font-bold">Menu</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-secondary/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Nav items */}
            <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6 space-y-1.5">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.href}
                    initial={{ x: 24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.06, duration: 0.35 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-200 group",
                        isActive
                          ? "bg-primary/14 text-primary border border-primary/25"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                        isActive ? "bg-primary/20" : "bg-secondary/60 group-hover:bg-secondary"
                      )}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="ml-auto w-2 h-2 rounded-full bg-primary"
                          style={{ boxShadow: "0 0 8px oklch(0.76 0.20 195)" }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Footer */}
            <div className="px-4 pb-6 space-y-3 border-t border-border/30 pt-4">
              <Link href="/predict" onClick={() => setMobileMenuOpen(false)}>
                <motion.div
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold transition-all"
                  style={{ boxShadow: "0 0 20px oklch(0.76 0.20 195 / 0.3)" }}
                >
                  <Mic className="w-4 h-4" />
                  Try Prediction
                </motion.div>
              </Link>
              <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                <span>Powered by LSTM Neural Networks</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
