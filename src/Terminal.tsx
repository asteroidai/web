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

export const Terminal = () => (
  <div className="rounded-lg overflow-hidden border border-gray-700 bg-[#1E1E1E] shadow-lg font-mono">
    {/* Terminal Header */}
    <div className="bg-[#2D2D2D] px-4 py-2 flex items-center gap-2">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="text-gray-400 text-sm ml-2 font-mono">example.ts</div>
    </div>

    {/* Terminal Content */}
    <Highlight
      theme={themes.nightOwl}
      code={codeBlock.trim()}
      language="typescript"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className="p-4 overflow-auto font-mono !font-mono text-sm" style={{ ...style, fontFamily: 'ui-monospace, monospace' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })} className="flex">
              <span className="text-gray-500 mr-4 select-none w-8 text-right font-mono">
                {i + 1}
              </span>
              <span className="font-mono">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} className="font-mono" />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  </div>
)

export default Terminal
