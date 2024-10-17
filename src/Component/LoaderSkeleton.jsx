import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoaderSkeleton = () => {
  return (
    <div>
      <Skeleton count={5} />
    </div>
  )
}

export default LoaderSkeleton
