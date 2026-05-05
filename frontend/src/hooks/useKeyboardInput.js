import { useEffect } from 'react'

const keyMap = {
  Enter: '=',
  Backspace: 'DEL',
  Escape: 'C'
}

const allowedDirectKeys = /^[0-9+\-*/().]$/

export function useKeyboardInput(onPress) {
  useEffect(() => {
    function handleKeyDown(event) {
      const mapped = keyMap[event.key]
      if (mapped) {
        event.preventDefault()
        onPress(mapped)
        return
      }

      if (allowedDirectKeys.test(event.key)) {
        onPress(event.key)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onPress])
}
