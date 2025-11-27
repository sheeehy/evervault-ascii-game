'use client'

import GameBoard from '@/components/game-board'

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden bg-[#010314] text-foreground">
      <div className="w-full h-full border-[24px] border-[#010314] rounded-[64px] overflow-hidden">
        {/* for the gradient bg*/}
        <div 
          className="rounded-[40px] overflow-hidden h-full"
          style={{
            backgroundImage: 'radial-gradient(170% 107.13% at 50% 23%, transparent 35.41%, #63e 61.27%, #fff 80%)',
            backgroundColor: '#010314'
          }}
        >
          <GameBoard />
        </div>
      </div>
    </main>
  )
}
