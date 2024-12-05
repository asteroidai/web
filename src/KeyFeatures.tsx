import * as React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Zap, RefreshCw, UserCheck } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const features = [
  {
    icon: Shield,
    title: "Full Control, Zero Compromise",
    description: "Enjoy the benefits of autonomy in AI agents without the risk. Step in when needed, while agents perform independently when trusted."
  },
  {
    icon: Zap,
    title: "Enforce Policies with Precision",
    description: "Set clear boundaries for agent behavior and enforce them in real time. Ensure adherence to rules you define, from data access to ethical standards."
  },
  {
    icon: RefreshCw,
    title: "Continuous Evolution",
    description: "Bridge the gap between developers and domain experts, turning every interaction into an opportunity for improvement."
  },
  {
    icon: UserCheck,
    title: "Adaptive Learning for Safer Operations",
    description: "Enable agents to gradually take on more responsibility and make autonomous decisions without compromising safety."
  }
]

export function KeyFeatures() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-center mb-12 text-white font-bold font-['Source_Serif_4']">Key Features</h2>
        <p className="text-center text-gray-400 mb-12">
          How we're making agents safe, efficient, and ready for production use.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="relative bg-[#111132]/60 backdrop-blur-md border-none shadow-lg transition-transform transform hover:scale-105 hover:shadow-indigo-500/25"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardHeader className="p-12 space-y-8 text-center">
                  <div className="flex flex-col items-center gap-6">
                    <feature.icon
                      className={`w-12 h-12 ${hoveredIndex === index ? 'text-white' : 'text-gray-400'
                        } transition-colors duration-300`}
                    />
                    <CardTitle className="text-white font-bold tracking-tight font-['Source_Serif_4']">
                      {feature.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-gray-300">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

