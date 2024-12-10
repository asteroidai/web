import * as React from "react"
import { Monitor, Activity, Brain, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function DeploymentSteps() {
  const steps = [
    {
      title: "Monitor and Detect Failures",
      description: "Launch your agent with async monitoring - we detect and log issues while letting the agent run independently.",
      icon: <Monitor className="mr-2 text-blue-400" />
    },
    {
      title: "Enable Interventions",
      description: "Once confident, activate real-time supervision to prevent errors before they occur.",
      icon: <Activity className="mr-2 text-yellow-400" />
    },
    {
      title: "Reduce Oversight",
      description: "Your agent learns from each interaction, requiring fewer manual interventions over time.",
      icon: <Brain className="mr-2 text-purple-400" />
    }
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-center mb-12 text-white font-bold font-['Source_Serif_4']">
          From Passive Monitoring to Active Control
        </h2>
        {/* Subtitle */}
        <p className="text-center text-gray-400 mb-12">
          After integrating, you can deploy your agent safely and monitor its actions in real-time.
        </p>
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="relative bg-[#111132]/60 backdrop-blur-md h-full border-none shadow-lg transition-transform transform hover:scale-105 hover:shadow-indigo-500/25">
                <CardHeader className="p-6 space-y-8">
                  <CardTitle className="flex items-center text-white font-bold tracking-tight font-['Source_Serif_4']">
                    {step.icon}
                    {step.title}
                  </CardTitle>
                  <CardDescription className="text-gray-300">{step.description}</CardDescription>
                </CardHeader>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-7 transform -translate-y-1/2">
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

