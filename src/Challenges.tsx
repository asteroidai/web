import * as React from "react"
import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"

export default function Challenges() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const challenges = [
    "Comprehensive Supervision",
    "Advanced Simulation",
    "Continuous Evaluation",
    "Regression Testing"
  ]

  const landscape = [
    "Agents operating at millions of requests per second",
    "Complex interactions with humans and other agents",
    "Execution of arbitrary code and human tools",
    "Self-evolving and adapting during runtime"
  ]

  return (
    <section ref={containerRef} className="py-24 text-white min-h-screen">
      <motion.div style={{ opacity, scale }} className="container mx-auto px-4">
        <h2 className="text-4xl text-center mb-12">The Challenge</h2>
        <Card className="bg-[#111132]/50 backdrop-blur-sm border-gray-800 mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-white">How do we ensure reliable and effective AI agent deployment at scale?</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <p>We are rapidly approaching a future where AI agents will be integrated into every service and company, with billions of agents operating autonomously. This paradigm shift presents unprecedented challenges that current supervision techniques are ill-equipped to handle.</p>
          </CardContent>
        </Card>

        <h3 className="text-2xl mb-6">The Emerging Landscape</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {landscape.map((item, index) => (
            <Card key={index} className="bg-[#111132]/50 backdrop-blur-sm border-gray-800">
              <CardContent className="p-4">
                <p className="text-gray-300">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h3 className="text-2xl mb-6">The Need for Advanced Supervision</h3>
        <Card className="bg-[#111132]/50 backdrop-blur-sm border-gray-800 mb-12">
          <CardContent className="p-6 text-gray-300">
            <p>As we transition towards clusters of millions of agents performing critical tasks across the internet, traditional methods become unsustainable. It is imperative that those deploying agents in real-world scenarios have robust systems to supervise, evaluate, and ensure the reliability of their AI systems.</p>
          </CardContent>
        </Card>

        <h3 className="text-2xl mb-6">Key Challenges We Address</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {challenges.map((challenge, index) => (
            <Card key={index} className="bg-[#111132]/50 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white">{challenge}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  {getChallengeDescription(challenge)}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-12 py-36 rounded-3xl backdrop-blur-sm">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
            Asteroid is building the foundation for an agent-based future.
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto px-6">
            As billions of AI agents become woven into the fabric of our digital world,
            the need for robust supervision isn't just a technical challenge—it's an
            imperative for humanity's safe transition into an AI-native future.
          </p>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto px-6 font-semibold">
            Asteroid is laying the groundwork for this future, ensuring that every
            AI agent deployment is reliable, controllable, and aligned with human values.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

function getChallengeDescription(challenge: string): string {
  switch (challenge) {
    case "Comprehensive Supervision":
      return "Lack of effective solutions for real-time monitoring and control of AI agent actions at scale"
    case "Advanced Simulation":
      return "Insufficient tools for simulating complex scenarios to test agent behavior before deployment"
    case "Continuous Evaluation":
      return "Difficulty in implementing ongoing, automated evaluation of deployed agents to maintain performance and safety"
    case "Regression Testing":
      return "Lack of robust systems for ensuring that agent improvements don't introduce new failure modes"
    default:
      return ""
  }
}

