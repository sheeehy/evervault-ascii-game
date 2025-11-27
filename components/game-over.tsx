'use client'

import { useState, useEffect } from 'react'
import NumberFlow from '@number-flow/react'

interface GameOverProps {
  finalAnswer: string
  score: number
  puzzlesSolved: number
  failedAttempts: number
  onPlayAgain: () => void
}

export default function GameOver({
  finalAnswer,
  score,
  puzzlesSolved,
  failedAttempts,
  onPlayAgain,
}: GameOverProps) {
  
  // using 'number-flow' for the numbers might be overkill but it looks cool
  const [animatedScore, setAnimatedScore] = useState(0)
  const [animatedPuzzlesSolved, setAnimatedPuzzlesSolved] = useState(0)
  const [animatedFailedAttempts, setAnimatedFailedAttempts] = useState(0)

  useEffect(() => {   // animate numbers after a short delay
    const timer = setTimeout(() => {
      setAnimatedScore(score)
      setAnimatedPuzzlesSolved(puzzlesSolved)
      setAnimatedFailedAttempts(failedAttempts)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [score, puzzlesSolved, failedAttempts])


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 gap-6">
      <div className="text-center space-y-6 max-w-lg mx-auto w-full">
        <div className="space-y-6 flex flex-col items-center">
       
        {/*using pre to not break ascii, i dont think ive ever used it before lol*/}
          <pre 
            className="text-[10px] sm:text-xxs font-mono text-white animate-fade-in-up whitespace-pre leading-tight" 
            style={{ 
              animationDelay: '0.03s',
              animationFillMode: 'both'
            }}
          > 
{` /$$$$$$   /$$$$$$  /$$      /$$ /$$$$$$$$        /$$$$$$  /$$    /$$ /$$$$$$$$ /$$$$$$$ 
  /$$__  $$ /$$__  $$| $$$    /$$$| $$_____/       /$$__  $$| $$   | $$| $$_____/| $$__  $$
 | $$  \\__/| $$  \\ $$| $$$$  /$$$$| $$            | $$  \\ $$| $$   | $$| $$      | $$  \\ $$
 | $$ /$$$$| $$$$$$$$| $$ $$/$$ $$| $$$$$         | $$  | $$|  $$ / $$/| $$$$$   | $$$$$$$/
 | $$|_  $$| $$__  $$| $$  $$$| $$| $$__/         | $$  | $$ \\  $$ $$/ | $$__/   | $$__  $$
 | $$  \\ $$| $$  | $$| $$\\  $ | $$| $$            | $$  | $$  \\  $$$/  | $$      | $$  \\ $$
 |  $$$$$$/| $$  | $$| $$ \\/  | $$| $$$$$$$$      |  $$$$$$/   \\  $/   | $$$$$$$$| $$  | $$
  \\______/ |__/  |__/|__/     |__/|________/       \\______/     \\_/    |________/|__/  |__/`}
          </pre>         {/*wanted to animate this ascii! */}

          <p 
            className="text-sm text-white/90 animate-fade-in-up"
            style={{
              animationDelay: '0.06s',
              animationFillMode: 'both'
            }}
          >
            [ DECRYPTION FAILED ]
          </p>
        </div>

        {/*stats card - kinda ugly rn */}
        <div 
          className="bg-[#0b0d1c] rounded-3xl shadow-[0_0_0_1px_rgba(255,255,255,0.07),inset_0_0_0_1px_rgba(255,255,255,0.04)] p-12 md:p-8 space-y-4 animate-fade-in-up max-w-xs mx-auto w-full"
          style={{
            animationDelay: '0.09s',
            animationFillMode: 'both'
          }}
        >
          <div 
            className="animate-fade-in-up"
            style={{
              animationDelay: '0.15s',
              animationFillMode: 'both'
            }}
          >
            <p className="text-xs text-white/90 mb-2 uppercase">
              THE ANSWER WAS
            </p>
            <p className="text-2xl font-bold text-white">
              {finalAnswer.toUpperCase()}
            </p>
          </div>

          <div 
            className="border-t border-white/10 pt-4 animate-fade-in-up"
            style={{
              animationDelay: '0.18s',
              animationFillMode: 'both'
            }}
          >
            <p className="text-xs text-white/90 mb-2 uppercase">
              PUZZLES SOLVED
            </p>
            <p className="text-xl font-bold text-white flex items-center justify-center">
              <NumberFlow value={animatedPuzzlesSolved} />
            </p>
          </div>

          <div 
            className="border-t border-white/10 pt-4 animate-fade-in-up"
            style={{
              animationDelay: '0.21s',
              animationFillMode: 'both'
            }}
          >
            <p className="text-xs text-white/90 mb-2 uppercase">
              FAILED ATTEMPTS
            </p>
            <p className="text-xl font-bold text-white flex items-center justify-center">
              <NumberFlow value={animatedFailedAttempts} />
            </p>
          </div>

    

          <div 
            className="border-t border-white/10 pt-4 animate-fade-in-up"
            style={{
              animationDelay: '0.24s',
              animationFillMode: 'both'
            }}
          >
            <p className="text-xs text-white/90 mb-2 uppercase">
              FINAL SCORE
            </p>
            <p className="text-xl font-bold text-white flex items-center justify-center gap-2">
              <NumberFlow value={animatedScore} />
              <span>POINTS</span>
            </p>
          </div>
        </div>


        <button
          onClick={onPlayAgain}
          className="max-w-xs mx-auto w-full px-6 py-3 bg-white text-black font-bold rounded-full hover:opacity-80 transition-opacity ease-in-out uppercase text-sm cursor-pointer animate-fade-in-up"
          style={{
            animationDelay: '0.27s',
            animationFillMode: 'both'
          }}
        >
          Play Again
        </button>
      </div>
    </div>
  )
}
