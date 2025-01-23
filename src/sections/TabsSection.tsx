import * as React from 'react'
import { ArrowRight } from 'lucide-react'
import Terminal from '../Terminal'
import Video from '../components/Video'
import { Content } from '@radix-ui/react-dialog'
import { UserContext } from '../contexts/UserContext'
import { useContext } from 'react'
import { contextMenuCheckboxItemPropDefs } from '@radix-ui/themes'
import ArcadeEmbed from '../ArcadeEmbed'
import Tabs from '../Tabs'
import Section from '@/sections/Section'

export default function TabsSection() {
  const { content } = useContext(UserContext)

  return (
    <Section
      title={content.title}
      subtitle={content.subtitle}
    >
      <Tabs />
    </Section>

  )
}
