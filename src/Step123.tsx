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
      <h2 className="text-3xl font-bold text-center mb-8 text-white font-['Source_Serif_4']">Integration Steps</h2>

      {/* Horizontal Steps */}
      <div className="flex justify-center items-center gap-4">
        <div className="flex flex-col items-center">
          <button
            onClick={() => scrollToTerminal(terminal1Ref)}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-indigo-500/25 hover:scale-110 transition-transform"
          >
            1
          </button>
          <p className="text-sm text-gray-400 mt-2">Wrap Client</p>
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
          <p className="text-sm text-gray-400 mt-2">Deploy</p>
        </div>
      </div>

      <div className="space-y-16">
        {/* Step 1 */}
        <div ref={terminal1Ref} className="flex items-stretch gap-8">
          <div className="w-1/5 flex flex-col items-center justify-center text-center">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-4">
              1
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Wrap your LLM client</h3>
            <p className="text-sm text-gray-400">Add a few lines of code at the start of your agent execution</p>
          </div>
          <div className="w-4/5">
            <Terminal />
          </div>
        </div>

        {/* Step 2 */}
        <div ref={terminal2Ref} className="flex items-stretch gap-8">
          <div className="w-1/5 flex flex-col items-center justify-center text-center">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-4">
              2
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Attach Supervisors</h3>
            <p className="text-sm text-gray-400">Add safety checks to protect sensitive operations</p>
          </div>
          <div className="w-4/5">
            <Terminal code={step2Code} />
          </div>
        </div>

        {/* Step 3 */}
        <div ref={terminal3Ref} className="flex items-stretch gap-8">
          <div className="w-1/5 flex flex-col items-center justify-center text-center">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-4">
              3
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Deploy & Monitor</h3>
            <p className="text-sm text-gray-400">Run your agent with confidence and monitor its actions in real-time</p>
          </div>
          <div className="w-4/5">
            {/* Empty div to maintain layout - could add a terminal or other content later */}
          </div>
        </div>
      </div>

      <p className="text-center mt-8 text-gray-400">
        Complete integration in less than 2 minutes
      </p>
    </div>
  )
}

const step2Code = `
# Simplified example of supervision on a database_modify tool call
from asteroid_sdk.supervision import human_supervisor

# Define arbitrary custom supervisors to protect the world from your agent
def my_supervisor():
    """Human supervisor for reviewing actions."""
    def human_supervisor(action, context):
        # If the text contains "delete" or "update"
        if "DELETE" in action.content or "UPDATE" in action.content:
            return REJECT
        return APPROVE
    return human_supervisor

# Wrap functions that the agent can call with custom or built-in supervisors
@supervise(human_supervisor())
def database_modify(query: str):
    """Modify the database."""
`
