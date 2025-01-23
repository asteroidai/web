import * as React from "react"
import { useState } from "react"
import Hero from "@/sections/Hero"
import Challenges from "@/sections/OutroSection"
import Step123 from "@/sections/TabsSection"
import { InstallTerminal } from "@/Install"
import Pricing from "@/sections/PricingSection"
import Stars2 from "./Stars2"
import Form from "./sections/Form"

export default function App() {
  return (
    <>
      <Stars2 />
      <InstallTerminal />
      <Hero />

      {/* Main content */}
      <div className="relative w-full flex flex-col space-y-32 md:space-y-48 lg:space-y-64 pt-32">
        <Step123 />
        <Pricing />
        <Form />
        <Challenges />
      </div>
    </>
  )
}

// <div className="container max-w-6xl mx-auto">
//   <DeploymentSteps />
// </div>
// <div className="container max-w-6xl mx-auto">
//   <KeyFeatures />
// </div>
// <div className="container max-w-6xl mx-auto">
// </div>
