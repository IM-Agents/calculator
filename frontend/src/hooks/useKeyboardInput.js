import { useEffect } from 'react'

export function useKeyboardInput(enabled, handlers) {
  useEffect(() => {
    if (!enabled) return undefined

    const onKeyDown = (e) => {
      if (e.defaultPrevented) return
      const t = e.target
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
        return
      }

      const { key } = e
      if (key >= '0' && key <= '9') {
        e.preventDefault()
        handlers.onDigit?.(key)
        return
      }
      if (key === '.' || key === ',') {
        e.preventDefault()
        handlers.onDigit?.('.')
        return
      }
      if (key === '+') {
        e.preventDefault()
        handlers.onOperator?.('+')
        return
      }
      if (key === '-') {
        e.preventDefault()
        handlers.onOperator?.('-')
        return
      }
      if (key === '*') {
        e.preventDefault()
        handlers.onOperator?.('*')
        return
      }
      if (key === '/') {
        e.preventDefault()
        handlers.onOperator?.('/')
        return
      }
      if (key === '%') {
        e.preventDefault()
        handlers.onOperator?.('%')
        return
      }
      if (key === '^') {
        e.preventDefault()
        handlers.onOperator?.('^')
        return
      }
      if (key === '(') {
        e.preventDefault()
        handlers.onChar?.('(')
        return
      }
      if (key === ')') {
        e.preventDefault()
        handlers.onChar?.(')')
        return
      }
      if (key === 'Enter' || key === '=') {
        e.preventDefault()
        handlers.onEvaluate?.()
        return
      }
      if (key === 'Backspace') {
        e.preventDefault()
        handlers.onBackspace?.()
        return
      }
      if (key === 'Escape') {
        e.preventDefault()
        handlers.onClear?.()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [enabled, handlers])
}
