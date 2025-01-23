import * as React from "react"
import { Button } from "./components/ui/button"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

export const DemoButton: React.FC = () => {
  return (
    <div className="">
      <Link to="https://calendly.com/founders-asteroid-hhaf/30min">
        <Button
          size="lg"
          className={cn(
            "relative group",
            "before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-indigo-500 before:to-indigo-500",
            "before:opacity-100",
            "text-white",
            "transition-all duration-300",
            "hover:scale-105 active:scale-95",
            "shadow-lg shadow-indigo-500/25",
            "overflow-hidden"
          )}
        >
          <span className="relative z-10 flex items-center gap-2 font-semibold tracking-wide transition-all duration-700">
            Book a demo
            <img
              src="/favicon/favicon-32x32.png"
              alt="Asteroid Logo"
              className="w-6 h-6 group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out"
            />
          </span>
        </Button>
      </Link>
    </div>
  )
}
