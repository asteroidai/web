import * as React from "react"
import { Highlight, themes } from "prism-react-renderer"

const codeBlock = `
import { AsteroidClient } from '@asteroid/client'

// Initialize the client
const asteroid = new AsteroidClient({
  apiKey: process.env.ASTEROID_API_KEY
})

// Wrap your model client
const model = asteroid.wrap(openai, {
  model: 'gpt-4',
  temperature: 0.7
})

// Run the agent with runtime control
const agent = await asteroid.agent.create({
  name: 'customer-support',
  model: model,
  tools: [searchDocs, updateTicket]
})

// Execute with supervision
const result = await agent.execute({
  task: 'Help resolve customer ticket #1234',
  supervision: {
    requireApproval: true,
    timeoutSeconds: 30
  }
})`

export const Terminal = () => {
  const [showModal, setShowModal] = React.useState(false)

  return (
    <>
      <div className="rounded-lg overflow-hidden border border-gray-700 bg-[#1E1E1E] shadow-lg">
        {/* Terminal Header */}
        <div className="bg-[#2D2D2D] px-4 py-2 flex items-center gap-2">
          <div className="flex gap-2">
            <div
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors"
              onClick={() => setShowModal(true)}
            ></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-gray-400 text-sm ml-2">example.ts</div>
        </div>

        {/* Terminal Content */}
        <Highlight
          theme={themes.nightOwl}
          code={codeBlock.trim()}
          language="typescript"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className="p-4 overflow-auto text-sm" style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="flex">
                  <span className="text-gray-500 mr-4 select-none w-8 text-right">
                    {i + 1}
                  </span>
                  <span>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>

      {/* Easter Egg Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#2D2D2D] p-6 rounded-lg shadow-xl max-w-md">
            <h3 className="text-xl text-white mb-4"></h3>
            <p className="text-gray-300 mb-4">
              {/* Easter chicken emoji */}
              🐣
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Terminal
