import * as React from 'react'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight font-serif">
          Runtime Control for AI Agents
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mb-8 text-gray-300">
          Guide, correct, and progressively automate AI agent decisions.
        </p>
        <p className="text-lg sm:text-xl mb-12 text-gray-400 max-w-3xl mx-auto">
          Runtime Control for AI Agents enables you to dynamically oversee, guide, and correct your agents in real-time.
          As agents prove reliable, the platform adapts, progressively automating decisions while ensuring safety and alignment with your goals.
        </p>
        <Button size="lg" className="bg-white text-black hover:bg-gray-200 transition-colors">
          Try it<ArrowRight className="ml-2" size={20} />
        </Button>
      </div>

      {/* Integration steps */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4 text-sm sm:text-base">
        {['Wrap model client', 'Run the agent', 'Intervene in UI'].map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold mr-2">
              {index + 1}
            </div>
            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

