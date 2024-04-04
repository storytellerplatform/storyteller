import { CircularProgress } from '@mui/material'
import React from 'react'

const LoadingPage = () => {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <div role="status" className='text-orange-400'>
        <CircularProgress size={52} color={'inherit'} thickness={5} />
        <span className="sr-only">Loading...</span>
      </div>

    </div>
  )
}

export default LoadingPage