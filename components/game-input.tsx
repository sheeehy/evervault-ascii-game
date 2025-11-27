'use client'

import { useState, useRef, forwardRef, useImperativeHandle } from 'react'

interface GameInputProps {
  onGuess: (guess: string) => boolean
}


export interface GameInputRef {
  focusInput: () => void    // methods that parent component can call
  clearInput: () => void
  submitGuess: () => void
  handleKey: (key: string) => void
}

const GameInput = forwardRef<GameInputRef, GameInputProps>(
  ({ onGuess }, ref) => {
    const [input, setInput] = useState('')
    const [isShaking, setIsShaking] = useState(false)
    const inputFieldRef = useRef<HTMLInputElement>(null)

   
    useImperativeHandle(ref, () => ({
      focusInput: () => {
        inputFieldRef.current?.focus()
      },
      clearInput: () => {
        setInput('')
        inputFieldRef.current?.focus()
      },
      submitGuess: () => {
        handleSubmit(new Event('submit') as any)
      },
      handleKey: (key: string) => {
        if (key === 'Enter') {
          handleSubmit(new Event('submit') as any)
        } else if (key.length === 1) {
       
          if (document.activeElement !== inputFieldRef.current) { // still some issues with this
            inputFieldRef.current?.focus()
            setInput(key)
          }
        }
      },
    }))

    const handleSubmit = (e: React.FormEvent | Event) => {
      e.preventDefault?.()
      if (!input.trim()) return

      const isCorrect = onGuess(input)

      if (!isCorrect) { 
        setIsShaking(true)
        setTimeout(() => setIsShaking(false), 500)
      }
    }

    return (
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className={`flex items-center rounded-[30px] bg-black/50 shadow-[inset_0_0_0_1px_rgba(190,167,255,0.12)] backdrop-blur-sm transition-shadow duration-300 overflow-hidden ${isShaking ? 'animate-shake' : ''}`}>
          <input
            ref={inputFieldRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder=""
            className="flex-1 bg-transparent outline-none text-white/80 placeholder:text-white/50 px-4 py-3 text-sm"
          />
          <button
            type="submit"
            className="px-5 py-3 text-white font-medium bg-white/10 hover:bg-white/20 transition flex items-center gap-2 cursor-pointer rounded-full text-xs mr-1 my-1"
          >
            Guess
          </button>
        </div>
      </form>
    )
  }
)

GameInput.displayName = 'GameInput' 

export default GameInput
