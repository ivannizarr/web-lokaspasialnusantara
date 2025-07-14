// resources/js/layouts/PageSection.tsx
import { ReactNode } from 'react'
import useFadeSlide from '@/animations/useFadeSlide'

export default function PageSection({
  id,
  children,
  dir = 'up',
}: {
  id: string
  children: ReactNode
  dir?: 'up' | 'down'
}) {
  const ref = useFadeSlide(dir)

  return (
    <section
      id={id}
      ref={ref}
      className="snap-start relative flex min-h-screen w-full items-center justify-center overflow-y-auto max-w-full z-30"
    >
      {children}
    </section>
  )
}