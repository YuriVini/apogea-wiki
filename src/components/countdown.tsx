import { useEffect, useState } from 'react'

export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00', 
    minutes: '00',
    seconds: '00'
  })

  useEffect(() => {
    const targetDate = new Date('2025-06-06T12:00:00')

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        // Beta has started
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00', 
          seconds: '00'
        })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      })
    }

    // Calculate immediately
    calculateTimeLeft()

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000)

    // Cleanup interval on unmount
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Update DOM elements
    const daysElement = document.getElementById('days')
    const hoursElement = document.getElementById('hours')
    const minutesElement = document.getElementById('minutes')
    const secondsElement = document.getElementById('seconds')

    if (daysElement) daysElement.textContent = timeLeft.days
    if (hoursElement) hoursElement.textContent = timeLeft.hours
    if (minutesElement) minutesElement.textContent = timeLeft.minutes
    if (secondsElement) secondsElement.textContent = timeLeft.seconds
  }, [timeLeft])

  return null
}
