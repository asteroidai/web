import * as React from "react"
import { Highlight, themes } from "prism-react-renderer"
import { CopyIcon, CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

const defaultCode = ``

interface TerminalProps {
  code?: string
  filename?: string
  language?: string
  lineNumbers?: boolean
  copyButton?: boolean
  width?: string | number
}

export const Terminal: React.FC<TerminalProps> = ({
  code = defaultCode,
  filename = "example.py",
  language = "python",
  lineNumbers = true,
  copyButton = true,
  width = "100%"
}) => {
  const [showModal, setShowModal] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const containerStyle = {
    width: typeof width === 'number' ? `${width}px` : width
  }

  return (
    <>
      <div
        className="rounded-lg overflow-hidden border border-gray-700 bg-[#0E0E0E] shadow-lg"
        style={containerStyle}
      >
        {/* Terminal Header */}
        <div className="bg-[#2D2D2D] px-6 py-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div
                className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors"
                onClick={() => setShowModal(true)}
              ></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-gray-400 text-sm ml-2 font-mono">{filename}</div>
          </div>
          {copyButton && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-slate-700 transition-colors"
              onClick={handleCopy}
            >
              {copied ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        {/* Terminal Content */}
        <Highlight
          theme={themes.nightOwl}
          code={code.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className="px-4 py-4 overflow-auto text-sm" style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="flex">
                  {lineNumbers && (
                    <span className="text-gray-500 mr-4 select-none w-6 text-right flex-shrink-0">
                      {i + 1}
                    </span>
                  )}
                  <span className="flex-1">
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
      {
        showModal && (
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
        )
      }
    </>
  )
}

export default Terminal
