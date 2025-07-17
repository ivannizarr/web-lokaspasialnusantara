import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "@inertiajs/react"

interface LogoItem {
  slug: string
  logo: string
}

interface PartnerSliderRowProps {
  logos: LogoItem[]
  reverse?: boolean
  speed?: number
}

const PartnerSliderRow: React.FC<PartnerSliderRowProps> = ({ logos, reverse = false, speed = 50 }) => {
  const [isHovered, setIsHovered] = useState(false)

  const fromX = reverse ? '-66.66%' : '0%'
  const toX = reverse ? '0%' : '-66.66%'

  return (
    <div
      className="overflow-hidden w-full py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex gap-x-6 min-w-max items-center"
        style={{ willChange: 'transform' }}
        animate={
          isHovered
            ? { x: null }
            : {
                x: [fromX, toX],
                transition: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: speed,
                  ease: 'linear',
                },
              }
        }
      >
        {[...logos, ...logos, ...logos].map((item, i) => (
          <Link
            key={`${item.slug}-${i}`}
            href={`/tentang-kami/mitra/${item.slug}`}
            className="shrink-0"
          >
            <img
              src={item.logo}
              alt={item.slug}
              className="h-30 w-30 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-35 lg:w-35 object-contain bg-white p-4 rounded-xl shadow-md transition duration-100 hover:scale-102 hover:ring-1 hover:ring-sky-800"
            />
          </Link>
        ))}
      </motion.div>
    </div>
  )
}

export default PartnerSliderRow
