import * as React from 'react'
import { ArrowDown } from 'lucide-react'
import Terminal from './Terminal'
export default function Step123() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 pt-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-white font-['Source_Serif_4']">Integration Steps</h2>
      <div className="space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/25">
            1
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 text-white">Wrap your LLM client</h3>
            {/* <p className="text-gray-400">Add a few lines of code at the start of your agent execution</p> */}
          </div>
          <Terminal />
          <ArrowDown className="text-indigo-500 mt-4 mb-4" size={24} />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/25">
            2
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 text-white">Attach Supervisors for consequential agent actions</h3>
            <p className="text-gray-400">Supervisors can be from Asteroid or defined by you</p>
          </div>
          <Terminal code={step2Code} />
          <ArrowDown className="text-indigo-500 mt-4 mb-4" size={24} />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/25">
            3
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2 text-white">Run your agent in production and relax</h3>
            <p className="text-gray-400">Observe supervision results in the Sentinel interface and intervene when necessary</p>
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
