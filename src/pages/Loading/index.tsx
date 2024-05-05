import { CircularProgress } from '@mui/material'
import React from 'react'

const LoadingPage = () => {
  return (
    <div className='flex items-center justify-center h-screen w-full'>
      <div role="status" className='text-black'>
        <CircularProgress size={60} color={'inherit'} thickness={6} />
        <span className="sr-only">Loading...</span>
      </div>

    </div>
  )
}

export default LoadingPage