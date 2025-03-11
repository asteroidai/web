import * as React from 'react'
import Typewriter from 'typewriter-effect'
import Section from './Section'
import { Button } from '../components/ui/button'

export default function FormButton() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* “Input” box with prefilled answers using a typewriter effect */}
      {/* <div className="w-full max-w-xl">
        <div className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-md">
          <Typewriter
            options={{
              loop: true,
              delay: 50,
              deleteSpeed: 30,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString('I need an agent to automate text input across multiple systems.')
                .pauseFor(1500)
                .deleteAll()
                .typeString("I'm looking to streamline repetitive tasks with automation.")
                .pauseFor(1500)
                .deleteAll()
                .typeString('I want to reduce manual entry errors significantly.')
                .pauseFor(1500)
                .deleteAll()
                .typeString('Automate complex browser workflows for my business.')
                .pauseFor(1500)
                .deleteAll()
                .start();
            }}
          />
        </div>
      </div> */}

      {/* Button linking to hey.asteroid.ai */}
      <a
        href="http://hey.asteroid.ai"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          size="lg"
          className={`
              relative group before:absolute before:inset-0 before:rounded-md 
              before:bg-gradient-to-r before:from-indigo-500 before:to-purple-500 
              before:opacity-10 bg-gradient-to-r from-indigo-500 to-purple-500 
              border border-indigo-500/50 transition-all duration-300 
              hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25 
              overflow-hidden font-bold
            `}
        >
          Get Started
        </Button>
      </a>
    </div>
  );
}

