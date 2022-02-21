import { CharStatus } from '../../lib/statuses'
import classnames from 'classnames'
import { rNum, REVEAL_TIME_MS } from '../../constants/settings'
import { getStoredIsHighContrastMode } from '../../lib/localStorage'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
}

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`
  const isHighContrast = getStoredIsHighContrastMode()

  const classes = classnames(
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'absent shadowed bg-slate-400 dark:bg-slate-700 text-white border-slate-400 dark:border-slate-700':
        status === 'absent',
      'correct shadowed bg-orange-500 text-white border-orange-500':
        status === 'correct' && isHighContrast,
      'present shadowed bg-cyan-500 text-white border-cyan-500':
        status === 'present' && isHighContrast,
      'correct shadowed bg-green-500 text-white border-green-500':
        status === 'correct' && !isHighContrast,
      'present shadowed bg-yellow-500 text-white border-yellow-500':
        status === 'present' && !isHighContrast,
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )
  function updateSourceFile() {
    if (value === undefined) {
      return ''
    } else {
      return value.toLowerCase().concat(rNum)
    }
  }

  const imgStyles = {
    height: 'auto',
    width: 'auto',
    maxHeight: '50px',
    maxWidth: '96%',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
  const cellStyles = {
    animationDelay,
    maxHeight: '100%',
    maxWidth: '100%',
  }

  function imgLoader() {
    let a = updateSourceFile()
    if (a === '') {
      return
    } else {
      return (
        <img src={`/letters/${a}.png`} style={imgStyles} alt={value || ''} />
      )
    }
  }

  return (
    <div className={classes} style={cellStyles}>
      <div className="letter-container flex" style={cellStyles}>
        {imgLoader()}
      </div>
    </div>
  )
}
