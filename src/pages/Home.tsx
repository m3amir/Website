import { Box, Container, Heading, Text, Button, Stack, useBreakpointValue } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Styled components with motion
const MotionBox = motion(Box)
const MotionHeading = motion(Heading)
const MotionText = motion(Text)
const MotionStack = motion(Stack)

const Home = () => {
  const sloganFontSize = useBreakpointValue({ base: "4xl", sm: "5xl", md: "6xl", lg: "8xl" })
  
  return (
    <Box py={{ base: 10, md: 20 }} overflow="hidden">
      <Container maxW="7xl" px={{ base: 4, md: 8 }}>
        <MotionStack 
          gap={{ base: 6, md: 8 }} 
          align="center" 
          textAlign="center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <MotionHeading 
            size={{ base: "xl", md: "2xl" }}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              type: "spring",
              stiffness: 200
            }}
            px={{ base: 2, md: 0 }}
          >
            Welcome to{' '}
            <MotionText
              as="span"
              bgGradient="linear(to-r, brand.400, brand.600)"
              bgClip="text"
              display="inline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              M3Labs
            </MotionText>
          </MotionHeading>
          
          <MotionText 
            fontSize={{ base: "lg", md: "xl" }}
            color="text.secondary" 
            maxW="2xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            px={{ base: 4, md: 0 }}
          >
            Revolutionizing how teams collaborate, innovate, and achieve their goals in the modern workplace.
          </MotionText>

          <MotionStack 
            direction={{ base: 'column', sm: 'row' }} 
            gap={{ base: 3, md: 4 }}
            width={{ base: "100%", sm: "auto" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            px={{ base: 4, sm: 0 }}
          >
            <Link to="/contact" style={{ width: '100%' }}>
              <Button 
                size="lg" 
                bg="brand.400" 
                color="white"
                width={{ base: "100%", sm: "auto" }}
                _hover={{ bg: 'brand.500', transform: 'translateY(-2px)' }}
                transition="all 0.3s ease"
              >
                Get Started
              </Button>
            </Link>
            <Link to="/knowledge" style={{ width: '100%' }}>
              <Button 
                size="lg" 
                variant="outline" 
                borderColor="brand.400"
                color="text.primary"
                width={{ base: "100%", sm: "auto" }}
                _hover={{ bg: 'brand.400', color: 'white', transform: 'translateY(-2px)' }}
                transition="all 0.3s ease"
              >
                Learn More
              </Button>
            </Link>
          </MotionStack>

          {/* Animated Slogan */}
          <MotionBox
            mt={{ base: 8, md: 12 }}
            position="relative"
            height={{ base: "200px", md: "300px" }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
          >
            {/* First Line: "Changing the" */}
            <MotionBox
              position="absolute"
              top={{ base: "10px", md: "20px" }}
              display="flex"
              gap={{ base: 2, md: 4 }}
              alignItems="center"
              width="100%"
              justifyContent="center"
            >
              <MotionBox
                initial={{ opacity: 0, x: -100, rotate: -10 }}
                animate={{ opacity: 1, x: 0, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 12,
                  delay: 1.6
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
                  delay: 1.7
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
              top={{ base: "100px", md: "160px" }}
              display="flex"
              gap={{ base: 2, md: 4 }}
              alignItems="center"
              whiteSpace={{ base: "normal", md: "nowrap" }}
              width="100%"
              justifyContent="center"
              flexWrap={{ base: "wrap", md: "nowrap" }}
              px={{ base: 2, md: 0 }}
            >
              <MotionBox
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 60,
                  damping: 10,
                  delay: 1.9
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
                  delay: 2.0
                }}
                whileHover={{ scale: 1.05 }}
                display="inline-flex"
              >
                <Text
                  fontSize={sloganFontSize}
                  fontWeight="black"
                  bgGradient="linear(to-r, brand.500, brand.400)"
                  bgClip="text"
                  letterSpacing="tight"
                  textShadow="0 0 40px rgba(123, 31, 162, 0.15)"
                  display="inline"
                >
                  of Work
                </Text>
              </MotionBox>
            </MotionBox>

            {/* Animated underlines */}
            <MotionBox
              position="absolute"
              bottom={{ base: "10px", md: "20px" }}
              width="100%"
              display="flex"
              flexDirection="column"
              gap={{ base: 2, md: 4 }}
              alignItems="center"
            >
              <MotionBox
                h={{ base: "4px", md: "6px" }}
                bg="brand.400"
                initial={{ width: "0%", x: -200 }}
                animate={{ width: ["0%", "80%"], x: 0 }}
                transition={{ delay: 2.2, duration: 1, ease: "easeOut" }}
                borderRadius="full"
                boxShadow="0 0 20px rgba(123, 31, 162, 0.3)"
              />
              <MotionBox
                h={{ base: "4px", md: "6px" }}
                bg="brand.500"
                initial={{ width: "0%", x: 200 }}
                animate={{ width: ["0%", "60%"], x: 0 }}
                transition={{ delay: 2.4, duration: 1, ease: "easeOut" }}
                borderRadius="full"
                boxShadow="0 0 20px rgba(123, 31, 162, 0.3)"
              />
            </MotionBox>
          </MotionBox>

          {/* Floating decoration elements */}
          <MotionBox
            position="absolute"
            top="20%"
            left="5%"
            width="150px"
            height="150px"
            borderRadius="full"
            bg="brand.400"
            filter="blur(80px)"
            opacity={0.15}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, duration: 1.5 }}
          />
          <MotionBox
            position="absolute"
            bottom="20%"
            right="5%"
            width="180px"
            height="180px"
            borderRadius="full"
            bg="brand.500"
            filter="blur(90px)"
            opacity={0.15}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8, duration: 1.5 }}
          />
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