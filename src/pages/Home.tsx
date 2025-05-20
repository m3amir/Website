import { Box, Container, Text, Button, Stack, useBreakpointValue, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { motion, LazyMotion, domAnimation } from 'framer-motion'
import RobotIcon from '../components/RobotIcon'
import { useRef, useEffect } from 'react'

// Consistent text style to match navbar
const textStyle = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  fontWeight: "normal",
  letterSpacing: "0.2px",
};

// Bold version of text style
const boldTextStyle = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  fontWeight: "bold",
  letterSpacing: "0.2px",
};

const headingStyle = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  letterSpacing: "0.2px",
};

// Styled components with motion
const MotionBox = motion(Box)
const MotionText = motion(Text)
const MotionStack = motion(Stack)
const MotionImage = motion(Image)

const Home = () => {
  const sloganFontSize = useBreakpointValue({ base: "3xl", sm: "4xl", md: "6xl", lg: "7xl" })
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Set up intersection observer to play video when in view
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // When 50% of the video is visible
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(error => {
            console.error('Autoplay failed:', error)
          })
        } else if (!entry.isIntersecting && videoRef.current) {
          videoRef.current.pause()
        }
      })
    }, options)
    
    if (videoRef.current) {
      observer.observe(videoRef.current)
    }
    
    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [])
  
  return (
    <LazyMotion features={domAnimation}>
      <Box style={{ paddingTop: "70px", paddingBottom: "30px" }} overflow="visible" minH="auto" display="flex" alignItems="flex-start">
        <Container maxW="7xl" px={{ base: 3, md: 8 }} mx="auto" position="relative" pb={{ base: 4, md: 8 }}>
          <MotionStack 
            gap={{ base: 4, md: 8 }} 
            align="center" 
            textAlign="center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            width="100%"
            style={{ paddingTop: "10px" }}
            mt={{ base: 4, md: 0 }}
          >
            {/* Animated Slogan */}
            <MotionBox
              style={{ marginTop: "40px", position: "relative", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", zIndex: 1 }}
              height={{ base: "240px", md: "280px" }}
            >
              {/* First Line: "Changing the" */}
              <MotionBox
                position="absolute"
                top={{ base: "-8px", md: "-15px" }}
                display="flex"
                gap={{ base: "5px", md: "15px" }}
                alignItems="center"
                width="100%"
                justifyContent="center"
                zIndex={2}
                flexWrap="wrap"
              >
                <MotionBox
                  initial={{ opacity: 0, x: -100, rotate: -10 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 70,
                    damping: 12,
                    delay: 0.2
                  }}
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  mb={{ base: 2, md: 3 }}
                >
                  <Text
                    fontSize={sloganFontSize}
                    fontWeight="normal"
                    color="black"
                    textShadow="0 0 40px rgba(0, 0, 0, 0.15)"
                    {...headingStyle}
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
                    delay: 0.3
                  }}
                  whileHover={{ scale: 1.05 }}
                  mb={{ base: 2, md: 3 }}
                >
                  <Text
                    fontSize={sloganFontSize}
                    fontWeight="normal"
                    color="black"
                    textShadow="0 0 40px rgba(0, 0, 0, 0.15)"
                    {...headingStyle}
                  >
                    the
                  </Text>
                </MotionBox>
              </MotionBox>

              {/* Second Line: "Paradigm of Work" */}
              <MotionBox
                position="absolute"
                top={{ base: "35px", md: "55px" }}
                display="flex"
                gap={{ base: "5px", md: "15px" }}
                alignItems="center"
                width="100%"
                justifyContent="center"
                flexWrap="wrap"
                padding="0 8px"
                zIndex={2}
              >
                <MotionBox
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 10,
                    delay: 0.4
                  }}
                  whileHover={{ scale: 1.05 }}
                  display="inline-flex"
                  mb={{ base: 2, md: 3 }}
                >
                  <Text
                    fontSize={sloganFontSize}
                    fontWeight="normal"
                    color="black"
                    textShadow="0 0 40px rgba(0, 0, 0, 0.15)"
                    display="inline"
                    {...headingStyle}
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
                    delay: 0.5
                  }}
                  whileHover={{ scale: 1.05 }}
                  display="inline-flex"
                  position="relative"
                  mb={{ base: 2, md: 3 }}
                >
                  <Text
                    fontSize={sloganFontSize}
                    fontWeight="normal"
                    color="black"
                    textShadow="0 0 40px rgba(0, 0, 0, 0.15)"
                    display="inline"
                    position="relative"
                    zIndex={2}
                    {...headingStyle}
                  >
                    of Work
                  </Text>
                  {/* Robot for desktop view */}
                  <Box
                    style={{ 
                      position: "absolute",
                      right: "auto",
                      left: "-50px",
                      top: "140px",
                      height: "20px",
                      width: "25px",
                      overflow: "visible",
                      zIndex: 1,
                      transform: "translateX(-50%)"
                    }}
                    display={{ base: "none", md: "flex" }}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <RobotIcon size={100} />
                  </Box>
                </MotionBox>
              </MotionBox>
              
              {/* Robot centered under the entire sentence - mobile only */}
              <Box
                position="absolute"
                left="50%"
                top={{ base: "140px", md: "85px" }}
                height="8px"
                width="10px"
                overflow="visible"
                zIndex={1}
                transform="translateX(-50%)"
                display={{ base: "flex", md: "none" }}
                justifyContent="center"
                alignItems="center"
              >
                <RobotIcon size={100} />
              </Box>

              {/* Animated underlines */}
              <MotionBox
                position="absolute"
                bottom={{ base: "0px", md: "20px" }}
                width="100%"
                display="flex"
                flexDirection="column"
                gap="8px"
                alignItems="center"
                zIndex={1}
              >
                <MotionBox
                  h={{ base: "6px", sm: "8px", md: "12px" }}
                  bg="#b026ff"
                  initial={{ width: "0%", x: -200 }}
                  animate={{ width: ["0%", "80%"], x: 0 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                  borderRadius="full"
                  className="dark-theme purple-underline"
                  style={{ backgroundColor: "#b026ff", width: "80%" }}
                />
                <MotionBox
                  h={{ base: "6px", sm: "8px", md: "12px" }}
                  bg="#c160ff"
                  initial={{ width: "0%", x: 200 }}
                  animate={{ width: ["0%", "60%"], x: 0 }}
                  transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                  borderRadius="full"
                  className="dark-theme purple-underline"
                  style={{ backgroundColor: "#c160ff", width: "60%" }}
                />
              </MotionBox>
            </MotionBox>

            <MotionText 
              fontSize={{ base: "md", sm: "lg", md: "xl" }}
              color="text.secondary" 
              maxW="2xl"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              px={{ base: 4, md: 0 }}
              lineHeight="1.6"
              {...textStyle}
            >
              Transform your business with Text2Agent - our innovative platform that converts natural language into autonomous AI agents, enabling effortless automation of complex workflows.
            </MotionText>

            <MotionText 
              fontSize={{ base: "md", sm: "lg", md: "xl" }}
              color="brand.500"
              maxW="2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              px={{ base: 4, md: 0 }}
              mt={{ base: 4, md: 6 }}
              {...boldTextStyle}
            >
              Ready to create your first autonomous agent with simple text instructions?
            </MotionText>

            <MotionStack 
              direction={{ base: 'column', sm: 'row' }} 
              gap={{ base: 3, md: 4 }}
              width={{ base: "100%", sm: "auto" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              px={{ base: 4, sm: 0 }}
              justifyContent="center"
              display="flex"
              flexWrap="nowrap"
            >
              <Link to="/text2agent" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button 
                  size={{ base: "md", sm: "lg" }} 
                  variant="unstyled" 
                  color="black"
                  mx={2}
                  position="relative"
                  border="none"
                  outline="none"
                  boxShadow="none"
                  display="inline-block"
                  width={{ base: "100%", sm: "auto" }}
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
                    boxShadow: "none",
                    outline: "none",
                    borderColor: "black",
                  }}
                  transition="all 0.3s ease"
                  {...boldTextStyle}
                >
                  Learn More
                </Button>
              </Link>
            </MotionStack>
          </MotionStack>
        </Container>
      </Box>

      {/* Explainer Video Section */}
      <Box py={{ base: 2, md: 4 }} pt={{ base: 0, md: 0 }} bg="gray.100" position="relative" style={{ marginTop: "-50px" }} minHeight={{ base: "680px", md: "auto" }}>
        {/* Bullet Point with Holistic - Absolutely positioned */}
        <MotionBox
          position={{ base: "relative", md: "absolute" }}
          left={{ base: "auto", md: "20px" }}
          top={{ base: "auto", md: "60px" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          display="flex"
          flexDirection="column"
          alignItems={{ base: "center", md: "flex-start" }}
          gap={3}
          zIndex={2}
          maxW={{ base: "100%", md: "300px" }}
          px={{ base: 4, md: 0 }}
          pb={{ base: 6, md: 0 }}
          mt={{ base: "25px", md: 0 }}
        >
          <Box display="flex" alignItems="flex-start" gap={3} flexDirection={{ base: "column", md: "row" }} alignSelf={{ base: "center", md: "flex-start" }}>
            <MotionImage
              src="/images/point.png"
              alt="Bullet point"
              width={{ base: "40px", md: "50px" }}
              height={{ base: "40px", md: "50px" }}
              mb={{ base: 2, md: 0 }}
              alignSelf={{ base: "center", md: "flex-start" }}
              transform={{ base: "rotate(90deg)", md: "rotate(0deg)" }}
              mt={{ base: "10px", md: 0 }}
            />
            <Text 
              fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
              color="black"
              textAlign={{ base: "center", md: "left" }}
              mt={{ base: "5px", md: 0 }}
              {...textStyle}
            >
              Text2Agent
            </Text>
          </Box>
          
          {/* Descriptive points */}
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            pl={{ base: 2, md: "50px" }}
            mt={{ base: -10, md: 0 }}
            width={{ base: "100%", md: "650px", lg: "750px" }}
          >
            <Text 
              fontSize={{ base: "sm", md: "lg" }}
              color="gray.600"
              mb={{ base: 4, md: 10 }}
              {...textStyle}
              lineHeight="1.5"
              fontWeight="light"
              textAlign={{ base: "center", md: "left" }}
            >
              Our innovative platform seamlessly transforms natural language instructions into fully autonomous agents, eliminating complex coding and empowering businesses of all sizes to harness the power of AI.
            </Text>
             
            <Box height="25px" />
             
            
            <Box height="25px" />
            
          </MotionBox>
        </MotionBox>

        {/* Bullet Point with Workflow - Absolutely positioned */}
        <MotionBox
          position={{ base: "relative", md: "absolute" }}
          left={{ base: "auto", md: "20px" }}
          top={{ base: "auto", md: "280px" }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          display="flex"
          flexDirection="column"
          alignItems={{ base: "center", md: "flex-start" }}
          gap={3}
          zIndex={2}
          maxW={{ base: "100%", md: "300px" }}
          px={{ base: 4, md: 0 }}
          pb={{ base: 6, md: 0 }}
          mt={{ base: "-50px", md: 0 }}
        >
          <Box display="flex" alignItems="flex-start" gap={3} flexDirection={{ base: "column", md: "row" }} alignSelf={{ base: "center", md: "flex-start" }}>
            <MotionImage
              src="/images/point.png"
              alt="Bullet point"
              width={{ base: "40px", md: "50px" }}
              height={{ base: "40px", md: "50px" }}
              mb={{ base: 2, md: 0 }}
              alignSelf={{ base: "center", md: "flex-start" }}
              transform={{ base: "rotate(90deg)", md: "rotate(0deg)" }}
              mt={{ base: "10px", md: 0 }}
            />
            <Text 
              fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
              color="black"
              textAlign={{ base: "center", md: "left" }}
              mt={{ base: "5px", md: 0 }}
              {...textStyle}
            >
              Agent Logic Unit
            </Text>
          </Box>
          
          {/* Descriptive points */}
          <MotionBox
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            pl={{ base: 2, md: "50px" }}
            mt={{ base: -10, md: 0 }}
            width={{ base: "100%", md: "650px", lg: "750px" }}
          >
            <Text 
              fontSize={{ base: "sm", md: "lg" }}
              color="gray.600"
              mb={{ base: 4, md: 10 }}
              {...textStyle}
              lineHeight="1.5"
              fontWeight="light"
              textAlign={{ base: "center", md: "left" }}
            >
              Our innovative Agent Logic Unit handles complex reasoning, integrates with your services, and turns natural language into action—no code needed. Each workflow is validated and tested for security and reliability in mission-critical systems.
            </Text>
          </MotionBox>
        </MotionBox>

        <Container maxW="7xl" px={{ base: 3, md: 6 }} bg="gray.100" mt={{ base: 0, md: "100px" }}>
          <MotionBox
            w="full"
            maxW="7xl"
            mx="auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            bg="gray.100"
          >
            <Box 
              display="flex" 
              flexDirection={{ base: "column", md: "row" }}
              alignItems="center"
              justifyContent={{ base: "center", md: "flex-end" }}
              bg="gray.100"
              pr={{ base: 0, md: 0 }}
            >
              {/* Video Player */}
              <MotionBox
                w={{ base: "full", md: "75%" }}
                h={{ base: "180px", sm: "280px", md: "450px" }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                overflow="hidden"
                position="relative"
                bg="gray.100"
                ml={{ base: 0, md: "100px" }}
                mr={{ base: 0, md: "-200px" }}
                mt={{ base: "60px", md: "-60px" }}
              >
                <video
                  ref={videoRef}
                  controls
                  muted
                  playsInline
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover", backgroundColor: "#EDF2F7" }}
                >
                  <source src="./videos/explainer.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </MotionBox>
            </Box>
          </MotionBox>
        </Container>
      </Box>

      {/* Learn More Section */}
      <Box py={{ base: 8, md: 16 }} bg="white">
        <Container maxW="7xl" px={{ base: 4, md: 6 }}>
          <MotionBox
            w="full"
            maxW="4xl"
            mx="auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            textAlign="center"
          >
            <MotionStack spacing={{ base: 5, md: 8 }} align="center">
              <MotionText
                fontSize={{ base: "md", md: "xl", lg: "2xl" }}
                color="gray.800"
                maxW="3xl"
                textAlign="center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                px={{ base: 2, md: 0 }}
                {...textStyle}
              >
                Experience how Text2Agent can simplify your AI agent development through natural language instructions.
              </MotionText>
              <Link to="/text2agent" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Button
                  size={{ base: "md", md: "lg" }}
                  bg="black"
                  backgroundColor="black !important"
                  color="white"
                  px={{ base: 5, md: 8 }}
                  py={{ base: 4, md: 6 }}
                  width={{ base: "100%", md: "auto" }}
                  fontSize={{ base: "md", md: "lg" }}
                  border="2px solid"
                  borderColor="black"
                  borderRadius="md"
                  boxShadow="md"
                  _hover={{
                    bg: "gray.800",
                    backgroundColor: "gray.800 !important",
                    transform: "translateY(-2px)",
                    boxShadow: "lg"
                  }}
                  _active={{
                    bg: "gray.900",
                    backgroundColor: "gray.900 !important",
                    transform: "translateY(0)",
                  }}
                  _focus={{
                    boxShadow: "none",
                    outline: "none",
                    borderColor: "black",
                  }}
                  _focusVisible={{
                    boxShadow: "none",
                    outline: "none",
                    borderColor: "black",
                  }}
                  transition="all 0.2s"
                  {...boldTextStyle}
                  css={{
                    backgroundColor: 'black',
                    '&:hover': {
                      backgroundColor: '#1A202C',
                    },
                    '&:focus': {
                      boxShadow: 'none',
                      outline: 'none',
                      borderColor: 'black',
                    }
                  }}
                >
                  Learn More
                </Button>
              </Link>
            </MotionStack>
          </MotionBox>
        </Container>
      </Box>
    </LazyMotion>
  )
}

// Remove or comment out the unused features array
// const features = [
//   ...
// ];

export default Home 