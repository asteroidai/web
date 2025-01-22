import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as random from 'maath/random/dist/maath-random.esm'

export default function Stars2() {
  const [opacity, setOpacity] = useState(0.5)

  useEffect(() => {
    const handleScroll = () => {
      // Assuming hero section is 100vh tall
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight

      // Calculate opacity based on scroll position
      // Starts fading out after 50vh and completely fades by 100vh
      const newOpacity = Math.max(0.2, 0.5 - (scrollPosition - windowHeight * 0.5) / (windowHeight * 0.5))
      setOpacity(newOpacity)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none', // This allows clicking through to elements below
        zIndex: 0,
        opacity: opacity
      }}
    >
      <Stars />
    </Canvas>
  )
}

function Stars(props) {
  const ref = useRef()
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }))
  useFrame((state, delta) => {
    // @ts-ignore
    ref.current.rotation.x -= delta / 10
    // @ts-ignore
    ref.current.rotation.y -= delta / 15
  })
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={true} {...props}>
        <PointMaterial transparent color="#ffa0e0" size={0.003} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}
