import { Box, Container, Text, Button, Stack, useBreakpointValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import RobotIcon from '../components/RobotIcon'

// Styled components with motion
const MotionBox = motion(Box)
const MotionText = motion(Text)
const MotionStack = motion(Stack)

const Home = () => {
  const sloganFontSize = useBreakpointValue({ base: "4xl", sm: "5xl", md: "6xl", lg: "7xl" })
  
  return (
    <Box py={{ base: 10, md: 20 }} overflow="visible">
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        <MotionStack 
          gap={{ base: 6, md: 8 }} 
          align="center" 
          textAlign="center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated Slogan */}
          <MotionBox
            mt={{ base: 8, md: 12 }}
            position="relative"
            height={{ base: "300px", md: "400px" }}
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            overflow="visible"
            zIndex={1}
          >
            {/* First Line: "Changing the" */}
            <MotionBox
              position="absolute"
              top={{ base: "20px", md: "30px" }}
              display="flex"
              gap={{ base: 2, md: 3 }}
              alignItems="center"
              width="100%"
              justifyContent="center"
              zIndex={2}
            >
              <MotionBox
                initial={{ opacity: 0, x: -100, rotate: -10 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 12,
                  delay: 0.8
                }}
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <Text
                  fontSize={sloganFontSize}
                  fontWeight="black"
                  bgGradient="linear(to-r, brand.400, brand.600)"
                  bgClip="text"
                  letterSpacing="tight"
                  textShadow="0 0 40px rgba(123, 31, 162, 0.15)"
                >
                  Changing
                </Text>
              </MotionBox>
              <MotionBox
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 8,
                  delay: 1.0
                }}
                whileHover={{ scale: 1.05 }}
              >
                <Text
                  fontSize={sloganFontSize}
                  fontWeight="black"
                  bgGradient="linear(to-r, brand.500, brand.400)"
                  bgClip="text"
                  letterSpacing="tight"
                  textShadow="0 0 40px rgba(123, 31, 162, 0.15)"
                >
                  the
                </Text>
              </MotionBox>
            </MotionBox>

            {/* Second Line: "Paradigm of Work" */}
            <MotionBox
              position="absolute"
              top={{ base: "90px", md: "140px" }}
              display="flex"
              gap={{ base: 2, md: 3 }}
              alignItems="center"
              width="100%"
              justifyContent="center"
              flexWrap={{ base: "wrap", md: "nowrap" }}
              px={{ base: 2, md: 0 }}
              zIndex={2}
            >
              <MotionBox
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 10,
                  delay: 1.2
                }}
                whileHover={{ scale: 1.05 }}
                display="inline-flex"
              >
                <Text
                  fontSize={sloganFontSize}
                  fontWeight="black"
                  bgGradient="linear(to-r, brand.600, brand.500)"
                  bgClip="text"
                  letterSpacing="tight"
                  textShadow="0 0 40px rgba(123, 31, 162, 0.15)"
                  display="inline"
                >
                  Paradigm
                </Text>
              </MotionBox>
              <MotionBox
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 10,
                  delay: 1.4
                }}
                whileHover={{ scale: 1.05 }}
                display="inline-flex"
                position="relative"
              >
                <Text
                  fontSize={sloganFontSize}
                  fontWeight="black"
                  bgGradient="linear(to-r, brand.500, brand.400)"
                  bgClip="text"
                  letterSpacing="tight"
                  textShadow="0 0 40px rgba(123, 31, 162, 0.15)"
                  display="inline"
                  position="relative"
                  zIndex={2}
                >
                  of Work
                </Text>
                <Box
                  position="absolute"
                  right="-120px"
                  bottom="-20px"
                  height="120px"
                  width="240px"
                  overflow="visible"
                  zIndex={1}
                >
                  <RobotIcon />
                </Box>
              </MotionBox>
            </MotionBox>

            {/* Animated underlines */}
            <MotionBox
              position="absolute"
              bottom={{ base: "30px", md: "40px" }}
              width="100%"
              display="flex"
              flexDirection="column"
              gap={{ base: 1, md: 2 }}
              alignItems="center"
              zIndex={1}
            >
              <MotionBox
                h={{ base: "8px", md: "12px" }}
                bg="#b026ff"
                initial={{ width: "0%", x: -200 }}
                animate={{ width: ["0%", "80%"], x: 0 }}
                transition={{ delay: 1.6, duration: 1, ease: "easeOut" }}
                borderRadius="full"
                className="dark-theme purple-underline"
                style={{ backgroundColor: "#b026ff" }}
              />
              <MotionBox
                h={{ base: "8px", md: "12px" }}
                bg="#c160ff"
                initial={{ width: "0%", x: 200 }}
                animate={{ width: ["0%", "60%"], x: 0 }}
                transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
                borderRadius="full"
                className="dark-theme purple-underline"
                style={{ backgroundColor: "#c160ff" }}
              />
            </MotionBox>
          </MotionBox>

          <MotionText 
            fontSize={{ base: "lg", md: "xl" }}
            color="text.secondary" 
            maxW="2xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.0, duration: 0.8 }}
            px={{ base: 4, md: 0 }}
          >
            Revolutionizing how teams collaborate, innovate, and achieve their goals in the modern workplace.
          </MotionText>

          <MotionText 
            fontSize={{ base: "lg", md: "xl" }}
            fontWeight="bold"
            color="brand.500"
            maxW="2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.8 }}
            px={{ base: 4, md: 0 }}
            mt={{ base: 6, md: 8 }}
          >
            Interested in participating in our closed beta?
          </MotionText>

          <MotionStack 
            direction={{ base: 'column', sm: 'row' }} 
            gap={{ base: 3, md: 4 }}
            width={{ base: "100%", sm: "auto" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            px={{ base: 4, sm: 0 }}
            justifyContent="center"
            display="flex"
            flexWrap="nowrap"
          >
            <Link to="/products" style={{ display: 'inline-block' }}>
              <Button 
                size="lg" 
                variant="unstyled" 
                color="black"
                mx={2}
                position="relative"
                border="none"
                outline="none"
                boxShadow="none"
                display="inline-block"
                _after={{
                  content: '""',
                  position: 'absolute',
                  width: '0%',
                  height: '2px',
                  bottom: '0',
                  left: '0',
                  backgroundColor: 'brand.400',
                  transition: 'width 0.3s ease'
                }}
                _hover={{ 
                  transform: 'translateY(-2px)',
                  bg: 'transparent',
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none',
                  _after: {
                    width: '100%',
                    backgroundColor: 'brand.500',
                  }
                }}
                _active={{
                  outline: 'none',
                  boxShadow: 'none',
                  bg: 'transparent',
                }}
                _focus={{
                  outline: 'none',
                  boxShadow: 'none',
                  bg: 'transparent',
                }}
                transition="all 0.3s ease"
              >
                Learn More
              </Button>
            </Link>
          </MotionStack>
        </MotionStack>
      </Container>
    </Box>
  )
}

// Remove or comment out the unused features array
// const features = [
//   ...
// ];

export default Home 