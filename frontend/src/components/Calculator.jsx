import { useCallback, useEffect, useState } from 'react'
import Display from './Display'
import ButtonGrid from './ButtonGrid'
import HistoryPanel from './HistoryPanel'
import ModeToggle from './ModeToggle'
import { useKeyboardInput } from '../hooks/useKeyboardInput'
import { formatDisplay } from '../utils/formatDisplay'
import { validateExpression } from '../utils/validateExpression'
import '../styles/calculator.css'

function Calculator() {
  const [expression, setExpression] = useState('')
  const [display, setDisplay] = useState('0')
  const [error, setError] = useState('')
  const [memory, setMemory] = useState(0)
  const [mode, setMode] = useState('DEG')
  const [history, setHistory] = useState([])

  const refreshHistory = useCallback(async () => {
    const response = await fetch('/api/history', { credentials: 'include' })
    if (response.ok) {
      const payload = await response.json()
      setHistory(payload.history || [])
    }
  }, [])

  useEffect(() => {
    refreshHistory().catch(() => undefined)
  }, [refreshHistory])

  const handlePress = useCallback(async (value) => {
    setError('')

    if (value === 'C') {
      setExpression('')
      setDisplay('0')
      return
    }

    if (value === 'DEL') {
      const next = expression.slice(0, -1)
      setExpression(next)
      setDisplay(next || '0')
      return
    }

    if (value === '+/-') {
      const toggled = expression.startsWith('-') ? expression.slice(1) : `-${expression || '0'}`
      setExpression(toggled)
      setDisplay(toggled)
      return
    }

    if (value === 'MR') {
      setExpression((previous) => `${previous}${memory}`)
      setDisplay((previous) => `${previous}${memory}`)
      return
    }

    if (value === 'MC') {
      setMemory(0)
      return
    }

    if (value === 'M+' || value === 'M-') {
      const current = Number(display) || 0
      setMemory((previous) => previous + (value === 'M+' ? current : -current))
      return
    }

    if (value === '=') {
      const validationError = validateExpression(expression)
      if (validationError) {
        setError(validationError)
        return
      }

      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ expression, angleMode: mode })
      })
      const payload = await response.json()

      if (!response.ok) {
        setError(payload.message || 'Calculation failed.')
        return
      }

      const formatted = formatDisplay(payload.result)
      setDisplay(formatted)
      setExpression(String(payload.result))
      await refreshHistory()
      return
    }

    const tokenMap = { pi: 'pi', sqrt: 'sqrt(', sin: 'sin(', cos: 'cos(', tan: 'tan(', log: 'log(', ln: 'ln(' }
    const nextToken = tokenMap[value] || value
    const next = `${expression}${nextToken}`
    setExpression(next)
    setDisplay(next)
  }, [display, expression, memory, mode, refreshHistory])

  useKeyboardInput(handlePress)

  async function clearHistory() {
    await fetch('/api/history', { method: 'DELETE', credentials: 'include' })
    setHistory([])
  }

  return (
    <section className="calculator-layout">
      <div className="calculator-panel">
        <ModeToggle mode={mode} onChange={setMode} />
        <Display value={display} error={error} />
        <ButtonGrid onPress={handlePress} />
      </div>
      <HistoryPanel history={history} onReuse={(value) => {
        setExpression(String(value))
        setDisplay(String(value))
      }} onClear={clearHistory} />
    </section>
  )
}

export default Calculator
