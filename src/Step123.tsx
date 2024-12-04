import * as React from 'react'
import { ArrowDown } from 'lucide-react'

interface Step {
  title: string
  subtitle: string
}

const steps: Step[] = [
  {
    title: "Wrap the model client",
    subtitle: "Add supervision decorators to tool calls"
  },
  {
    title: "Run the agent",
    subtitle: "Execute your AI agent with the added supervision"
  },
  {
    title: "Monitor and intervene",
    subtitle: "See results in the UI and intervene when necessary"
  }
]

export default function Step123() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">Integration Steps</h2>
      <div className="space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/25">
              {index + 1}
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-400">{step.subtitle}</p>
            </div>
            {index < steps.length - 1 && (
              <ArrowDown className="text-indigo-500 mt-4 mb-4" size={24} />
            )}
          </div>
        ))}
      </div>
      <p className="text-center mt-8 text-gray-400">
        Complete integration in less than 2 minutes
      </p>
    </div>
  )
}

