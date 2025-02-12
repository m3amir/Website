import { IconButton } from '@chakra-ui/react'
import { ChevronUpIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const MotionIconButton = motion(IconButton)

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <MotionIconButton
          aria-label="Scroll to top"
          icon={<ChevronUpIcon />}
          size="lg"
          colorScheme="brand"
          position="fixed"
          bottom="4"
          right="4"
          borderRadius="full"
          zIndex={999}
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          _hover={{
            transform: 'translateY(-2px)',
            boxShadow: 'lg'
          }}
        />
      )}
    </AnimatePresence>
  )
}

export default ScrollToTop 