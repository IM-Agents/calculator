function toRadians(value, angleMode) {
  return angleMode === 'DEG' ? (value * Math.PI) / 180 : value
}

function applyFunction(name, value, angleMode) {
  switch (name) {
    case 'sin':
      return Math.sin(toRadians(value, angleMode))
    case 'cos':
      return Math.cos(toRadians(value, angleMode))
    case 'tan':
      return Math.tan(toRadians(value, angleMode))
    case 'sqrt':
      if (value < 0) throw new Error('Square root input must be non-negative.')
      return Math.sqrt(value)
    case 'log':
      if (value <= 0) throw new Error('Log input must be greater than zero.')
      return Math.log10(value)
    case 'ln':
      if (value <= 0) throw new Error('Ln input must be greater than zero.')
      return Math.log(value)
    default:
      throw new Error(`Unsupported function: ${name}`)
  }
}

module.exports = { applyFunction }
