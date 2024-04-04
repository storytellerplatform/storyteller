import React from 'react'
import { CircularProgressWithLabel } from './CircularProgressWithLabel'
import classNames from 'classnames'
import { CircularProgress } from '@mui/material'

interface SpinnerProps {
  width?: string,
  height?: string,
  spinnerText?: string,
  size?: number,
  value?: number,
  hoverColor?: string
  progressWithLabel?: boolean,
  thickness?: number,
}

const Spinner: React.FC<SpinnerProps> = ({ width = "w-8", height = "h-8", spinnerText = "text-orange-400", hoverColor = "hover:text-orange-300", size = 36, value = 60, progressWithLabel = 'false', thickness }) => {
  return (
    <div
      role="status"
      className={classNames(`flex items-center justify-center select-none`,
        width,
        height,
        spinnerText,
        hoverColor
      )}
    >
      {
        progressWithLabel ?
          <CircularProgress size={size} color={'inherit'} thickness={thickness} /> :
          <CircularProgressWithLabel size={size} color={'inherit'} value={value} thickness={thickness} />
      }
      <span className="sr-only">Loading...</span>
    </div>

  )
}

export default Spinner