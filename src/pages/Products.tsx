import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  Button,
  HStack,
  Grid,
  GridItem,
  Flex,
  Image
} from '@chakra-ui/react'
import { FiCheck, FiGrid, FiCpu, FiDatabase, FiShield, FiTrendingUp, FiZap, FiTarget } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import React from 'react'
import Lottie from 'lottie-react'

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

// Common text style to be used across all text components
const textStyle = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  letterSpacing: "0.2px"
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const glowVariants = {
  hidden: {
    opacity: 0,
    scale: 1
  },
  visible: {
    opacity: [0.05, 0.1, 0.05],
    scale: [1, 1.01, 1],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};

const borderGlowVariants = {
  hidden: { 
    opacity: 0,
    scale: 1
  },
  visible: {
    opacity: [0.01, 0.02, 0.01],
    scale: 1,
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror"
    }
  }
};

interface LottieShape {
  it?: Array<{
    ty: string;
    c?: { k: number[] };
  }>;
}

interface LottieLayer {
  shapes?: LottieShape[];
}

interface LottieData {
  layers?: LottieLayer[];
  op?: number;
  ip?: number;
}

const SecurityAnimation = ({ shouldAnimate }: { shouldAnimate: boolean }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null);
  const [animationData, setAnimationData] = useState<LottieData | null>(null);

  useEffect(() => {
    fetch('/animations/padlock.json')
      .then(response => response.json())
      .then(data => {
        if (typeof data === 'object' && data !== null) {
          setAnimationData(data);
        }
      })
      .catch(() => {
        // Animation load error handled silently
      });
  }, []);

  useEffect(() => {
    if (!lottieRef.current || !animationData) return;
    
    if (shouldAnimate) {
      lottieRef.current.play();
    }
  }, [shouldAnimate, animationData]);

  return (
    <MotionBox
      width="100%" 
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        y: shouldAnimate ? [0, -10, 0] : 0
      }}
      transition={{ 
        opacity: { duration: 0.5 },
        y: { 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }
      }}
      overflow="visible"
    >
      <Box 
        width={{ base: "240px", sm: "280px", md: "320px" }}
        height={{ base: "240px", sm: "280px", md: "320px" }}
        position="relative"
        overflow="visible"
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 'none',
            minWidth: '100%',
            minHeight: '100%'
          }}
        />
      </Box>
    </MotionBox>
  );
};

const SecuritySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef as React.RefObject<HTMLElement>);

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <Box py={{ base: 8, md: 16 }} position="relative" ref={sectionRef} overflow="visible" pr={{ base: 0, lg: "0" }}>
      {/* Background layers */}
      <MotionBox
        position="absolute"
        top="50%"
        left="50%"
        width="130%"
        height="130%"
        style={{ 
          translateX: "-50%", 
          translateY: "-50%",
          filter: "blur(20px)",
          willChange: "transform"
        }}
        bgGradient="radial(circle at center, rgba(150, 56, 255, 0.08), transparent 70%)"
        variants={glowVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      />
      <MotionBox
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="transparent"
        backdropFilter="blur(3px)"
        style={{ willChange: "opacity" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.15 : 0 }}
        transition={{ duration: 1 }}
      />

      <Container maxW="100%" position="relative" overflow="visible">
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          overflow="visible"
        >
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={{ base: 8, md: 12 }}
            alignItems="center"
            width="100%"
            overflow="visible"
          >
            <GridItem>
              <VStack spacing={{ base: 6, md: 8 }} textAlign={{ base: "center", lg: "left" }} align={{ base: "center", lg: "start" }} width={{ base: "100%", lg: "95%" }} maxW={{ lg: "700px" }} ml={{ base: 0, lg: "150px" }}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  width="100%"
                >
                  <Heading color="black" fontSize={{ base: "xl", sm: "2xl", md: "3xl" }} width="100%">
                    Your Data Security Is Our Priority
                  </Heading>
                </MotionBox>
                <Text color="gray.700" fontSize={{ base: "sm", md: "lg" }} width="100%" pr={{ base: 0, lg: 0 }} {...textStyle}>
                  We maintain the highest standards of data protection and privacy, ensuring your information remains secure and confidential at all times.
                </Text>
              </VStack>
              
              <SimpleGrid columns={{ base: 1, md: 1 }} spacing={{ base: 6, md: 8 }} width={{ base: "100%", lg: "95%" }} maxW={{ lg: "700px" }} ml={{ lg: "150px" }} mt={{ base: 10, md: 12 }}>
                {[
                  {
                    icon: FiShield,
                    title: "No Training on Your Data",
                    description: "We never use your data to train our AI models. Your information remains exclusively for your use, maintaining complete data sovereignty."
                  },
                  {
                    icon: FiDatabase,
                    title: "Enterprise-Grade Encryption",
                    description: "Your data is protected with AES-256 encryption at rest and TLS 1.3 encryption in transit, ensuring end-to-end security for all your information and communications."
                  }
                ].map((item, index) => (
                  <MotionBox
                    key={index}
                    variants={itemVariants}
                    position="relative"
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    mb={{ base: 4, md: 6 }}
                  >
                    <Box
                      p={{ base: 5, md: 6 }}
                      bg="transparent"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="gray.200"
                      position="relative"
                      backdropFilter="blur(3px)"
                      overflow="hidden"
                      height="auto"
                      minHeight={{ base: "180px", md: "150px" }}
                      display="flex"
                      alignItems="center"
                      width="100%"
                      style={{
                        transform: 'translate3d(0, 0, 0)',
                        backfaceVisibility: 'hidden',
                        willChange: 'transform'
                      }}
                    >
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        borderRadius="xl"
                        opacity={0.05}
                        bg="brand.400"
                        style={{
                          transform: 'translate3d(0, 0, 0)',
                          backfaceVisibility: 'hidden'
                        }}
                      />
                      <HStack spacing={{ base: 4, md: 6 }} align="start" position="relative" width="100%">
                        <Icon as={item.icon} boxSize={{ base: 8, md: 6 }} color="brand.400" mt={1} flexShrink={0} />
                        <VStack align="start" spacing={{ base: 2, md: 2 }} width="100%">
                          <Text 
                            {...textStyle}
                            color="black" 
                            fontSize={{ base: "lg", md: "xl" }} 
                            mb={2} 
                            fontWeight="bold"
                          >
                            {item.title}
                          </Text>
                          <Text {...textStyle} color="gray.700" fontSize={{ base: "sm", md: "sm" }} lineHeight="1.6">{item.description}</Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </GridItem>
            
            <GridItem display="flex" justifyContent="center" alignItems="center" overflow="visible" position="relative">
              <MotionBox 
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                width="100%"
                height="100%"
                ml={{ base: 0, lg: "200px" }}
                mr={{ base: 0, lg: "100px" }}
                overflow="visible"
                position="relative"
                zIndex={10}
              >
                <SecurityAnimation shouldAnimate={isVisible} />
              </MotionBox>
            </GridItem>
          </Grid>
        </MotionBox>
      </Container>
    </Box>
  );
};

const AgentAnimation = ({ shouldAnimate }: { shouldAnimate: boolean }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null);
  const [animationData, setAnimationData] = useState<LottieData | null>(null);

  useEffect(() => {
    fetch('/animations/agent.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(() => {
        // Animation load error handled silently
      });
  }, []);

  useEffect(() => {
    if (!lottieRef.current || !animationData) return;
    
    if (shouldAnimate) {
      lottieRef.current.goToAndPlay(0, true);
    }
  }, [shouldAnimate, animationData]);

  return (
    <MotionBox 
      width="100%" 
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: shouldAnimate ? 1 : 0,
        scale: shouldAnimate ? 1 : 0.95
      }}
      transition={{ 
        duration: 0.8,
        ease: "easeOut"
      }}
      overflow="visible"
      maxWidth="600px"
      maxHeight="600px"
      mx="auto"
    >
      <Box 
        width={{ base: "280px", sm: "600px", md: "500px" }}
        height={{ base: "280px", sm: "400px", md: "500px" }}
        position="relative"
        overflow="visible"
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 'none',
            minWidth: '100%',
            minHeight: '100%'
          }}
        />
      </Box>
    </MotionBox>
  );
};

const AgentSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef as React.RefObject<HTMLElement>);

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  const features = [
    {
      icon: FiCpu,
      title: "Real-time Analysis",
      description: "Continuous monitoring of your business data, providing instant insights and actionable recommendations."
    },
    {
      icon: FiDatabase,
      title: "Data Integration",
      description: "Seamless connection with your existing business tools and data sources for unified analysis."
    },
    {
      icon: FiGrid,
      title: "Predictive Analytics",
      description: "Advanced AI algorithms that identify emerging trends and opportunities before they become apparent."
    }
  ];

  return (
    <Box py={{ base: 8, md: 16 }} position="relative" ref={sectionRef} overflow="hidden">
      {/* Background layers */}
      <MotionBox
        position="absolute"
        top="50%"
        left="50%"
        width="130%"
        height="130%"
        style={{ 
          translateX: "-50%", 
          translateY: "-50%",
          filter: "blur(20px)",
          willChange: "transform"
        }}
        bgGradient="radial(circle at center, rgba(150, 56, 255, 0.08), transparent 70%)"
        variants={glowVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      />
      <MotionBox
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="transparent"
        backdropFilter="blur(3px)"
        style={{ willChange: "opacity" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.15 : 0 }}
        transition={{ duration: 1 }}
      />

      <Container maxW="100%" position="relative" px={{ base: 4, lg: 0 }} overflow="hidden">
        <Box position="relative" width="100%" maxW={{ base: "100%", lg: "2000px" }} mx="auto" pr={{ lg: "100px" }}> 
          <Flex direction={{ base: "column", lg: "row" }} alignItems="center" justifyContent="flex-start">
            {/* Animation on the left */}
            <Box 
              width={{ base: "100%", lg: "40%" }} 
              position={{ lg: "relative" }} 
              left={{ base: "auto", lg: "100px" }} 
              top={{ base: "auto", lg: "auto" }} 
              transform={{ base: "none", lg: "none" }}
              mx="auto"
              px={{ base: 4, md: 0 }}
            >
              <MotionBox
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
                width={{ base: "100%", md: "100%" }}
              >
                <AgentAnimation shouldAnimate={isVisible} />
              </MotionBox>
            </Box>
            
            {/* Content on the right */}
            <Box width={{ base: "100%", lg: "70%" }} mx="auto" mr={{ base: 0, lg: "0" }} pr={{ lg: "50px" }}>
              <Flex width="100%" justifyContent="flex-start">
                <Box width={{ base: "100%", lg: "auto" }} pl={{ base: 0, lg: "550px" }}>
                  <MotionVStack
                    spacing={{ base: 6, md: 8 }}
                    align={{ base: "center", lg: "start" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    width={{ base: "100%", lg: "auto" }}
                    minW={{ lg: "650px" }}
                    maxW={{ lg: "750px" }}
                    pr={{ base: 0, lg: "20px" }}
                  >
                    <VStack spacing={{ base: 3, md: 4 }} align={{ base: "center", lg: "start" }} width="100%" mb={2}>
                      <Heading 
                        color="black" 
                        fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                        textAlign={{ base: "center", lg: "left" }}
                      >
                        Holistic AI Agent for Business Intelligence
                      </Heading>
                      <Text 
                        {...textStyle}
                        color="gray.700" 
                        fontSize={{ base: "sm", md: "lg" }}
                        textAlign={{ base: "center", lg: "left" }}
                        maxW="3xl"
                        mb={2}
                      >
                        Our AI agent works tirelessly to transform your business data into actionable insights, 
                        helping you make informed decisions and stay ahead of the competition.
                      </Text>
                    </VStack>

                    <VStack spacing={{ base: 8, md: 10 }} width="100%">
                      {features.map((feature, index) => (
                        <MotionBox
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isVisible ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                          position="relative"
                          width="100%"
                          mb={{ base: 4, md: 6 }}
                        >
                          <MotionBox
                            position="absolute"
                            top={-1}
                            left={-1}
                            right={-1}
                            bottom={-1}
                            borderRadius="xl"
                            border="1px solid"
                            borderColor="brand.400"
                            variants={borderGlowVariants}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            style={{ 
                              filter: "blur(4px)",
                              willChange: "opacity, filter"
                            }}
                          />
                          <Box
                            p={{ base: 5, md: 6 }}
                            bg="transparent"
                            borderRadius="xl"
                            border="1px solid"
                            borderColor="gray.200"
                            position="relative"
                            backdropFilter="blur(3px)"
                            overflow="hidden"
                            height="auto"
                            minHeight="auto"
                            width="100%"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            boxShadow="sm"
                            _hover={{
                              transform: 'translateY(-2px)',
                              boxShadow: 'md',
                              transition: 'all 0.2s ease-in-out'
                            }}
                            style={{
                              transform: 'translate3d(0, 0, 0)',
                              backfaceVisibility: 'hidden'
                            }}
                          >
                            <HStack spacing={{ base: 4, md: 6 }} align="center" width="100%">
                              <Icon as={feature.icon} boxSize={{ base: 8, md: 8 }} color="brand.400" flexShrink={0} />
                              <Box width="100%">
                                <Text 
                                  {...textStyle}
                                  color="black" 
                                  fontSize={{ base: "lg", md: "xl" }} 
                                  mb={2} 
                                  fontWeight="bold"
                                >
                                  {feature.title}
                                </Text>
                                <Text {...textStyle} color="gray.700" fontSize={{ base: "md", md: "md" }} lineHeight="1.6">{feature.description}</Text>
                              </Box>
                            </HStack>
                          </Box>
                        </MotionBox>
                      ))}
                    </VStack>
                  </MotionVStack>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

const HybridOpsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef as React.RefObject<HTMLElement>);

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  return (
    <Box py={{ base: 10, md: 16 }} ref={sectionRef} overflow="visible">
      <Container maxW="7xl" overflow="visible">
        <Flex 
          direction={{ base: "column", md: "row" }} 
          alignItems="flex-start"
          justifyContent="space-between"
          width="100%"
          gap={{ base: 8, md: 12 }}
          pr={{ md: "-100px" }}
          overflow="visible"
        >
          {/* Left column with all text content */}
          <Box width={{ base: "100%", md: "65%" }} px={{ base: 4, md: 0 }}>
            <MotionVStack
              spacing={{ base: 3, md: 4 }}
              align={{ base: "center", md: "flex-start" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              mb={8}
              ml={{ base: 0, md: "150px" }}
            >
              <Heading 
                color="black" 
                fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                textAlign={{ base: "center", md: "left" }}
              >
                Human in the Loop Every Step of the Way
              </Heading>
              <Text 
                {...textStyle}
                color="gray.700" 
                fontSize={{ base: "sm", md: "lg" }}
                textAlign={{ base: "center", md: "left" }}
                maxW="3xl"
              >
                Our intelligent systems work hand-in-hand with human expertise, creating a powerful partnership that delivers the best of both worlds.
              </Text>
            </MotionVStack>
            
            <Box
              p={{ base: 6, md: 8 }}
              bg="transparent"
              borderRadius="xl"
              border="1px solid"
              borderColor="gray.200"
              position="relative"
              overflow="hidden"
              ml={{ base: 0, md: "150px" }}
              width="full"
            >
              <MotionBox
                position="absolute"
                top={-1}
                left={-1}
                right={-1}
                bottom={-1}
                borderRadius="xl"
                border="1px solid"
                borderColor="brand.400"
                variants={borderGlowVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                style={{ 
                  filter: "blur(4px)",
                  willChange: "opacity, filter"
                }}
              />
              <VStack spacing={4} position="relative">
                <Heading 
                  color="black" 
                  fontSize={{ base: "lg", md: "xl" }}
                  textAlign="center"
                >
                  When Human Expertise Matters Most
                </Heading>
                <Text 
                  {...textStyle}
                  color="gray.700" 
                  fontSize={{ base: "sm", md: "md" }}
                  textAlign="center"
                >
                  Our intelligent system knows when to engage human experts for:
                </Text>
                <SimpleGrid 
                  columns={{ base: 1, sm: 2 }} 
                  spacing={6}
                  width="full"
                  px={{ base: 4, md: 0 }}
                >
                  {[
                    "Complex Decision Making",
                    "Strategic Planning",
                    "Relationship Building",
                    "Creative Problem Solving",
                    "Risk Assessment",
                    "Ethical Considerations"
                  ].map((item, index) => (
                    <HStack key={index} spacing={3}>
                      <Icon as={FiCheck} color="brand.400" />
                      <Text color="black" fontSize={{ base: "sm", md: "md" }} {...textStyle}>{item}</Text>
                    </HStack>
                  ))}
                </SimpleGrid>
              </VStack>
            </Box>
          </Box>
          
          {/* Right column with image */}
          <Box 
            width={{ base: "100%", md: "50%" }} 
            position="relative"
            zIndex={20}
            overflow="visible"
          >
            <MotionBox
              initial={{ opacity: 0, x: 20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              width="100%"
              position="relative"
              mx="auto"
              ml={{ base: 0, lg: "400px" }}
              mr={{ base: 0, lg: "-550px" }}
              zIndex={20}
              overflow="visible"
            >
              {/* Top right corner decoration */}
              <Box
                position="absolute"
                top="-30px"
                right="0px"
                width="30px"
                height="30px"
                zIndex={60}
                transform="rotate(0deg)"
              >
                <Image 
                  src="/images/corner.png" 
                  alt="Top right corner decoration"
                  width="100%"
                  height="100%"
                  opacity={0.7}
                />
              </Box>
              
              {/* Bottom left corner decoration */}
              <Box
                position="absolute"
                bottom="10px"
                left={{ base: "10px", md: "0px" }}
                width="30px"
                height="30px"
                zIndex={22}
                transform="rotate(270deg) scaleX(-1)"
              >
                <Image 
                  src="/images/corner.png" 
                  alt="Corner decoration"
                  width="100%"
                  height="100%"
                  opacity={0.7}
                />
              </Box>
              
              <Box 
                as="img"
                src="/images/HIL.png"
                alt="Human-in-the-Loop"
                maxH={{ base: "300px", md: "450px" }}
                width="auto"
                maxWidth="100%"
                objectFit="contain"
                borderRadius="md"
                position="relative"
                zIndex={21}
                mx="auto"
                display="block"
                mt="40px"
                overflow="visible"
              />
            </MotionBox>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

const ReportSnippetSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef as React.RefObject<HTMLElement>);

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  return (
    <Box py={{ base: 8, md: 16 }} position="relative" ref={sectionRef} overflow="visible">
      <MotionBox
        position="absolute"
        top="50%"
        left="50%"
        width="130%"
        height="130%"
        style={{ 
          translateX: "-50%", 
          translateY: "-50%",
          filter: "blur(20px)",
          willChange: "transform"
        }}
        bgGradient="radial(circle at center, rgba(150, 56, 255, 0.08), transparent 70%)"
        variants={glowVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      />
      
      {/* Use grid layout instead of flex */}
      <Grid 
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={{ base: 8, md: 0 }}
        width="100%"
        maxW="100%"
        mx="auto"
        px={{ base: 4, md: 0 }}
        overflow="visible"
      >
        {/* Left column - Images */}
        <GridItem 
          colSpan={1} 
          display="flex"
          justifyContent="flex-start"
          ml={{ base: 0, md: "5%" }}
          order={{ base: 2, md: 1 }}
        >
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            position="relative"
            width={{ base: "100%", md: "110%" }}
            overflow="visible"
          >
            <Flex 
              direction={{ base: "column", sm: "row" }} 
              gap={6}
              justify="center"
              overflow="visible"
            >
              <Box width={{ base: "100%", sm: "55%" }}>
                <Image
                  src="/images/report.png"
                  alt="Full Report"
                  borderRadius="lg"
                  boxShadow="xl"
                  width="100%"
                  height="auto"
                  ml="0px"
                  transform="scale(1.12)"
                />
              </Box>
              <Flex 
                direction="column" 
                width={{ base: "100%", sm: "55%" }}
                gap={4}
              >
                <Image
                  src="/images/report_snippet.png"
                  alt="Report Snippet"
                  borderRadius="lg"
                  boxShadow="xl"
                  width="100%"
                  height="auto"
                  mt="0px"
                  ml="60px"
                  transform="scale(1.12)"
                />
                {/* Cascading charts effect */}
                <Box 
                  position="relative"
                  mt="40px"
                  ml="60px"
                  height="400px"
                  width="100%"
                >
                  <MotionBox
                    position="absolute"
                    top="0px"
                    left="0px"
                    width="90%"
                    zIndex={3}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Image
                      src="/images/plot1.png"
                      alt="Data Plot 1"
                      borderRadius="lg"
                      boxShadow="xl"
                      width="100%"
                      height="auto"
                    />
                  </MotionBox>
                  
                  <MotionBox
                    position="absolute"
                    top="60px"
                    left="30px"
                    width="90%"
                    zIndex={2}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Image
                      src="/images/plot2.png"
                      alt="Data Plot 2"
                      borderRadius="lg"
                      boxShadow="xl"
                      width="100%"
                      height="auto"
                    />
                  </MotionBox>
                  
                  <MotionBox
                    position="absolute"
                    top="20px"
                    left="70px"
                    width="85%"
                    zIndex={1}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <Image
                      src="/images/plot3.png"
                      alt="Data Plot 3"
                      borderRadius="lg"
                      boxShadow="xl"
                      width="100%"
                      height="auto"
                    />
                  </MotionBox>
                </Box>
              </Flex>
            </Flex>
          </MotionBox>
        </GridItem>

        {/* Right column - Text content */}
        <GridItem 
          colSpan={1} 
          display="flex" 
          justifyContent="flex-end"
          alignItems="center"
          pr={{ base: 0, md: "8%" }}
          order={{ base: 1, md: 2 }}
          mt={{ base: 0, md: "-100px" }}
        >
          <MotionVStack
            spacing={6}
            align={{ base: "center", md: "start" }}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeInUp}
            width={{ base: "100%", md: "90%" }}
            mr={{ md: "-60px" }}
          >
            <Heading
              as="h2"
              color="black"
              fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
              fontWeight="bold"
              textAlign={{ base: "center", md: "left" }}
            >
              Detailed Reports
            </Heading>
            <Text 
              {...textStyle}
              color="gray.700" 
              fontSize={{ base: "sm", md: "lg" }} 
              textAlign={{ base: "center", md: "left" }}
            >
              Get comprehensive insights with our detailed reporting system. Track progress, analyze data, and make informed decisions with our intuitive reporting interface.
            </Text>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} w="full">
              <HStack spacing={3}>
                <Icon as={FiCheck} color="brand.400" />
                <Text color="gray.700" {...textStyle}>Real-time Analytics</Text>
              </HStack>
              <HStack spacing={3}>
                <Icon as={FiCheck} color="brand.400" />
                <Text color="gray.700" {...textStyle}>Customizable Reports</Text>
              </HStack>
              <HStack spacing={3}>
                <Icon as={FiCheck} color="brand.400" />
                <Text color="gray.700" {...textStyle}>Export Options</Text>
              </HStack>
              <HStack spacing={3}>
                <Icon as={FiCheck} color="brand.400" />
                <Text color="gray.700" {...textStyle}>Visual Dashboards</Text>
              </HStack>
            </SimpleGrid>
          </MotionVStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

const ActionPlanSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef as React.RefObject<HTMLElement>);

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  const features = [
    {
      icon: FiTarget,
      title: "Drive Growth and Retention",
      description: "Our AI-powered solutions help you identify and target high-value customers, increase engagement, and retain existing customers."
    },
    {
      icon: FiZap,
      title: "Optimize Operations",
      description: "Streamline your business processes, reduce manual work, and improve efficiency with our intelligent automation tools."
    },
    {
      icon: FiTrendingUp,
      title: "Stay Ahead of the Curve",
      description: "Leverage real-time insights and predictive analytics to anticipate market trends and make informed decisions."
    }
  ];

  return (
    <Box py={{ base: 8, md: 16 }} position="relative" ref={sectionRef} overflow="visible">
      {/* Background layers */}
      <MotionBox
        position="absolute"
        top="50%"
        left="50%"
        width="130%"
        height="130%"
        style={{ 
          translateX: "-50%", 
          translateY: "-50%",
          filter: "blur(20px)",
          willChange: "transform"
        }}
        bgGradient="radial(circle at center, rgba(150, 56, 255, 0.08), transparent 70%)"
        variants={glowVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      />
      <MotionBox
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="transparent"
        backdropFilter="blur(80px)"
        style={{ willChange: "opacity" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.3 : 0 }}
        transition={{ duration: 1.5 }}
      />

      <Container maxW="100%" position="relative" px={{ base: 4, lg: 0 }} overflow="hidden">
        <Box position="relative" width="100%" maxW={{ base: "100%", lg: "2000px" }} mx="auto" pr={{ lg: "100px" }}> 
          <Flex direction={{ base: "column", md: "row" }} alignItems="center" overflow="visible">
            {/* Content on the left */}
            <Box width={{ base: "100%", md: "50%" }} ml={{ base: 0, md: "150px" }} px={{ base: 4, md: 0 }}>
              <MotionVStack
                spacing={{ base: 4, md: 6 }}
                align={{ base: "center", md: "flex-start" }}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                width="100%"
              >
                <Heading 
                  color="black" 
                  fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                  textAlign={{ base: "center", md: "left" }}
                >
                  Action Plan for Business Success
                  <Box
                    position="absolute"
                    top="-15px"
                    right="-30px"
                    width="25px"
                    height="25px"
                    zIndex={5}
                  >
                    <Image 
                      src="/images/corner.png" 
                      alt="Heading corner decoration"
                      width="100%"
                      height="100%"
                      opacity={0.7}
                    />
                  </Box>
                </Heading>
                <Text 
                  {...textStyle}
                  color="gray.700" 
                  fontSize={{ base: "sm", md: "lg" }}
                  textAlign={{ base: "center", md: "left" }}
                  maxW="3xl"
                >
                  Our AI-powered solutions help you drive growth, optimize operations, and stay ahead of the curve.
                </Text>

                <VStack spacing={{ base: 8, md: 10 }} width="100%">
                  {features.map((feature, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      position="relative"
                      width="100%"
                      mb={{ base: 4, md: 6 }}
                    >
                      <MotionBox
                        position="absolute"
                        top={-1}
                        left={-1}
                        right={-1}
                        bottom={-1}
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="brand.400"
                        variants={borderGlowVariants}
                        initial="hidden"
                        animate={isVisible ? "visible" : "hidden"}
                        style={{ 
                          filter: "blur(4px)",
                          willChange: "opacity, filter"
                        }}
                      />
                      <Box
                        p={{ base: 5, md: 6 }}
                        bg="transparent"
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="gray.200"
                        position="relative"
                        backdropFilter="blur(3px)"
                        overflow="hidden"
                        height="auto"
                        minHeight={{ base: "180px", md: "150px" }}
                        display="flex"
                        alignItems="center"
                        width="100%"
                        style={{
                          transform: 'translate3d(0, 0, 0)',
                          backfaceVisibility: 'hidden',
                          willChange: 'transform'
                        }}
                      >
                        <HStack spacing={{ base: 4, md: 6 }} align="center" width="100%">
                          <Icon as={feature.icon} boxSize={{ base: 8, md: 8 }} color="brand.400" flexShrink={0} />
                          <Box width="100%">
                            <Text 
                              {...textStyle}
                              color="black" 
                              fontSize={{ base: "lg", md: "xl" }} 
                              mb={2} 
                              fontWeight="bold"
                            >
                              {feature.title}
                            </Text>
                            <Text {...textStyle} color="gray.700" fontSize={{ base: "md", md: "md" }} lineHeight="1.6">{feature.description}</Text>
                          </Box>
                        </HStack>
                      </Box>
                    </MotionBox>
                  ))}
                </VStack>
              </MotionVStack>
            </Box>
            
            {/* Animation on the right */}
            <Box 
              width={{ base: "100%", md: "50%" }} 
              ml={{ base: 0, md: "auto" }} 
              mr={{ base: 0, md: "0" }}
              px={{ base: 4, md: 0 }}
              mx={{ base: "auto", md: "auto" }}
              position={{ md: "relative" }}
              right={{ base: 0, md: "0" }}
              zIndex={20}
              overflow="visible"
            >
              {/* Static corner decorations that should stay fixed in place */}
              <Box
                position="absolute"
                top="320px"
                right="150px"
                width="30px"
                height="30px"
                zIndex={60}
                transform="rotate(0deg)"
              >
                <Image 
                  src="/images/corner.png" 
                  alt="Top right corner decoration"
                  width="100%"
                  height="100%"
                  opacity={0.7}
                />
              </Box>
              
              
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                width={{ base: "100%", md: "150%" }}
                position="relative"
                mx="auto"
                ml={{ base: 0, lg: "0" }}
                mr={{ base: 0, lg: "0" }}
                zIndex={20}
                overflow="visible"
              >
                {/* Top right corner decoration */}
                <Box
                  position="absolute"
                  top="335px"
                  right="80px"
                  width="60px"
                  height="60px"
                  zIndex={40}
                >
                  <Image 
                    src="/images/corner.png" 
                    alt="Top corner decoration"
                    width="100%"
                    height="100%"
                    opacity={1}
                  />
                </Box>
                
                {/* Bottom left corner decoration */}
                <Box
                  position="absolute"
                  bottom="10px"
                  left={{ base: "30px", md: "220px" }}
                  width="30px"
                  height="30px"
                  zIndex={22}
                  transform="rotate(270deg) scaleX(-1)"
                >
                  <Image 
                    src="/images/corner.png" 
                    alt="Corner decoration"
                    width="100%"
                    height="100%"
                    opacity={0.7}
                  />
                </Box>
                
                <Box 
                  as="img"
                  src="/images/action_plan.png"
                  alt="Action Plan"
                  maxH="550px"
                  width="auto"
                  maxWidth="100%"
                  objectFit="contain"
                  borderRadius="md"
                  position="relative"
                  zIndex={21}
                  ml={{ base: 0, md: "200px" }}
                  display="block"
                  mt="350px"
                  mb="400px"
                  overflow="visible"
                />
              </MotionBox>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

const Products = () => {
  // Add refs for each section
  const heroRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<HTMLDivElement>(null);
  const hybridOpsRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const actionPlanRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Enhanced scroll to top on page refresh/load
  useEffect(() => {
    // Set scroll restoration to auto to allow browser's normal scrolling behavior
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'auto';
    }
    
    return () => {
      // No cleanup needed
    };
  }, []);

  useEffect(() => {
    // Flag to track if we're currently scrolling
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling) {
        isScrolling = true;
      }

      if (window.scrollY === 0) {
        isScrolling = false;
      }
    };

    const handleScrollEnd = () => {
      if (isScrolling) {
        isScrolling = false;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scrollend', handleScrollEnd);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scrollend', handleScrollEnd);
    };
  }, []);

  return (
    <Box bg="transparent" minH="100vh" overflow="hidden">
      {/* Hero Section */}
      <Box 
        ref={heroRef}
        pt={{ base: 24, md: 32 }}
        pb={{ base: 12, md: 16 }}
        bg="linear-gradient(180deg, rgba(150, 56, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)"
        minH="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        position="relative"
        overflow="hidden"
      >
        <Container 
          maxW="7xl" 
          bg="transparent"
          backdropFilter="none"
          boxShadow="none"
          px={{ base: 4, md: 6 }}
          mx="auto"
          sx={{
            '&.css-4zvfi5': {
              background: 'transparent !important',
              backdropFilter: 'none !important',
              boxShadow: 'none !important'
            }
          }}
        >
          <MotionVStack
            spacing={{ base: 6, md: 8 }}
            align="center"
            textAlign="center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            bg="transparent"
            backdropFilter="none"
            pt={{ base: 16, md: 32 }}
            width="100%"
          >
            <Heading
              color="black"
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
              fontWeight="bold"
              bgColor="transparent"
              backdropFilter="none"
              textShadow="none"
              px={{ base: 4, md: 0 }}
              py={0}
              lineHeight="1.2"
            >
              AI-Powered Workplace Solutions
            </Heading>
            <Text
              {...textStyle}
              color="gray.700"
              fontSize={{ base: "lg", md: "xl" }}
              maxW="3xl"
              px={{ base: 4, md: 0 }}
              bgColor="transparent"
              backdropFilter="none"
              lineHeight="1.6"
            >
              Transform your enterprise operations with our cutting-edge AI workers. 
              Streamline workflows, enhance collaboration, and drive innovation across your organization.
            </Text>
          </MotionVStack>
        </Container>

        {/* Animated Down Arrows */}
        <Box width="100%" mb={16}>
          <MotionBox
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {[0, 1, 2].map((index) => (
              <MotionBox
                key={index}
                fontSize="40px"
                lineHeight="1.2"
                mb={2}
                color="brand.400"
                variants={{
                  initial: { opacity: 0, y: -10 },
                  animate: {
                    opacity: [0, 1, 0],
                    y: [0, 5, 0],
                    transition: {
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                      delay: index * 0.2,
                    },
                  },
                }}
              >
                ↓
              </MotionBox>
            ))}
          </MotionBox>
        </Box>
      </Box>

      {/* Security Section */}
      <Box 
        ref={securityRef}
        py={{ base: 8, md: 16 }} 
        position="relative" 
        overflow="hidden"
        minH="100vh"
        display="flex"
        alignItems="center"
      >
        <SecuritySection />
      </Box>

      {/* Agent Section */}
      <Box 
        ref={agentRef}
        py={{ base: 8, md: 16 }} 
        position="relative" 
        overflow="hidden"
        minH="100vh"
        display="flex"
        alignItems="center"
      >
        <AgentSection />
      </Box>

      {/* HybridOps Section */}
      <Box 
        ref={hybridOpsRef}
        py={{ base: 10, md: 16 }}
        minH="100vh"
        display="flex"
        alignItems="center"
        overflow="hidden"
      >
        <HybridOpsSection />
      </Box>

      {/* Report Snippet Section */}
      <Box 
        ref={reportRef}
        py={{ base: 8, md: 16 }} 
        position="relative" 
        overflow="hidden"
        minH="100vh"
        display="flex"
        alignItems="center"
      >
        <ReportSnippetSection />
      </Box>

      {/* Action Plan Section */}
      <Box 
        ref={actionPlanRef}
        py={{ base: 8, md: 16 }} 
        position="relative" 
        overflow="hidden"
        minH="100vh"
        display="flex"
        alignItems="center"
      >
        <ActionPlanSection />
      </Box>

      {/* CTA Section */}
      <Box 
        ref={ctaRef}
        py={{ base: 12, md: 16 }}
        minH="100vh"
        display="flex"
        alignItems="center"
        overflow="hidden"
      >
        <Container maxW="7xl">
          <MotionVStack 
            spacing={{ base: 6, md: 8 }}
            align="center" 
            textAlign="center"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            px={{ base: 4, md: 0 }}
          >
            <Heading 
              color="black" 
              fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
            >
              Ready to Transform Your Workplace?
            </Heading>
            <Text 
              {...textStyle}
              color="gray.700" 
              fontSize={{ base: "sm", md: "lg" }} 
              maxW="2xl"
            >
              Join leading enterprises in revolutionizing their operations with our AI workers.
              Get started today and experience the future of work.
            </Text>
            <Link to="/contact">
              <Button
                size={{ base: "md", md: "lg" }}
                colorScheme="brand"
                color="white !important"
                bg="brand.400 !important"
                fontWeight="bold"
                px={6}
                py={3}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(150, 56, 255, 0.4)',
                  bg: 'brand.500 !important',
                }}
                style={{ color: 'white' }}
              >
                Schedule a Demo →
              </Button>
            </Link>
          </MotionVStack>
        </Container>
      </Box>

      <ScrollToTop />
    </Box>
  );
};

export default Products; 