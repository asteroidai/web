import * as React from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import Nav from './Nav'

export default function Hero() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white">
      <Nav />
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-thin font-['Source_Sans_Pro'] !important mb-6 tracking-tight">
          Runtime Control for AI Agents
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-300 !font-['Source_Sans_Pro']">
          Guide, correct, and progressively automate AI agent decisions.
        </p>
        <p className="text-base sm:text-lg lg:text-xl mb-12 text-gray-400 max-w-3xl mx-auto !font-['Source_Sans_Pro']">
          Runtime Control for AI Agents enables you to dynamically oversee, guide, and correct your agents in real-time.
          As agents prove reliable, the platform adapts, progressively automating decisions while ensuring safety and alignment with your goals.
        </p>
        <Button size="lg" className="bg-white text-black hover:bg-gray-200 transition-colors !font-['Source_Sans_Pro']">
          Try it<ArrowRight className="ml-2" size={20} />
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 py-4 mt-32">
        <img src="/y.png" alt="Y Combinator Logo" className="h-4" />
        <span className="text-sm text-muted-foreground font-sans">Backed by Y Combinator</span>
      </div>

      {/* Integration steps */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4 text-sm sm:text-base !font-['Source_Sans_Pro']">
        {['Wrap model client', 'Run the agent', 'Intervene in UI'].map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold mr-2 !font-['Source_Sans_Pro']">
              {index + 1}
            </div>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

