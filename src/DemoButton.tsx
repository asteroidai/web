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
            Get custom demo
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

export const PlatformButton: React.FC = () => {
  return (
    <div className="">
      <a href="https://platform.asteroid.ai">
        <Button
          variant="outline"
          size="lg"
          className={cn(
            "relative group",
            "border-indigo-500 text-indigo-500",
            "hover:bg-indigo-500/10 hover:text-indigo-400 hover:border-indigo-400",
            "transition-all duration-300",
            "hover:scale-105 active:scale-95",
            "shadow-sm",
            "overflow-hidden",
            "bg-transparent",
          )}
        >
          <span className="relative z-10 flex items-center gap-2 font-semibold tracking-wide transition-all duration-700">
            Start AI Agent
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform duration-300"
            >
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </span>
        </Button>
      </a>
    </div>
  )
}
