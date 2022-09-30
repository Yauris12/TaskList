import React, { useState, useEffect } from 'react'

const useResize = () => {
  const [isPhone, setIsPhone] = useState(window.innerWidth < 900 ? true : false)

  const handleResize = () => {
    if (window.innerWidth < 900) {
      setIsPhone(true)

      console.log(isPhone)
    } else {
      setIsPhone(false)
      console.log(isPhone)
    }
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  return { isPhone }
}
export default useResize
