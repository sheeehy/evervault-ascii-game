'use client'

import { useEffect, useState } from 'react'

interface GameDisplayProps {
  art: string
  stage: number
}

export default function GameDisplay({ art, stage }: GameDisplayProps) {
  
  const [isTransitioning, setIsTransitioning] = useState(false) // blur effect when stage changes, might be a bit much

  useEffect(() => {
    setIsTransitioning(true)
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 150)
    
    return () => clearTimeout(timer)
  }, [stage])

  return (
    <div className="w-full max-w-full">
      <div className="p-4 sm:p-6 md:p-8 overflow-auto max-h-[70vh] flex justify-center">
        <pre 
          className="font-mono text-xs leading-tight text-[#DACCFF] whitespace-pre min-w-fit transition-all duration-150 ease-in-out"
          style={{
            filter: isTransitioning ? 'blur(8px)' : 'blur(0px)',
            opacity: isTransitioning ? 0.6 : 1,
          }}
        >
          {art}
        </pre>
      </div>
    </div>
  )
}
