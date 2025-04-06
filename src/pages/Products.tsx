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
  List,
  ListItem,
  ListIcon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Flex
} from '@chakra-ui/react'
import { FiCheck, FiGrid, FiCpu, FiDatabase, FiShield, FiTrendingUp, FiZap, FiTarget, FiUsers, FiRepeat, FiDollarSign } from 'react-icons/fi'
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
        bg="gray.50"
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
          <Grid 
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }} 
            gap={{ base: 6, md: 8 }}
            alignItems="center"
          >
            <GridItem>
              <VStack spacing={{ base: 8, md: 12 }} align={{ base: "center", lg: "start" }}>
                <VStack spacing={{ base: 4, md: 6 }} textAlign={{ base: "center", lg: "left" }} align={{ base: "center", lg: "start" }} width="100%">
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
                
                <SimpleGrid columns={{ base: 1, md: 1 }} spacing={{ base: 4, md: 8 }} width="100%">
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
                        bg="gray.50"
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="gray.200"
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
              </VStack>
            </GridItem>
            
            <GridItem display="flex" justifyContent="center" alignItems="center">
              <MotionBox 
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                width="100%"
                height="100%"
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
        bg="gray.50"
        backdropFilter="blur(80px)"
        style={{ willChange: "opacity" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.3 : 0 }}
        transition={{ duration: 1.5 }}
      />

      <Container maxW="8xl" position="relative" px={{ base: 4, lg: 0 }}>
        <Grid templateColumns={{ base: "1fr", lg: "0.8fr 2fr" }} gap={{ base: 8, md: 12, lg: 0 }} alignItems="center">
          <GridItem order={{ base: 2, lg: 1 }} maxW={{ base: "100%", lg: "90%" }}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <AgentAnimation shouldAnimate={isVisible} />
            </MotionBox>
          </GridItem>
          
          <GridItem order={{ base: 1, lg: 2 }} pl={{ base: 0, lg: 16 }} pr={{ lg: 0 }} display="flex" justifyContent={{ base: "center", lg: "flex-end" }}>
            <MotionVStack
              spacing={{ base: 6, md: 8 }}
              align={{ base: "center", lg: "start" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              maxW={{ lg: "80%" }}
              pr={{ lg: 0 }}
            >
              <VStack spacing={{ base: 3, md: 4 }} align={{ base: "center", lg: "start" }}>
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
                      bg="gray.50"
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="gray.200"
                      position="relative"
                      backdropFilter="blur(10px)"
                    >
                      <HStack spacing={4} align="start">
                        <Icon as={feature.icon} boxSize={6} color="brand.400" mt={1} />
                        <VStack align="start" spacing={2}>
                          <Text color="black" fontWeight="semibold">{feature.title}</Text>
                          <Text color="gray.700" fontSize="sm">{feature.description}</Text>
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

const InsightsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef as React.RefObject<HTMLElement>);

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  const insights = [
    {
      icon: FiTrendingUp,
      title: "Performance Analytics",
      description: "Real-time monitoring of key metrics and performance indicators"
    },
    {
      icon: FiZap,
      title: "Efficiency Optimization",
      description: "AI-driven recommendations for workflow improvements"
    },
    {
      icon: FiTarget,
      title: "Strategic Planning",
      description: "Data-backed insights for informed decision making"
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

      <Container maxW="100%" position="relative" px={{ base: 4, lg: 0 }} overflow="visible">
        {/* Main centered content */}
        <Box maxW="9xl" mx="auto" position="relative" overflow="visible">
          {/* Use Flexbox for direct control of layout */}
          <Flex 
            direction={{ base: "column", lg: "row" }}
            justifyContent="flex-start"
            alignItems={{ base: "center", lg: "center" }}
            overflow="visible"
            position="relative"
            width="100%"
          >
            {/* Text Content - Left Side - but aligned right */}
            <Box 
              width={{ base: "100%", lg: "35%" }}
              order={{ base: 1, lg: 1 }}
              display="flex"
              justifyContent={{ base: "center", lg: "flex-end" }}
              pr={{ lg: 8 }}
            >
              <MotionVStack
                spacing={{ base: 8, md: 10 }}
                align={{ base: "center", lg: "flex-end" }}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                width={{ base: "100%", lg: "90%" }}
              >
                <VStack spacing={{ base: 4, md: 5 }} align={{ base: "center", lg: "flex-end" }} width="100%">
                  <Heading 
                    color="black" 
                    fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                    textAlign={{ base: "center", lg: "right" }}
                  >
                    Driving Efficiency Through AI-Powered Insights
                  </Heading>
                  <Text 
                    color="gray.700" 
                    fontSize={{ base: "sm", md: "lg" }}
                    textAlign={{ base: "center", lg: "right" }}
                  >
                    Our generative AI workers continuously analyze your operations, providing actionable insights that drive measurable improvements in efficiency and value creation.
                  </Text>
                </VStack>

                <List spacing={6} width="100%">
                  {insights.map((insight, index) => (
                    <MotionBox
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.2 }}
                      width="100%"
                    >
                      <ListItem textAlign={{ lg: "right" }}>
                        <HStack spacing={5} align="flex-start" width="100%" justifyContent={{ lg: "flex-end" }}>
                          <VStack align={{ base: "flex-start", lg: "flex-end" }} spacing={2} width="auto">
                            <Text color="black" fontWeight="semibold" fontSize="md">{insight.title}</Text>
                            <Text color="gray.700" fontSize="sm" textAlign={{ lg: "right" }}>{insight.description}</Text>
                          </VStack>
                          <ListIcon as={insight.icon} color="brand.400" boxSize={6} mt={1} order={{ lg: 2 }} />
                        </HStack>
                      </ListItem>
                    </MotionBox>
                  ))}
                </List>
              </MotionVStack>
            </Box>

            {/* Chart - Right Side */}
            <Box
              width={{ base: "80%", lg: "50%" }}
              order={{ base: 2, lg: 2 }}
              position="relative"
              display="flex"
              justifyContent="flex-end"
              overflow="visible"
              pl={{ lg: 5 }}
              mr={{ lg: 0 }}
              pr={{ lg: 8 }}
            >
              <MotionBox
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
                height={{ base: "350px", lg: "450px" }}
                width={{ base: "100%", lg: "530px" }}
                position="relative"
                boxSizing="border-box"
                minWidth={{ lg: "530px" }}
                overflow="visible"
                ml="auto"
                pr={{ lg: "50px" }}
              >
                {/* Efficiency Chart */}
                <MotionBox
                  width="100%"
                  height="100%"
                  position="relative"
                  borderLeft="2px solid"
                  borderBottom="2px solid"
                  borderColor="gray.200"
                  pt={8}
                  pb={4}
                  boxShadow="lg"
                  borderRadius="md"
                  bg="white"
                  p={4}
                  minWidth="100%"
                >
                  {/* Y-axis labels */}
                  <VStack
                    position="absolute"
                    left="-10"
                    top="0"
                    height="100%"
                    justify="space-between"
                    py={4}
                    pointerEvents="none"
                  >
                    {["100%", "75%", "50%", "25%", "0%"].map((label) => (
                      <Text key={label} fontSize="xs" color="gray.500">
                        {label}
                      </Text>
                    ))}
                  </VStack>

                  {/* Chart line */}
                  <MotionBox
                    position="absolute"
                    bottom="0"
                    left="0"
                    width="100%"
                    height="100%"
                    initial={{ pathLength: 0 }}
                    animate={isVisible ? { pathLength: 1 } : {}}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  >
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <motion.path
                        d="M0,100 Q30,70 50,50 T100,0"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        initial={{ pathLength: 0 }}
                        animate={isVisible ? { pathLength: 1 } : {}}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#9638FF" stopOpacity="0.5" />
                          <stop offset="100%" stopColor="#9638FF" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </MotionBox>

                  {/* Area under the curve */}
                  <MotionBox
                    position="absolute"
                    bottom="0"
                    left="0"
                    width="100%"
                    height="100%"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 0.1 } : {}}
                    transition={{ duration: 1, delay: 1 }}
                  >
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path
                        d="M0,100 Q30,70 50,50 T100,0 V100 H0"
                        fill="url(#gradient)"
                      />
                    </svg>
                  </MotionBox>

                  {/* X-axis labels */}
                  <HStack
                    position="absolute"
                    bottom="-6"
                    width="100%"
                    justify="space-between"
                    px={4}
                    pointerEvents="none"
                  >
                    {["Week 1", "Week 4", "Week 8", "Week 12"].map((label) => (
                      <Text key={label} fontSize="xs" color="gray.500">
                        {label}
                      </Text>
                    ))}
                  </HStack>
                </MotionBox>
              </MotionBox>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

const SalesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef as React.RefObject<HTMLElement>);

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  const metrics = [
    {
      label: "Average Revenue Growth",
      value: "32%",
      increase: true,
      helpText: "Year over Year",
      icon: FiDollarSign
    },
    {
      label: "Customer Retention",
      value: "95%",
      increase: true,
      helpText: "Industry Average: 75%",
      icon: FiUsers
    },
    {
      label: "Repeat Business",
      value: "83%",
      increase: true,
      helpText: "Last 12 Months",
      icon: FiRepeat
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

      <Container maxW="7xl" position="relative">
        <VStack spacing={{ base: 8, md: 12 }} align="center">
          <MotionVStack
            spacing={{ base: 3, md: 4 }}
            align="center"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Heading 
              color="black" 
              fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
              textAlign="center"
            >
              Drive Growth and Retention
            </Heading>
            <Text 
              color="gray.700" 
              fontSize={{ base: "sm", md: "lg" }}
              textAlign="center"
              maxW="3xl"
            >
              Our AI-powered solutions help businesses achieve exceptional growth and customer satisfaction through data-driven insights and automated engagement.
            </Text>
          </MotionVStack>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 8, md: 12 }} width="full">
            {metrics.map((metric, index) => (
              <MotionBox
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Box
                  p={6}
                  bg="white"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="gray.200"
                  position="relative"
                  overflow="hidden"
                  boxShadow="xl"
                  _hover={{
                    transform: 'translateY(-2px)',
                    transition: 'transform 0.2s ease-in-out'
                  }}
                >
                  <MotionBox
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="brand.400"
                    opacity={0.03}
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  />
                  <VStack spacing={3} align="center" position="relative">
                    <Icon as={metric.icon} boxSize={8} color="brand.400" />
                    <Stat textAlign="center">
                      <StatLabel fontSize="lg" color="gray.600">{metric.label}</StatLabel>
                      <MotionBox
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 + index * 0.2 }}
                      >
                        <StatNumber 
                          fontSize="4xl" 
                          fontWeight="bold" 
                          color="black"
                          bgGradient="linear(to-r, brand.400, purple.600)"
                          bgClip="text"
                        >
                          {metric.value}
                        </StatNumber>
                      </MotionBox>
                      <StatHelpText>
                        <StatArrow type={metric.increase ? 'increase' : 'decrease'} />
                        {metric.helpText}
                      </StatHelpText>
                    </Stat>
                  </VStack>
                </Box>
              </MotionBox>
            ))}
          </SimpleGrid>
        </VStack>
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
        <Box
          p={{ base: 6, md: 8 }}
          bg="gray.50"
          borderRadius="xl"
          border="1px solid"
          borderColor="gray.200"
          position="relative"
          overflow="hidden"
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
                  <Text color="black" fontSize={{ base: "sm", md: "md" }}>{item}</Text>
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
  // Add refs for each section
  const heroRef = useRef<HTMLDivElement>(null);
  const securityRef = useRef<HTMLDivElement>(null);
  const agentRef = useRef<HTMLDivElement>(null);
  const insightsRef = useRef<HTMLDivElement>(null);
  const salesRef = useRef<HTMLDivElement>(null);
  const hybridOpsRef = useRef<HTMLDivElement>(null);
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
      const duration = 1000; // 1 second animation

      // Animation function
      function animate(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth motion
        const ease = (t: number): number => t < 0.5 
          ? 4 * t * t * t 
          : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        
        const easedProgress = ease(progress);
        window.scrollTo(0, startPos + (targetPos - startPos) * easedProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Allow scrolling again after a small delay
          setTimeout(() => {
            isScrolling = false;
            activeSection = target;
          }, 100);
        }
      }
      
      requestAnimationFrame(animate);
    };

    // Configure the intersection observer
    const observerOptions = {
      root: null, // Use viewport as root
      rootMargin: '-30% 0px -30% 0px', // Trigger when element is 30% in view
      threshold: [0.1, 0.2, 0.3], // Multiple thresholds for better detection
    };

    // Handle intersection changes
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isScrolling) return;
      
      const now = Date.now();
      // Only proceed if enough time has passed since last scroll
      if (now - lastScrollTime < 800) return;
      
      // Find the most visible entry
      let bestEntry: IntersectionObserverEntry | null = null;
      let highestRatio = 0;
      
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
          highestRatio = entry.intersectionRatio;
          bestEntry = entry;
        }
      });
      
      // Scroll to the most visible entry if it's different from active section
      if (bestEntry && (bestEntry as IntersectionObserverEntry).target !== activeSection) {
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
      insightsRef,
      salesRef,
      hybridOpsRef,
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
    <Box bg="white" minH="100vh">
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

      {/* Insights Section */}
      <Box 
        ref={insightsRef}
        py={{ base: 8, md: 16 }} 
        position="relative" 
        overflow="hidden"
        minH="100vh"
        display="flex"
        alignItems="center"
      >
        <InsightsSection />
      </Box>

      {/* Sales Section */}
      <Box 
        ref={salesRef}
        py={{ base: 8, md: 16 }} 
        position="relative" 
        overflow="hidden"
        minH="100vh"
        display="flex"
        alignItems="center"
      >
        <SalesSection />
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