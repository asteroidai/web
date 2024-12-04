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
        <Card className="bg-gray-800 border-gray-700 mb-12">
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
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardContent className="p-4">
                <p className="text-gray-300">{item}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <h3 className="text-2xl mb-6">The Need for Advanced Supervision</h3>
        <Card className="bg-gray-800 border-gray-700 mb-12">
          <CardContent className="p-6 text-gray-300">
            <p>As we transition towards clusters of millions of agents performing critical tasks across the internet, traditional methods become unsustainable. It is imperative that those deploying agents in real-world scenarios have robust systems to supervise, evaluate, and ensure the reliability of their AI systems.</p>
          </CardContent>
        </Card>

        <h3 className="text-2xl mb-6">Key Challenges We Address</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {challenges.map((challenge, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
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

        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <p className="text-gray-300">
              Asteroid is building the foundation for a future where billions of AI agents can be deployed reliably, scalably, and safely in any context. Our goal is to ensure that as AI agents become integral to our digital infrastructure, we maintain control, understanding, and trust in their operations through rigorous supervision and evaluation.
            </p>
          </CardContent>
        </Card>
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

