import * as React from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from 'lucide-react'
import { cn } from "@/lib/utils"
import Nav from './Nav'
import { InstallTabs } from './Install'
import Step123 from './Step123'

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white/70">
      <Nav />
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-6 tracking-tight font-bold font-['Source_Serif_4']">
          Make your AI agent production ready.
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-300">
          Guide, correct, and progressively improve AI agent decision making.
        </p>
        <p className="text-base sm:text-lg lg:text-xl mb-12 text-gray-400 max-w-3xl mx-auto">
          Asteroid’s SDK and web interface help dynamically oversee, guide, and correct your agents in real-time
        </p>
        <Button
          size="lg"
          className={cn(
            "relative group",
            "before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-r before:from-indigo-500 before:to-purple-500",
            "before:opacity-100",
            "text-white",
            "transition-all duration-300",
            "hover:scale-105 active:scale-95",
            "shadow-lg shadow-indigo-500/25",
            "overflow-hidden"
          )}
        >
          <span className="relative z-10 flex items-center font-bold tracking-wide">
            Try it
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
          </span>
        </Button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 w-full flex justify-center">
        <ChevronDown size={32} className="text-white/50 hover:text-white/70 transition-colors cursor-pointer animate-bounce" />
      </div>

    </div>
  )
}

