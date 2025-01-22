import * as React from 'react'
import Plyr from "plyr-react"
import "plyr-react/plyr.css"

const plyrProps = {
  source: "https://www.youtube.com/embed/X38hhugtRLg?origin=https://asteroid.ai&iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1",
  options: {
    controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'fullscreen'],
    ratio: '16:9'
  },
}
function Video() {
  return (
    <Plyr
      source={{ type: 'video', sources: [{ src: plyrProps.source, provider: 'youtube' }] }}
      options={plyrProps.options}
    />
  )
}

export default Video
