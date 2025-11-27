'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import NumberFlow from '@number-flow/react'
import { puzzles } from '@/data/ascii-puzzles'
import { createJumbleStage } from '@/lib/jumble-engine'
import GameDisplay from './game-display'
import GameInput, { GameInputRef } from './game-input'
import GameOver from './game-over'
import GameMenu from './game-menu'

export default function GameBoard() {

  const [showMenu, setShowMenu] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)
  const [currentPuzzle, setCurrentPuzzle] = useState(0)
  const [stage, setStage] = useState(5)
  const [timeLeft, setTimeLeft] = useState(10)
  const [gameOver, setGameOver] = useState(false)
  const [finalAnswer, setFinalAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [puzzlesSolved, setPuzzlesSolved] = useState(0)
  const [failedAttempts, setFailedAttempts] = useState(0)
  const inputRef = useRef<GameInputRef>(null)
  
  // some contstants 
  const ROUND_DURATION = 10
  const INCORRECT_GUESS_PENALTY = 5

  //  get current puzzle and create jumbled art
  const puzzle = puzzles[currentPuzzle]
  const jumbledArt = useMemo(() => {
    return createJumbleStage(puzzle.art, stage)
  }, [puzzle.art, stage])
  
  // letters to underscores (not sure if needed but makes guessing easier)
  const answerPattern = useMemo(() => {
    return puzzle.name.replace(/[a-zA-Z]/g, '_')
  }, [puzzle.name])

  useEffect(() => {
    if (!gameStarted || gameOver) return
    setTimeout(() => {
      inputRef.current?.focusInput()
    }, 100)


    // some keyboard handling
    const handleKeyPress = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT') {
        return
      }
      
  
      if (e.key === 'Enter') {
        e.preventDefault()
        inputRef.current?.submitGuess()
        return
      }
      
      if (e.ctrlKey || e.metaKey || e.altKey) return
      
      if (e.key.length === 1 && !['Tab', 'Escape'].includes(e.key)) {
        e.preventDefault()
        inputRef.current?.handleKey(e.key)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameStarted, gameOver, currentPuzzle])


  const handleStart = () => {
    setShowMenu(false)
    setCurrentPuzzle(Math.floor(Math.random() * puzzles.length))
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setPuzzlesSolved(0)
    setFailedAttempts(0)
  }


  useEffect(() => {
    if (gameStarted && !gameOver) {
      setTimeout(() => {
        inputRef.current?.clearInput()
      }, 50)
    }
  }, [currentPuzzle, gameStarted, gameOver])

  //  timer
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setFinalAnswer(puzzles[currentPuzzle].name)
          setGameOver(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameStarted, gameOver, currentPuzzle])

  // making art clearer (2 seconds) should also probably be a constant
  useEffect(() => {
    if (!gameStarted || gameOver) return

    const stageTimer = setInterval(() => {
      setStage(prev => Math.max(1, prev - 1))
    }, 2000)

    return () => clearInterval(stageTimer)
  }, [gameStarted, gameOver])

  //getting score
  const calculateScore = (currentStage: number, timeRemaining: number): number => {
    const stagePoints = [0, 10, 20, 30, 40, 50][currentStage] || 0
    const timeBonus = Math.floor(timeRemaining * 0.5)
    return stagePoints + timeBonus
  }

  // get random puzzle, definitely needs more work
  const getNextPuzzle = (currentIndex: number): number => {
    if (puzzles.length <= 1) return 0
    
    let nextIndex
    do {
      nextIndex = Math.floor(Math.random() * puzzles.length)
    } while (nextIndex === currentIndex)
    
    return nextIndex
  }


  const handleGuess = (guess: string): boolean => {
    if (guess.toLowerCase() === puzzles[currentPuzzle].name.toLowerCase()) {
      // correct guess - add score and move to next puzzle
      const roundScore = calculateScore(stage, timeLeft)
      setScore(prev => prev + roundScore)
      setPuzzlesSolved(prev => prev + 1)
      
      const nextPuzzle = getNextPuzzle(currentPuzzle)
      setCurrentPuzzle(nextPuzzle)
      setStage(5)
      setTimeLeft(ROUND_DURATION)
      
      setTimeout(() => {
        inputRef.current?.clearInput()
      }, 100)
      
      return true
    } else {
  
      setScore(prev => Math.max(0, prev - INCORRECT_GUESS_PENALTY)) // deduct points, might be harsh
      setFailedAttempts(prev => prev + 1)
      return false
    }
  }

  const handlePlayAgain = () => { // restart
    setCurrentPuzzle(Math.floor(Math.random() * puzzles.length))
    setStage(5)
    setTimeLeft(ROUND_DURATION)
    setGameOver(false)
    setFinalAnswer('')
    setScore(0)
    setPuzzlesSolved(0)
    setFailedAttempts(0)
    setGameStarted(true)
  }

  if (showMenu) {
    return <GameMenu onStart={handleStart} />
  }
  

  if (gameOver) {
    return (
      <GameOver
        finalAnswer={finalAnswer}
        score={score}
        puzzlesSolved={puzzlesSolved}
        failedAttempts={failedAttempts}
        onPlayAgain={handlePlayAgain}
      />
    )
  }

 
  const progressPercent = (timeLeft / ROUND_DURATION) * 100 
  const shouldPulse = timeLeft <= 5 && timeLeft > 0 // pulse effect when time, 5 for now

  return (
    <div className="relative h-screen w-full flex flex-col overflow-hidden">
      
      <div 
        className="absolute top-0 left-0 right-0 flex justify-center z-20 animate-fade-in-up"
        style={{
          animationDelay: '0.03s',
          animationFillMode: 'both'
        }}
      >

        <div className="flex flex-col items-center">
          <span className="text-xs text-white/50 uppercase tracking-widest">SCORE</span>
          <div className="text-3xl font-bold text-white">
            <NumberFlow value={score} />
          </div>
        </div>
      </div>

   
      <div className="flex-1 overflow-y-auto mt-12">
        <div
          className="animate-fade-in-up"
          style={{
            animationDelay: '0.06s',
            animationFillMode: 'both'
          }}
        >
          <GameDisplay art={jumbledArt} stage={stage} />
        </div>
      </div>

   
      <div className="fixed bottom-8 left-0 right-0 flex justify-center pb-4 sm:pb-6 z-10">
        <div className="w-full max-w-md flex flex-col items-center gap-6 px-4">
       


          {answerPattern && (
            <div 
              className="flex justify-center gap-2 text-sm animate-fade-in-up"
              style={{
                animationDelay: '0.09s',
                animationFillMode: 'both'
              }}
            >
              {answerPattern.split('').map((char, i) => (
                <span
                  key={i}
                  className={`h-8 flex items-center justify-center text-foreground ${
                    char === ' ' ? 'w-2' : 'w-6 border-b-2 border-gray-600'
                  }`}
                >
                  {char === ' ' ? '\u00A0' : '_'}
                </span>
              ))}
            </div>
          )}

         
          <div 
            className="flex flex-col items-center space-y-2 w-full animate-fade-in-up"
            style={{
              animationDelay: '0.12s',
              animationFillMode: 'both'
            }}
          >
            <div className="space-y-2 w-full">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white uppercase">TIME</span>
                <span className={`text-xs font-bold text-white transition-colors ${
                  shouldPulse ? 'animate-pulse' : ''
                }`}>
                  {timeLeft}s
                </span>
              </div>
              <div className={`h-1 bg-white/20 rounded-full overflow-hidden transition-all ${
                shouldPulse ? 'animate-pulse' : ''
              }`}>
                <div
                  className={`h-full bg-white transition-all duration-300 ${
                    shouldPulse ? 'shadow-lg shadow-white/50' : ''
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

         

          {/* input field still has some issues, mainly with keyboard handling*/}
          <div 
            className="animate-fade-in-up" 
            style={{
              animationDelay: '0.15s',
              animationFillMode: 'both'
            }}
          >
            <GameInput onGuess={handleGuess} ref={inputRef} />
          </div>
        </div>
      </div>
    </div>
  )
}
