import * as React from "react"
import { useRef, useContext } from 'react'
import { useScroll, useTransform } from 'framer-motion'
import MeetingButton from "../MeetingButton"
import { UserContext } from "../contexts/UserContext"
// import { Badge } from "@/components/ui/badge"

export default function Challenges() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const { content } = useContext(UserContext)

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])

  const challenges = [
    {
      title: "Scale",
      description: "Agents operating at millions of requests per second",
      icon: "⚡"
    },
    {
      title: "Complexity",
      description: "Complex interactions with humans and other agents",
      icon: "🔄"
    },
    {
      title: "Integration",
      description: "Execution of arbitrary code and human tools",
      icon: "🔧"
    },
    {
      title: "Evolution",
      description: "Self-evolving and adapting during runtime",
      icon: "🔄"
    }
  ]

  return (
    <section ref={containerRef} className="px-6 text-white pb-64">
      <div className="text-center rounded-3xl backdrop-blur-sm space-y-4">
        <h2 className="text-3xl font-thin text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 ">
          <span className="font-['Source_Serif_4'] font-bold">Asteroid</span> is building the foundation for an agent-based future.
        </h2>
        {/* Subtitle */}
        <div className="space-y-8">
          <p className="text-gray-400 max-w-xl mx-auto">
            {content.outroDescription}
          </p>
          <div>
            <MeetingButton />
          </div>
        </div>

      </div>
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

