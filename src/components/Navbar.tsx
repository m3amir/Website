import { Box, Container, Button, Stack, Text } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)
const MotionStack = motion(Stack)

const Navbar = () => {
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  return (
    <MotionBox
      as="nav"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      backdropFilter="blur(10px)"
      bg="rgba(0, 0, 0, 0.8)"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      <Container maxW="7xl" py={4}>
        <Stack direction="row" justify="space-between" align="center">
          <Link to="/">
            <MotionBox
              fontWeight="bold"
              fontSize="xl"
              color="white"
              position="relative"
              display="inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Box
                as="span"
                position="relative"
                zIndex={1}
                _after={{
                  content: '""',
                  position: 'absolute',
                  left: '0',
                  bottom: '-4px',
                  width: '100%',
                  height: '2px',
                  background: 'white',
                  transform: 'scaleX(0)',
                  transformOrigin: 'right',
                  transition: 'transform 0.3s ease',
                }}
                _hover={{
                  _after: {
                    transform: 'scaleX(1)',
                    transformOrigin: 'left',
                  }
                }}
              >
                <Text as="span" color="brand.400">M3</Text>
                <Text as="span" color="white">Labs</Text>
              </Box>
            </MotionBox>
          </Link>
          
          <MotionStack
            direction="row"
            gap={6}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/about">
              <Button
                variant="ghost"
                color="white"
                position="relative"
                overflow="hidden"
                px={4}
                _before={{
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '2px',
                  bottom: 0,
                  left: 0,
                  background: 'brand.400',
                  transform: isActive('/about') ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'right',
                  transition: 'transform 0.3s ease',
                }}
                _hover={{
                  bg: 'whiteAlpha.100',
                  _before: {
                    transform: 'scaleX(1)',
                    transformOrigin: 'left',
                  },
                }}
              >
                About
              </Button>
            </Link>
            <Link to="/ai-worker">
              <Button
                variant="ghost"
                color="white"
                position="relative"
                overflow="hidden"
                px={4}
                _before={{
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '2px',
                  bottom: 0,
                  left: 0,
                  background: 'brand.400',
                  transform: isActive('/ai-worker') ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'right',
                  transition: 'transform 0.3s ease',
                }}
                _hover={{
                  bg: 'whiteAlpha.100',
                  _before: {
                    transform: 'scaleX(1)',
                    transformOrigin: 'left',
                  },
                }}
              >
                AI Worker
              </Button>
            </Link>
            <Link to="/knowledge">
              <Button
                variant="ghost"
                color="white"
                position="relative"
                overflow="hidden"
                px={4}
                _before={{
                  content: '""',
                  position: 'absolute',
                  width: '100%',
                  height: '2px',
                  bottom: 0,
                  left: 0,
                  background: 'brand.400',
                  transform: isActive('/knowledge') ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'right',
                  transition: 'transform 0.3s ease',
                }}
                _hover={{
                  bg: 'whiteAlpha.100',
                  _before: {
                    transform: 'scaleX(1)',
                    transformOrigin: 'left',
                  },
                }}
              >
                Knowledge
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                bg="brand.400"
                color="white"
                px={6}
                _hover={{
                  bg: 'brand.500',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(150, 56, 255, 0.3)',
                }}
                transition="all 0.3s ease"
              >
                Contact
              </Button>
            </Link>
          </MotionStack>
        </Stack>
      </Container>
    </MotionBox>
  )
}

export default Navbar 