import { useCallback, useEffect, useState } from 'react'
import { postCalculate, getHistory, deleteHistory } from '../api/client'
import { formatResult } from '../utils/formatDisplay'
import {
  isEvaluateEmpty,
  wouldDuplicateDecimal,
  lastOperatorAllowsDecimal,
} from '../utils/validateExpression'
import { toApiExpression, toggleSignOnExpression } from '../utils/normalizeInput'

const initialState = {
  expression: '',
  result: null,
  error: '',
  memoryValue: 0,
  history: [],
  angleMode: 'DEG',
}

export function useCalculatorState() {
  const [expression, setExpression] = useState(initialState.expression)
  const [result, setResult] = useState(initialState.result)
  const [error, setError] = useState(initialState.error)
  const [memoryValue, setMemoryValue] = useState(initialState.memoryValue)
  const [history, setHistory] = useState(initialState.history)
  const [angleMode, setAngleMode] = useState(initialState.angleMode)
  const [busy, setBusy] = useState(false)

  const refreshHistory = useCallback(async () => {
    const { body, ok } = await getHistory()
    if (ok && body.success && Array.isArray(body.data?.items)) {
      setHistory(body.data.items)
    }
  }, [])

  useEffect(() => {
    refreshHistory()
  }, [refreshHistory])

  const appendChar = useCallback((ch) => {
    setError('')
    setResult(null)
    setExpression((prev) => {
      if (ch === '.' && wouldDuplicateDecimal(prev, '.')) return prev
      if (ch === '.' && !lastOperatorAllowsDecimal(prev)) return prev
      return prev + ch
    })
  }, [])

  const appendOperator = useCallback((op) => {
    setError('')
    setResult(null)
    setExpression((prev) => {
      const t = prev.replace(/\s+$/, '')
      if (t === '') return prev
      const last = t[t.length - 1]
      if ('+-*/^%'.includes(last)) {
        return t.slice(0, -1) + op
      }
      return t + op
    })
  }, [])

  const clearAll = useCallback(() => {
    setExpression('')
    setResult(null)
    setError('')
  }, [])

  const backspace = useCallback(() => {
    setError('')
    setExpression((prev) => prev.slice(0, -1))
  }, [])

  const toggleSign = useCallback(() => {
    setError('')
    setExpression((prev) => toggleSignOnExpression(prev))
  }, [])

  const insertConstant = useCallback((name) => {
    setError('')
    setResult(null)
    setExpression((prev) => {
      const t = prev.replace(/\s+$/, '')
      const needsMul = t.length > 0 && /[0-9)]/.test(t[t.length - 1])
      const prefix = needsMul ? '*' : ''
      if (name === 'pi') return `${t}${prefix}pi`
      if (name === 'e') return `${t}${prefix}e`
      if (name === 'π') return `${t}${prefix}π`
      return t + name
    })
  }, [])

  const insertFunction = useCallback((fnName) => {
    setError('')
    setResult(null)
    setExpression((prev) => {
      const t = prev.replace(/\s+$/, '')
      const needsMul = t.length > 0 && /[0-9)]/.test(t[t.length - 1])
      const prefix = needsMul ? '*' : ''
      return `${t}${prefix}${fnName}(`
    })
  }, [])

  const evaluate = useCallback(async () => {
    if (isEvaluateEmpty(expression)) {
      setError('Enter an expression first.')
      return
    }
    setBusy(true)
    setError('')
    try {
      const payloadExpr = toApiExpression(expression)
      const { body, ok, status } = await postCalculate(payloadExpr, angleMode)
      if (ok && body.success) {
        const { result: r, expression: ex, historyItem } = body.data
        setResult(r)
        setExpression(ex)
        if (historyItem) {
          setHistory((h) => {
            const next = [historyItem, ...h.filter((x) => x.id !== historyItem.id)]
            return next.slice(0, 10)
          })
        }
        return
      }
      const code = body.error?.code || 'INVALID_EXPRESSION'
      const msg = body.error?.message || 'Could not evaluate.'
      if (status === 400 && (code === 'EMPTY_EXPRESSION' || code === 'INVALID_EXPRESSION')) {
        setError(msg)
      } else {
        setError(msg)
      }
      setResult(null)
    } catch {
      setError('Network error. Is the API running?')
      setResult(null)
    } finally {
      setBusy(false)
    }
  }, [expression, angleMode])

  const clearHistory = useCallback(async () => {
    const { ok } = await deleteHistory()
    if (ok) setHistory([])
  }, [])

  const useHistoryExpression = useCallback((ex) => {
    setExpression(ex)
    setResult(null)
    setError('')
  }, [])

  const toggleAngleMode = useCallback(() => {
    setAngleMode((m) => (m === 'DEG' ? 'RAD' : 'DEG'))
  }, [])

  const memoryAdd = useCallback(() => {
    const base = result !== null && !error ? result : null
    if (base === null || !Number.isFinite(base)) return
    setMemoryValue((m) => m + base)
  }, [result, error])

  const memorySubtract = useCallback(() => {
    const base = result !== null && !error ? result : null
    if (base === null || !Number.isFinite(base)) return
    setMemoryValue((m) => m - base)
  }, [result, error])

  const memoryRecall = useCallback(() => {
    setError('')
    setResult(null)
    const v = memoryValue
    const insert = formatResult(v)
    setExpression((prev) => {
      const t = prev.replace(/\s+$/, '')
      const needsMul = t.length > 0 && /[0-9)]/.test(t[t.length - 1])
      return `${t}${needsMul ? '*' : ''}${insert}`
    })
  }, [memoryValue])

  const memoryClear = useCallback(() => {
    setMemoryValue(0)
  }, [])

  return {
    expression,
    result,
    error,
    memoryValue,
    history,
    angleMode,
    busy,
    appendChar,
    appendOperator,
    clearAll,
    backspace,
    toggleSign,
    insertConstant,
    insertFunction,
    evaluate,
    clearHistory,
    useHistoryExpression,
    toggleAngleMode,
    memoryAdd,
    memorySubtract,
    memoryRecall,
    memoryClear,
    formatResult,
    refreshHistory,
  }
}
