import * as React from 'react'

interface StepProps {
  steps: {
    title: string
    description?: string
  }[]
}

export default function StepsProgress({ steps }: StepProps) {
  return (
    <div className="w-full mb-12">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center flex-1">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                {index + 1}
              </div>
              <div className="text-center mt-2">
                <div className="text-sm font-medium text-white">{step.title}</div>
                {step.description && (
                  <div className="text-xs text-gray-400 mt-1">{step.description}</div>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 mx-4">
                <svg className="w-full h-4" viewBox="0 0 100 10">
                  <defs>
                    <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{ stopColor: '#6366f1' }} />
                      <stop offset="100%" style={{ stopColor: '#a855f7' }} />
                    </linearGradient>
                  </defs>
                  <path
                    d="M20 5 L80 5 M75 2 L80 5 L75 8"
                    fill="none"
                    stroke={`url(#gradient-${index})`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
} 
