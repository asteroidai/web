import * as React from "react"
import { Monitor, Activity, Brain, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function DeploymentSteps() {
  const steps = [
    {
      title: "Monitor Your Agent",
      description: "Deploy your agent in monitoring mode. We'll detect and flag potential issues while your agent runs safely without interventions.",
      icon: <Monitor className="mr-2 text-blue-400" />
    },
    {
      title: "Active Control",
      description: "Once proven reliable, enable active control. Your agent can now operate autonomously with real-time safety interventions.",
      icon: <Activity className="mr-2 text-yellow-400" />
    },
    {
      title: "Continuous Learning",
      description: "Your agent improves with every interaction. Our platform learns from past decisions to reduce manual oversight over time.",
      icon: <Brain className="mr-2 text-purple-400" />
    }
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-center mb-12 text-white font-bold font-['Source_Serif_4']">
          Making your agent production ready
        </h2>
        {/* Subtitle */}
        <p className="text-center text-gray-400 mb-12">
          After integrating, you can deploy your agent safely and monitor its actions in real-time.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative bg-[#111132]/60 backdrop-blur-md border-none shadow-lg transition-transform transform hover:scale-105 hover:shadow-indigo-500/25">
              <CardHeader className="p-12 space-y-8">
                <CardTitle className="flex items-center text-white font-bold tracking-tight font-['Source_Serif_4']">
                  {step.icon}
                  {step.title}
                </CardTitle>
                <CardDescription className="text-gray-300">{step.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

