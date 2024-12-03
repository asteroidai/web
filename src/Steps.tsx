import * as React from "react"
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export function DeploymentSteps() {
  const steps = [
    {
      title: "Initial Deployment (Monitoring Mode)",
      description: "The system operates in monitoring mode — no interventions are made. It detects and flags failure modes, allowing users to review and fix the agent."
    },
    {
      title: "Secondary Deployment (Active Control Mode)",
      description: "Once the agent demonstrates reliability, the system transitions to active control mode, where it can automatically intervene in real-time to correct actions."
    },
    {
      title: "Adaptive Learning",
      description: "The platform continuously learns from every interaction, improving its decision-making and gradually reducing the need for manual oversight."
    }
  ]

  return (
    <section className="font-sans">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Deployment Process</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative bg-[#111132]/50 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <CheckCircle className="mr-2 text-green-400" />
                  Step {index + 1}
                </CardTitle>
                <CardDescription className="text-gray-300">{step.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{step.description}</p>
              </CardContent>
              {index < steps.length - 1 && (
                <ArrowRight className="absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-400 hidden md:block" />
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

