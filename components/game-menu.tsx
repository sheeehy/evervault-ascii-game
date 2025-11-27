'use client'

interface GameMenuProps {
  onStart: () => void
}

export default function GameMenu({ onStart }: GameMenuProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 gap-8">
      {/* background image positioned above text (not responsive rn) */}
      <img 
        src="/ascii-blocks.png" 
        alt="Game Logo" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-4xl w-auto h-auto animate-fade-in-up"
        style={{ 
          marginTop: '-150px', // not good practice!
          animationDelay: '0.03s',
          animationFillMode: 'both'
        }}
      />
      
      <div className="text-center space-y-8 max-w-2xl relative z-10 mt-64">
        <div className="space-y-4">
          <div 
            className="animate-fade-in-up"
            style={{
              fontFamily: "Roobert",
              fontWeight: 300,
              animationDelay: '0.06s',
              animationFillMode: 'both'
            }}
          >


            <h1 className="text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-widest">
              Decyrpt the ASCII
            </h1>
          </div>
          

          <p 
            className="text-md text-white/60 max-w-md animate-fade-in-up"
            style={{
              animationDelay: '0.09s',
              animationFillMode: 'both'
            }}
          >
            Identify the ASCII art from progressively as it gets progressively clearer while racing the clock.
          </p>
        </div>

        <button 
          onClick={onStart}
          className="max-w-md px-6 py-2 bg-white text-black rounded-full font-semibold hover:opacity-80 transition-opacity ease-in-out uppercase text-sm tracking-wider cursor-pointer animate-fade-in-up"
          style={{
            animationDelay: '0.12s',
            animationFillMode: 'both'
          }}
        >
          Play
        </button> {/* i have no idea why the hover effect isnt working */}
      </div>
    </div>
  )
}

