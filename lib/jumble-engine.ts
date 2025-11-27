
// * this didnt really turn out as cool as i wanted, but was having performance issues when animating it

// seeded random for consistent jumbling
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// jumble the ascii art based on stage 5 = most jumbled, 1 = clear
// still needs work and might be too difficult

export function createJumbleStage(art: string, stage: number): string {

  
  // stage 1 is fully clear with no noise
  if (stage === 1) return art

  const lines = art.split('\n')
  const seed = 12345

  const jumbled = lines.map((line, lineIndex) => {
    return line
      .split('')
      .map((char, charIndex) => {
        const baseIndex = lineIndex * 1000 + charIndex
        const rand = seededRandom(baseIndex + seed)

        // stage 5 very jumbled 
        if (stage === 5) {
          if (rand < 0.4) {
            const noiseChars = '▓▒░░██ ▀▄■●◘'
            return noiseChars[Math.floor(seededRandom(baseIndex * 2) * noiseChars.length)]
          }
          return char
        } 

        // stage 4 chaotic but patterns are still visible 
        else if (stage === 4) {
          if (rand < 0.3) {
            const noiseChars = '▓░ ▄█'
            return noiseChars[Math.floor(seededRandom(baseIndex * 3) * noiseChars.length)]
          }
          return char
        } 

        // stage 3 want the silhouette to be visible 
        else if (stage === 3) {
          if (rand < 0.2) {
            const noiseChars = '▓░ '
            return noiseChars[Math.floor(seededRandom(baseIndex * 4) * noiseChars.length)]
          }
          return char
        } 
        
        // stage 2 should be starting to be readable
        else if (stage === 2) {
          if (rand < 0.1) {
            return seededRandom(baseIndex * 5) < 0.5 ? '░' : ' '
          }
          return char
        }

        return char
      })
      .join('')
  })

  return jumbled.join('\n')
}
  