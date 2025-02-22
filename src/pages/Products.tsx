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
  GridItem
} from '@chakra-ui/react'
import { FiCheck, FiArrowRight, FiGrid, FiCpu, FiDatabase, FiShield } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import React from 'react'
import Lottie from 'lottie-react'

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

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
    opacity: [0.1, 0.3, 0.1],
    scale: [1, 1.02, 1],
    transition: {
      duration: 4,
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
    opacity: [0.02, 0.04, 0.02],
    scale: 1,
    transition: {
      duration: 3,
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
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    fetch('/animations/padlock.json')
      .then(response => response.json())
      .then(data => {
        // Modify animation to play once
        data.op = 192; // Set the out point to match the animation length
        data.ip = 0;   // Set the in point

        // Change colors to purple
        const purpleColor = [150/255, 56/255, 255/255, 1];
        if (data.layers) {
          data.layers.forEach((layer: LottieLayer) => {
            if (layer.shapes) {
              layer.shapes.forEach((shape: LottieShape) => {
                if (shape.it) {
                  shape.it.forEach((item) => {
                    if (item.ty === "fl" && item.c?.k) {
                      item.c.k = purpleColor;
                    }
                    if (item.ty === "st" && item.c?.k) {
                      item.c.k = purpleColor;
                    }
                  });
                }
              });
            }
          });
        }
        setAnimationData(data);
      })
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  useEffect(() => {
    if (!lottieRef.current || !animationData || hasPlayed) return;
    
    if (shouldAnimate) {
      lottieRef.current.goToAndPlay(0, true);
      setHasPlayed(true);
    }
  }, [shouldAnimate, animationData, hasPlayed]);

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
    >
      <Box 
        width={{ base: "280px", sm: "320px", md: "400px" }}
        height={{ base: "280px", sm: "320px", md: "400px" }}
        position="relative"
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={false}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
          onComplete={() => {
            // Ensure the animation stays at its final frame
            if (lottieRef.current) {
              lottieRef.current.goToAndStop(lottieRef.current.getDuration(true), true);
            }
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
        bg="whiteAlpha.50"
        backdropFilter="blur(80px)"
        style={{ willChange: "opacity" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.3 : 0 }}
        transition={{ duration: 1.5 }}
      />

      <Container maxW="7xl" position="relative">
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: 6, md: 8 }}>
            <MotionBox variants={itemVariants}>
              <VStack spacing={{ base: 8, md: 12 }} align={{ base: "center", lg: "start" }}>
                <VStack spacing={{ base: 4, md: 6 }} textAlign={{ base: "center", lg: "left" }} align={{ base: "center", lg: "start" }}>
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
                  >
                    <Heading color="white" fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}>
                      Your Data Security Is Our Priority
                    </Heading>
                  </MotionBox>
                  <Text color="whiteAlpha.900" fontSize={{ base: "sm", md: "lg" }}>
                    We maintain the highest standards of data protection and privacy, ensuring your information remains secure and confidential at all times.
                  </Text>
                </VStack>
                
                <SimpleGrid columns={{ base: 1, md: 1 }} spacing={{ base: 4, md: 8 }} width="full">
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
                    >
                      <Box
                        p={6}
                        bg="whiteAlpha.50"
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="whiteAlpha.200"
                        position="relative"
                        backdropFilter="blur(10px)"
                        overflow="hidden"
                        style={{
                          transform: 'translate3d(0, 0, 0)',
                          backfaceVisibility: 'hidden'
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
                        <HStack spacing={4} align="start" position="relative">
                          <Icon as={item.icon} boxSize={6} color="brand.400" mt={1} />
                          <VStack align="start" spacing={2}>
                            <Heading size="sm" color="white">{item.title}</Heading>
        <Text color="whiteAlpha.800" fontSize="sm">
                              {item.description}
        </Text>
                          </VStack>
              </HStack>
                      </Box>
                    </MotionBox>
          ))}
                </SimpleGrid>
      </VStack>
    </MotionBox>
            
            <GridItem display={{ base: "block", sm: "none", lg: "block" }}>
              <MotionBox 
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
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
      .catch(error => console.error('Error loading animation:', error));
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
    >
      <Box 
        width={{ base: "280px", sm: "320px", md: "500px" }}
        height={{ base: "280px", sm: "320px", md: "500px" }}
        position="relative"
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
            transform: 'translate(-50%, -50%)'
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
      description: "Continuous monitoring and analysis of your business data, providing instant insights and recommendations."
    },
    {
      icon: FiDatabase,
      title: "Data Integration",
      description: "Seamless integration with your existing business intelligence tools and data sources."
    },
    {
      icon: FiGrid,
      title: "Predictive Analytics",
      description: "Advanced AI algorithms that forecast trends and identify opportunities before they emerge."
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
        bg="whiteAlpha.50"
        backdropFilter="blur(80px)"
        style={{ willChange: "opacity" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.3 : 0 }}
        transition={{ duration: 1.5 }}
      />

      <Container maxW="7xl" position="relative">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: 8, md: 12 }} alignItems="center">
          <GridItem order={{ base: 2, lg: 1 }}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <AgentAnimation shouldAnimate={isVisible} />
            </MotionBox>
          </GridItem>
          
          <GridItem order={{ base: 1, lg: 2 }}>
            <MotionVStack
              spacing={{ base: 6, md: 8 }}
              align={{ base: "center", lg: "start" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <VStack spacing={{ base: 3, md: 4 }} align={{ base: "center", lg: "start" }}>
                <Heading 
                  color="white" 
                  fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                  textAlign={{ base: "center", lg: "left" }}
                >
                  Holistic AI Agent for Business Intelligence
                </Heading>
                <Text 
                  color="whiteAlpha.900" 
                  fontSize={{ base: "sm", md: "lg" }}
                  textAlign={{ base: "center", lg: "left" }}
                >
                  Our AI agent works tirelessly to transform your business data into actionable insights, 
                  helping you make informed decisions and stay ahead of the competition.
      </Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, md: 1 }} spacing={{ base: 4, md: 6 }} width="full">
                {features.map((feature, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    position="relative"
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
                      p={6}
                      bg="whiteAlpha.50"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      position="relative"
                      backdropFilter="blur(10px)"
                    >
                      <HStack spacing={4} align="start">
                        <Icon as={feature.icon} boxSize={6} color="brand.400" mt={1} />
                        <VStack align="start" spacing={2}>
                          <Text color="white" fontWeight="semibold">{feature.title}</Text>
                          <Text color="whiteAlpha.800" fontSize="sm">{feature.description}</Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </MotionVStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

const HumanInLoopAnimation = ({ shouldAnimate }: { shouldAnimate: boolean }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null);
  const [animationData, setAnimationData] = useState<LottieData | null>(null);

  useEffect(() => {
    fetch('/animations/humaninloop.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
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
    >
      <Box 
        width={{ base: "280px", sm: "320px", md: "400px" }}
        height={{ base: "280px", sm: "320px", md: "400px" }}
        position="relative"
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
            transform: 'translate(-50%, -50%)'
          }}
        />
      </Box>
    </MotionBox>
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
        bg="whiteAlpha.50"
        backdropFilter="blur(80px)"
        style={{ willChange: "opacity" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.3 : 0 }}
        transition={{ duration: 1.5 }}
      />

      <Container maxW="7xl" position="relative">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: 8, md: 12 }} alignItems="center">
          <GridItem order={{ base: 1, lg: 1 }}>
            <VStack spacing={{ base: 8, md: 12 }} align={{ base: "center", lg: "start" }}>
              <VStack spacing={{ base: 3, md: 4 }} align={{ base: "center", lg: "start" }}>
                <Heading
                  color="white"
                  fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                  textAlign={{ base: "center", lg: "left" }}
                >
                  Intelligent Traceback with Human Touch
                </Heading>
                <Text
                  color="whiteAlpha.900"
                  fontSize={{ base: "sm", md: "lg" }}
                  textAlign={{ base: "center", lg: "left" }}
                >
                  Seamlessly combine AI automation with human expertise for optimal decision-making and problem-solving.
                </Text>
              </VStack>

              <SimpleGrid 
                columns={{ base: 1, md: 1 }} 
                spacing={{ base: 6, md: 8 }}
                width="full"
              >
                {[
    {
      icon: FiCpu,
                    title: "Smart Escalation",
                    description: "AI-powered decision engine automatically identifies cases requiring human expertise and routes them to the right team members."
    },
    {
      icon: FiDatabase,
                    title: "Contextual Handoff",
                    description: "Complete context preservation during AI-to-human handoffs, including full decision trails and relevant data points."
                  },
                  {
                    icon: FiGrid,
                    title: "Learning Loop",
                    description: "System continuously learns from human interventions to improve future automated decisions and reduce escalation needs."
                  }
                ].map((feature, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    position="relative"
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
                      p={6}
                      bg="whiteAlpha.50"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="whiteAlpha.200"
                      position="relative"
                      backdropFilter="blur(10px)"
                    >
                      <HStack spacing={4} align="start">
                        <Icon as={feature.icon} boxSize={6} color="brand.400" mt={1} />
                        <VStack align="start" spacing={2}>
                          <Text color="white" fontWeight="semibold">{feature.title}</Text>
                          <Text color="whiteAlpha.800" fontSize="sm">{feature.description}</Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </VStack>
          </GridItem>

          <GridItem order={{ base: 2, lg: 2 }}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <HumanInLoopAnimation shouldAnimate={isVisible} />
            </MotionBox>
          </GridItem>
        </Grid>

        <Box 
          mt={{ base: 12, md: 16 }}
          p={{ base: 6, md: 8 }}
          bg="whiteAlpha.50"
          borderRadius="xl"
          border="1px solid"
          borderColor="whiteAlpha.200"
          maxW="3xl"
          mx="auto"
          position="relative"
          backdropFilter="blur(10px)"
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
              color="white" 
              fontSize={{ base: "lg", md: "xl" }}
              textAlign="center"
            >
              When Human Expertise Matters Most
            </Heading>
            <Text 
              color="whiteAlpha.900" 
              fontSize={{ base: "sm", md: "md" }}
              textAlign="center"
            >
              Our intelligent system knows when to engage human experts for:
            </Text>
            <SimpleGrid 
              columns={{ base: 1, sm: 2 }} 
              spacing={4}
              width="full"
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
                  <Text color="white" fontSize={{ base: "sm", md: "md" }}>{item}</Text>
                </HStack>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

const Products = () => {
  return (
    <Box bg="black" minH="100vh">
      {/* Hero Section */}
      <Box 
        pt={{ base: 24, md: 32 }}
        pb={{ base: 12, md: 16 }}
        bg="linear-gradient(180deg, rgba(150, 56, 255, 0.1) 0%, rgba(0, 0, 0, 0) 100%)"
      >
        <Container maxW="7xl">
          <MotionVStack
            spacing={{ base: 4, md: 6 }}
            align="center"
            textAlign="center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Heading
              color="white"
              fontSize={{ base: "2xl", sm: "3xl", md: "5xl" }}
              fontWeight="bold"
            >
              AI-Powered Workplace Solutions
            </Heading>
            <Text
              color="whiteAlpha.900"
              fontSize={{ base: "md", md: "xl" }}
              maxW="3xl"
              px={{ base: 4, md: 0 }}
            >
              Transform your enterprise operations with our cutting-edge AI workers. 
              Streamline workflows, enhance collaboration, and drive innovation across your organization.
            </Text>
          </MotionVStack>
        </Container>
      </Box>

      {/* Security Section */}
      <SecuritySection />

      {/* Agent Section */}
      <AgentSection />

      {/* HybridOps Section */}
      <HybridOpsSection />

      {/* CTA Section */}
      <Box py={{ base: 12, md: 16 }}>
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
              color="white" 
              fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
            >
              Ready to Transform Your Workplace?
            </Heading>
            <Text 
              color="whiteAlpha.900" 
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
                rightIcon={<FiArrowRight />}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 20px rgba(150, 56, 255, 0.4)',
                }}
              >
                Schedule a Demo
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