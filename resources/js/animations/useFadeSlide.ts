import { useEffect, useRef } from 'react'

export default function useFadeSlide(direction: 'up' | 'down' = 'up') {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(direction === 'up' ? 'animate-up' : 'animate-down')
          observer.unobserve(el)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [direction])

  return ref
}
