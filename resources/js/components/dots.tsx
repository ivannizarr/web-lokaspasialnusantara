interface DotsProps {
  slides: {
    image: string
    title: string
    description: string
    button: string
  }[]
  activeIndex: number
  setActiveIndex: (index: number) => void
}

const Dots = ({ slides, activeIndex, setActiveIndex }: DotsProps) => {
  return (
    <div className="absolute bottom-20 z-30 flex w-full items-center justify-center gap-1 sm:bottom-14 sm:gap-2">
      {slides.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setActiveIndex(idx)}
          className={`h-4 w-4 cursor-pointer rounded-full border-2 transition-all sm:h-4 sm:w-4 md:h-5 md:w-5 ${
            activeIndex === idx
              ? 'border-white bg-[#02517A]'
              : 'border-white bg-white'
          }`}
        />
      ))}
    </div>
  )
}

export default Dots
