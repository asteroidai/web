import * as React from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import Terminal from './Terminal'

export default function Step123() {
  const terminal1Ref = React.useRef<HTMLDivElement>(null)
  const terminal2Ref = React.useRef<HTMLDivElement>(null)
  const terminal3Ref = React.useRef<HTMLDivElement>(null)

  const scrollToTerminal = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pt-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-center text-white">Integration Steps</h2>
        <p className="text-lg text-center mb-8 text-gray-600">Up and running in 5 minutes</p>
      </div>

      {/* Horizontal Steps - Updated container */}
      <div className="flex justify-center items-center gap-4 mx-auto">
        <div className="flex flex-col items-center">
          <button
            onClick={() => scrollToTerminal(terminal1Ref)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-indigo-500/25 hover:scale-110 transition-transform"
          >
            1
          </button>
          <p className="text-sm text-gray-400 mt-2">Wrap LLM Client</p>
        </div>

        <ArrowRight className="text-indigo-500 w-8 h-8" />

        <div className="flex flex-col items-center">
          <button
            onClick={() => scrollToTerminal(terminal2Ref)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-indigo-500/25 hover:scale-110 transition-transform"
          >
            2
          </button>
          <p className="text-sm text-gray-400 mt-2">Add Supervisors</p>
        </div>

        <ArrowRight className="text-indigo-500 w-8 h-8" />

        <div className="flex flex-col items-center">
          <button
            onClick={() => scrollToTerminal(terminal3Ref)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-indigo-500/25 hover:scale-110 transition-transform"
          >
            3
          </button>
          <p className="text-sm text-gray-400 mt-2">Deploy & Monitor</p>
        </div>
      </div>

      <div className="space-y-32">
        {/* Step 1 */}
        <div ref={terminal1Ref} className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="md:w-1/5 flex flex-col items-center justify-center text-center mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Wrap your LLM client</h3>
            <p className="text-sm text-gray-400">Add a few lines of code at the start of your agent execution</p>
          </div>
          <div className="md:w-4/5 max-w-[600px]">
            <Terminal code={step1Code} />
          </div>
        </div>

        {/* Step 2 */}
        <div ref={terminal2Ref} className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="md:w-1/5 flex flex-col items-center justify-center text-center mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Attach Supervisors</h3>
            <p className="text-sm text-gray-400">Add safety checks to protect sensitive operations</p>
          </div>
          <div className="md:w-4/5 max-w-[600px]">
            <Terminal code={step2Code} />
          </div>
        </div>

        {/* Step 3 */}
        <div ref={terminal3Ref} className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="md:w-1/5 flex flex-col items-center text-center mb-4 md:mb-0">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Deploy & Monitor</h3>
            <p className="text-sm text-gray-400">Run your agent with confidence and monitor its actions in real-time</p>
          </div>
          <div className="w-full md:w-4/5 max-w-[600px]">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/X38hhugtRLg?si=NyqhPqHsrmBG-3dp&modestbranding=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const step2Code = `
# Wrap agent functions with custom/built-in supervisors
@supervise(human_supervisor())
def database_modify(query: str):
    """Modify the database."""
`
const step1Code = `

# Initialize Asteroid
run_id = asteroid_init()

# Wrap your favourite LLM client
client = asteroid_openai_client(OpenAI(), run_id)
`
