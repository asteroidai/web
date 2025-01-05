import * as React from "react"
import Stars from "./Stars"
import Hero from "./Hero"
import { DeploymentSteps } from "./Process"
import { KeyFeatures } from "./KeyFeatures"
import Challenges from "./Challenges"
import Step123 from "./Step123"
import { InstallTabs } from "./Install"
import PricingSection from "./Pricing"
import Page from "./components/Page"

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Stars as background */}
      <div className="fixed inset-0 z-0">
        <Stars />
      </div>
      {/* Install Tabs */}
      <div className="fixed bottom-8 right-8 z-50 hidden xl:block">
        <InstallTabs />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col space-y-32 md:space-y-48 lg:space-y-64">
        <div className="container mx-auto">
          <Hero />
        </div>

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
    </div>
  )
}
