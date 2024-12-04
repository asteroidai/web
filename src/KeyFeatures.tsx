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
    <section>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-center mb-12 text-white">Why It Matters</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="h-full transition-all duration-300 ease-in-out hover:shadow-lg bg-[#111132]/50 backdrop-blur-sm border-gray-800"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <CardHeader>
                  <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-white/5">
                    <feature.icon
                      className={`w-8 h-8 ${hoveredIndex === index ? 'text-white' : 'text-gray-400'
                        } transition-colors duration-300`}
                    />
                  </div>
                  <CardTitle className="text-xl mb-2 text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-400">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

