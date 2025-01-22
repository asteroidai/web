import * as React from 'react'
import { ArrowRight } from 'lucide-react'
import Terminal from './Terminal'
import Video from './Video'
import { Content } from '@radix-ui/react-dialog'
import { UserContext } from './contexts/UserContext'
import { useContext } from 'react'
import { contextMenuCheckboxItemPropDefs } from '@radix-ui/themes'
import ArcadeEmbed from './ArcadeEmbed'

export default function Step123() {
  const terminal1Ref = React.useRef<HTMLDivElement>(null)
  const terminal3Ref = React.useRef<HTMLDivElement>(null)

  const scrollToTerminal = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const { userType, content } = useContext(UserContext)

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-24 mt-24 p-8 rounded-lg bg-[#030617] ">
      {userType === 'developer' && (
        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-start gap-4">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-4">
                1
              </div>
              <h2 className="text-3xl font-semibold text-left text-white mb-4">
                Integrate
              </h2>
            </div>
            <p className="text-lg text-left text-gray-600">Import the SDK and make a single API call</p>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-full">
            <Terminal code={content.integrationCode} allowClose={false} width={'full'} />
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center justify-start gap-4">
          {userType === 'developer' && (
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-4">
              2
            </div>
          )}

          <h2 className="text-3xl font-semibold text-left text-white mb-4">
            {content.gifTitle}
          </h2>
        </div>
        <p className="text-lg text-left text-gray-600">
          {content.gifDescription}
        </p>
        <ArcadeEmbed />
      </div>

    </div>

  )
}


