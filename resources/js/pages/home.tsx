import { useEffect, useState } from 'react'
import Slide from '@/components/slide'
import Dots from '@/components/dots'
import Header from '@/components/header'
import Footer from '@/components/footer'

interface SlideItem {
  image: string
  key: string
}

const slides: SlideItem[] = [
  { image: '/bg1.jpg', key: 'slider.slide1' },
  { image: '/bg2.jpg', key: 'slider.slide2' },
  { image: '/bg3.jpg', key: 'slider.slide3' },
  { image: '/bg4.jpg', key: 'slider.slide4' },
  { image: '/bg5.jpg', key: 'slider.slide5' }
]

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <Header />
      <div className="flex min-h-screen w-full flex-col overflow-hidden font-sans">
        <main className="relative h-screen flex-1 overflow-hidden">
          <div
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slide, idx) => (
              <div key={idx} className="h-full min-w-full">
                <Slide slide={slide} />
              </div>
            ))}
          </div>

          <Dots
            slides={slides}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </main>
        <Footer />
      </div>
    </>
  )
}