import * as React from "react"
import { useState } from "react"
import Hero from "@/Hero"
import { DeploymentSteps } from "@/Process"
import { KeyFeatures } from "@/KeyFeatures"
import Challenges from "@/Challenges"
import Step123 from "@/Step123"
import { InstallTerminal } from "@/Install"
import Pricing from "@/Pricing"
import Stars2 from "./Stars2"
import Form from "./Form"

export default function App() {
  return (
    <>
      <Stars2 />
      <InstallTerminal />
      <Hero />

      {/* Main content */}
      <div className="relative w-full flex flex-col space-y-24 md:space-y-48 lg:space-y-64 pt-32">
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
