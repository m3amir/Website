import { motion } from 'framer-motion'
import { useBreakpointValue } from '@chakra-ui/react'

interface RobotIconProps {
  size?: number;
}

const RobotIcon = ({ size }: RobotIconProps) => {
  // If size is provided, use it; otherwise use the responsive breakpoint values
  const defaultSize = useBreakpointValue({ base: 100, sm: 120, md: 160 })
  const robotSize = size || defaultSize
  const robotLeft = useBreakpointValue({ base: 0, sm: 20, md: 30 })
  
  return (
    <motion.div
      style={{
        position: 'relative',
        left: robotLeft,
        width: `${robotSize}px`,
        height: `${robotSize}px`,
        zIndex: 1
      }}
      initial={{ x: -20, opacity: 0 }}
      animate={{ 
        x: 0,
        opacity: 1
      }}
      transition={{
        x: { duration: 0.6, ease: "easeOut" },
        opacity: { duration: 0.2 },
        delay: 0.2
      }}
    >
      <motion.svg
        width={robotSize}
        height={robotSize}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ 
          y: [0, -3, 0]
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 0
        }}
      >
        {/* Robot Head */}
        <motion.g
          animate={{ 
            rotate: [-2, 2, -2]
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatDelay: 0
          }}
          style={{ transformOrigin: '80px 60px' }}
        >
          <rect x="55" y="20" width="50" height="40" rx="10" fill="#2563eb" />
          {/* Eyes */}
          <circle cx="70" cy="40" r="5" fill="white" />
          <circle cx="90" cy="40" r="5" fill="white" />
          {/* Antenna */}
          <rect x="75" y="10" width="10" height="15" fill="#2563eb" />
          <circle cx="80" cy="5" r="5" fill="#2563eb" />
        </motion.g>

        {/* Robot Body */}
        <motion.g>
          <rect x="60" y="65" width="40" height="30" rx="5" fill="#1d4ed8" />
          {/* Arms */}
          <motion.g
            animate={{ 
              rotate: [-15, 15, -15]
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0
            }}
            style={{ transformOrigin: '60px 70px' }}
          >
            <rect x="35" y="70" width="25" height="8" rx="4" fill="#2563eb" />
          </motion.g>
          <motion.g
            animate={{ 
              rotate: [15, -15, 15]
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0
            }}
            style={{ transformOrigin: '100px 70px' }}
          >
            <rect x="100" y="70" width="20" height="8" rx="4" fill="#2563eb" />
          </motion.g>
          {/* Legs */}
          <motion.g
            animate={{ 
              rotate: [15, -15, 15]
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0
            }}
            style={{ transformOrigin: '65px 95px' }}
          >
            <rect x="65" y="95" width="8" height="15" rx="4" fill="#2563eb" />
          </motion.g>
          <motion.g
            animate={{ 
              rotate: [-15, 15, -15]
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 0
            }}
            style={{ transformOrigin: '87px 95px' }}
          >
            <rect x="87" y="95" width="8" height="15" rx="4" fill="#2563eb" />
          </motion.g>
        </motion.g>

        {/* Happy Expression */}
        <path
          d="M75 45 Q80 50 85 45"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </motion.svg>
    </motion.div>
  )
}

export default RobotIcon 