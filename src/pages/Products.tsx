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

  useEffect(() => {
    fetch('/animations/padlock.json')
      .then(response => response.json())
      .then(data => {
        // No longer modify animation to play once - let it loop
        // data.op = 192; 
        // data.ip = 0;   

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
    <Box py={{ base: 8, md: 16 }} position="relative" ref={sectionRef} overflow="visible" pr={{ lg: "80px" }}>
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

      <Container maxW="7xl" position="relative" overflow="visible">
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <Grid 
            templateColumns={{ base: "1fr", lg: "5fr 7fr" }} 
            gap={{ base: 6, md: 8 }}
            alignItems="center"
          >
            <GridItem>
              <VStack spacing={{ base: 4, md: 6 }} textAlign={{ base: "center", lg: "left" }} align={{ base: "center", lg: "start" }} width="100%" ml={{ lg: "150px" }}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  width="100%"
                >
                  <Heading color="black" fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}>
                    Your Data Security Is Our Priority
                  </Heading>
                </MotionBox>
                <Text color="gray.700" fontSize={{ base: "sm", md: "lg" }}>
                  We maintain the highest standards of data protection and privacy, ensuring your information remains secure and confidential at all times.
                </Text>
              </VStack>
              
              <SimpleGrid columns={{ base: 1, md: 1 }} spacing={{ base: 4, md: 8 }} width="100%" ml={{ lg: "150px" }}>
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
                      bg="transparent"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="gray.200"
                      position="relative"
                      backdropFilter="blur(10px)"
                      overflow="hidden"
                      height="150px"
                      display="flex"
                      alignItems="center"
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
                          <Heading size="sm" color="black">{item.title}</Heading>
                          <Text color="gray.700" fontSize="sm">
                            {item.description}
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </MotionBox>
                ))}
              </SimpleGrid>
            </GridItem>
            
            <GridItem display="flex" justifyContent="center" alignItems="center">
              <MotionBox 
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                width="100%"
                height="100%"
                ml={{ lg: "200px" }}
                mr={{ lg: "-550px" }}
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
        width={{ base: "280px", sm: "320px", md: "450px" }}
        height={{ base: "280px", sm: "320px", md: "450px" }}
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

      <Container maxW="100%" position="relative" px={{ base: 4, lg: 4 }} overflow="visible">
        <Box position="relative" width="100%"> 
          <Flex direction={{ base: "column", lg: "row" }} alignItems="center">
            {/* Animation on the left */}
            <Box width={{ base: "100%", lg: "30%" }} position={{ lg: "absolute" }} left="50px" top="50%" transform={{ lg: "translateY(-50%)" }}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
                width={{ base: "100%", md: "90%" }}
              >
                <AgentAnimation shouldAnimate={isVisible} />
              </MotionBox>
            </Box>
            
            {/* Content on the right */}
            <Box width={{ base: "100%", lg: "80%" }} ml={{ lg: "20%" }} mr={{ lg: "0" }}>
              <MotionVStack
                spacing={{ base: 6, md: 8 }}
                align={{ base: "center", lg: "start" }}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                width="100%"
                pl={{ lg: "500px" }}
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

                <VStack spacing={6} width="100%">
                  {features.map((feature, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      position="relative"
                      width="100%"
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
                        bg="transparent"
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="gray.200"
                        position="relative"
                        backdropFilter="blur(10px)"
                        overflow="visible"
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
                        <HStack spacing={6} align="center" width="100%">
                          <Icon as={feature.icon} boxSize={8} color="brand.400" flexShrink={0} />
                          <Box width="100%">
                            <Text color="black" fontWeight="bold" fontSize={{ base: "lg", md: "xl" }} mb={2}>{feature.title}</Text>
                            <Text color="gray.700" fontSize={{ base: "md", md: "md" }} lineHeight="1.5">{feature.description}</Text>
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
    <Box py={{ base: 10, md: 16 }} ref={sectionRef}>
      <Container maxW="7xl">
        <Flex 
          direction={{ base: "column", md: "row" }} 
          alignItems="flex-start"
          justifyContent="space-between"
        >
          {/* Left column with all text content */}
          <Box width={{ base: "100%", md: "65%" }}>
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
                      <Text color="black" fontSize={{ base: "sm", md: "md" }}>{item}</Text>
                    </HStack>
                  ))}
                </SimpleGrid>
              </VStack>
            </Box>
          </Box>
          
          {/* Right column with image */}
          <Box 
            display={{ base: 'none', md: 'block' }} 
            width="35%" 
            position="relative"
            alignSelf="center"
            mr="-400px"
          >
            <MotionBox
              initial={{ opacity: 0, x: 20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              overflow="visible"
              position="relative"
            >
              {/* Top right corner decoration */}
              <Box
                position="absolute"
                top="-10px"
                right="5px"
                width="30px"
                height="30px"
                zIndex={2}
              >
                <Image 
                  src="/images/corner.png" 
                  alt="Corner decoration"
                  width="100%"
                  height="100%"
                  opacity={0.7}
                />
              </Box>
              
              {/* Bottom left corner decoration */}
              <Box
                position="absolute"
                bottom="10px"
                left="-50px"
                width="30px"
                height="30px"
                zIndex={2}
                transform="rotate(180deg)"
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
                maxH="450px"
                width="auto"
                objectFit="contain"
                borderRadius="md"
                position="relative"
                zIndex={1}
              />
            </MotionBox>
          </Box>
        </Flex>
      </Container>
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

      <Container maxW="100%" position="relative" px={{ base: 4, lg: 4 }} overflow="visible">
        <Box position="relative" width="100%"> 
          <Flex direction={{ base: "column", md: "row" }} alignItems="center">
            {/* Content on the left */}
            <Box width={{ base: "100%", md: "50%" }} ml={{ md: "150px" }}>
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
                </Heading>
                <Text 
                  color="gray.700" 
                  fontSize={{ base: "sm", md: "lg" }}
                  textAlign={{ base: "center", md: "left" }}
                  maxW="3xl"
                >
                  Our AI-powered solutions help you drive growth, optimize operations, and stay ahead of the curve.
                </Text>

                <VStack spacing={6} width="100%">
                  {features.map((feature, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      position="relative"
                      width="100%"
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
                        bg="transparent"
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="gray.200"
                        position="relative"
                        backdropFilter="blur(10px)"
                        overflow="visible"
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
                        <HStack spacing={6} align="center" width="100%">
                          <Icon as={feature.icon} boxSize={8} color="brand.400" flexShrink={0} />
                          <Box width="100%">
                            <Text color="black" fontWeight="bold" fontSize={{ base: "lg", md: "xl" }} mb={2}>{feature.title}</Text>
                            <Text color="gray.700" fontSize={{ base: "md", md: "md" }} lineHeight="1.5">{feature.description}</Text>
                          </Box>
                        </HStack>
                      </Box>
                    </MotionBox>
                  ))}
                </VStack>
              </MotionVStack>
            </Box>
            
            {/* Animation on the right */}
            <Box width={{ base: "100%", md: "50%" }} ml={{ md: "auto" }} mr={{ md: "-350px" }}>
              <MotionBox
                initial={{ opacity: 0, x: 20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                width="100%"
                position="relative"
                right="100px"
              >
                {/* Top right corner decoration */}
                <Box
                  position="absolute"
                  top="-10px"
                  right="280px"
                  width="30px"
                  height="30px"
                  zIndex={2}
                >
                  <Image 
                    src="/images/corner.png" 
                    alt="Corner decoration"
                    width="100%"
                    height="100%"
                    opacity={0.7}
                  />
                </Box>
                
                {/* Bottom left corner decoration */}
                <Box
                  position="absolute"
                  bottom="10px"
                  left="-10px"
                  width="30px"
                  height="30px"
                  zIndex={2}
                  transform="rotate(180deg)"
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
                  objectFit="contain"
                  borderRadius="md"
                  position="relative"
                  zIndex={1}
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
  const actionPlanRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Flag to track if we're currently scrolling
    let isScrolling = false;
    // Track last scroll time to prevent rapid scrolling
    let lastScrollTime = 0;
    // Track the currently active section
    let activeSection: Element | null = null;

    // Smooth scroll to target element
    const smoothScrollTo = (target: Element) => {
      if (isScrolling) return;
      
      isScrolling = true;
      const startPos = window.pageYOffset;
      const targetPos = target.getBoundingClientRect().top + startPos;
      const startTime = performance.now();
      const duration = 1200; // 1.2 second animation for smoother transition

      // Animation function
      function animate(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Improved easing function for smoother motion
        const ease = (t: number): number => {
          // Cubic bezier curve approximation for smoother scrolling
          return t < 0.5 
            ? 4 * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
        
        const easedProgress = ease(progress);
        window.scrollTo({
          top: startPos + (targetPos - startPos) * easedProgress,
          behavior: 'auto' // We're handling the smoothness ourselves
        });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Allow scrolling again after animation completes
          setTimeout(() => {
            isScrolling = false;
            activeSection = target;
          }, 50);
        }
      }
      
      requestAnimationFrame(animate);
    };

    // Configure the intersection observer with more sensitivity
    const observerOptions = {
      root: null, // Use viewport as root
      rootMargin: '-20% 0px -20% 0px', // Less restrictive threshold (was -30%)
      threshold: [0.1, 0.2, 0.3, 0.4, 0.5], // More threshold points for smoother detection
    };

    // Handle intersection changes
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isScrolling) return;
      
      const now = Date.now();
      // Reduced cooldown between scrolls for more responsive feel
      if (now - lastScrollTime < 500) return;
      
      // Find the most visible entry
      let bestEntry: IntersectionObserverEntry | null = null;
      let highestRatio = 0;
      
      entries.forEach(entry => {
        // intersectionRatio is a standard property on IntersectionObserverEntry
        if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
          highestRatio = entry.intersectionRatio;
          bestEntry = entry;
        }
      });
      
      // Only scroll if the intersection ratio is significant enough
      if (bestEntry && highestRatio > 0.15 && 
        (bestEntry as IntersectionObserverEntry).target !== activeSection) {
        lastScrollTime = now;
        smoothScrollTo((bestEntry as IntersectionObserverEntry).target);
      }
    };

    // Create observer
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    // Observe all section refs
    const sections = [
      heroRef,
      securityRef,
      agentRef,
      hybridOpsRef,
      actionPlanRef,
      ctaRef
    ];
    
    sections.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box bg="transparent" minH="100vh">
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
      >
        <Container 
          maxW="7xl" 
          bg="transparent"
          backdropFilter="none"
          boxShadow="none"
          sx={{
            '&.css-4zvfi5': {
              background: 'transparent !important',
              backdropFilter: 'none !important',
              boxShadow: 'none !important'
            }
          }}
        >
          <MotionVStack
            spacing={{ base: 4, md: 6 }}
            align="center"
            textAlign="center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            bg="transparent"
            backdropFilter="none"
            pt={{ base: 20, md: 32 }}
          >
            <Heading
              color="black"
              fontSize={{ base: "2xl", sm: "3xl", md: "5xl" }}
              fontWeight="bold"
              bgColor="transparent"
              backdropFilter="none"
              textShadow="none"
              px={0}
              py={0}
            >
              AI-Powered Workplace Solutions
            </Heading>
            <Text
              color="gray.700"
              fontSize={{ base: "md", md: "xl" }}
              maxW="3xl"
              px={{ base: 4, md: 0 }}
              bgColor="transparent"
              backdropFilter="none"
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
      >
        <HybridOpsSection />
      </Box>

      {/* Action Plan Section */}
      <Box 
        ref={actionPlanRef}
        py={{ base: 8, md: 16 }} 
        position="relative" 
        overflow="visible"
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