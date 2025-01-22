import * as React from "react"
import { Highlight, themes } from "prism-react-renderer"
import { CopyIcon, CheckIcon, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "./lib/utils"

const defaultCode = ``

interface TerminalProps {
  code?: string
  filename?: string
  language?: string
  lineNumbers?: boolean
  copyButton?: boolean
  width?: string | number
  allowClose?: boolean
}

export const Terminal: React.FC<TerminalProps> = ({
  code = defaultCode,
  filename = "example.py",
  language = "python",
  lineNumbers = true,
  copyButton = true,
  width = "100%",
  allowClose = true
}) => {
  const [showModal, setShowModal] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(true)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const containerStyle = {
    width: typeof width === 'number' ? `${width}px` : width
  }

  const handleCloseClick = () => {
    if (allowClose) {
      setIsVisible(false)
    } else {
      setShowModal(true)
    }
  }

  if (!isVisible) return null;

  return (
    <>
      <div
        className="rounded-lg overflow-hidden border border-none bg-[#0E0E0E] shadow-lg relative w-full h-full"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <div
          className="bg-[#2D2D2D] px-6 py-2 flex items-center justify-between gap-2"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <div
                className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors"
                onClick={handleCloseClick}
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

        <Highlight
          theme={themes.nightOwl}
          code={code.trim()}
          language={language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={cn("px-4 py-4 overflow-auto text-sm h-full", className)} style={style}>
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

      {
        showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#2D2D2D] p-6 rounded-lg shadow-xl max-w-md relative">
              <Button
                variant="ghost"
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 bg-none hover:bg-none text-white"
              >
                <X className="h-4 w-4" />
              </Button>
              <p className="text-gray-300 mt-6">
                Did you know, that even a relatively "small" asteroid impact (around 50 meters wide) could release energy equivalent to several nuclear bombs? The 1908 Tunguska event, believed to be caused by an asteroid or comet about this size, flattened 80 million trees over 830 square miles of Siberian forest.
              </p>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Terminal
