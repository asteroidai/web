import * as React from "react"
import { useState } from "react"
import Stars from "@/Stars"
import Hero from "@/Hero"
import { DeploymentSteps } from "@/Process"
import { KeyFeatures } from "@/KeyFeatures"
import Challenges from "@/Challenges"
import Step123 from "@/Step123"
import { InstallTerminal } from "@/Install"
import PricingSection from "@/Pricing"

export default function App() {
  const [userType, setUserType] = useState<'developer' | 'business'>('developer')

  console.log("Rendering")

  return (
    <>
      <Stars />
      <div>
        <InstallTerminal />
        <Hero userType={userType} setUserType={setUserType} />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col space-y-32 md:space-y-48 lg:space-y-64">
        <div className="bg-[#0A0A1F] w-full flex flex-col space-y-24 md:space-y-32 lg:space-y-48">
          <div className="container max-w-6xl mx-auto">
            <Step123 />
          </div>
          <div className="container max-w-6xl mx-auto">
            <DeploymentSteps />
          </div>
          <div className="container max-w-6xl mx-auto">
            <KeyFeatures />
          </div>
          <div id="pricing" className="container max-w-6xl mx-auto">
            <PricingSection />
          </div>
          <div className="container max-w-6xl mx-auto">
          </div>
        </div>

        <Challenges />
      </div>
    </>
  )
}
