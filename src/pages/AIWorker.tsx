import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  VStack,
  HStack,
  Button,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
  Flex,
} from '@chakra-ui/react';
import { FiCheck, FiArrowRight, FiGrid, FiUser, FiMail, FiMessageSquare, FiBriefcase } from 'react-icons/fi';
import { 
  SiSlack, 
  SiSalesforce,
  SiZendesk
} from 'react-icons/si';
import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';
import { motion } from 'framer-motion';
import { FaSlack, FaMicrosoft, FaJira } from 'react-icons/fa';
import ScrollToTop from '../components/ScrollToTop'

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

interface IntegrationCardProps {
  icon: React.ElementType;
  title: string;
  features: string[];
}

const IntegrationCard = ({ icon, title, features }: IntegrationCardProps) => {
  return (
    <Box
      bg="gray.50"
      p={{ base: 4, md: 6 }}
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.200"
      _hover={{
        transform: 'translateY(-5px)',
        transition: 'transform 0.2s',
        borderColor: 'brand.400'
      }}
      w="100%"
    >
      <Icon as={icon} boxSize={{ base: 8, md: 10 }} color="brand.400" mb={{ base: 3, md: 4 }} />
      <Heading size={{ base: "sm", md: "md" }} mb={{ base: 3, md: 4 }} color="black" {...headingStyle}>
        {title}
      </Heading>
      <VStack align="start" spacing={{ base: 2, md: 3 }}>
        {features.map((feature, index) => (
          <HStack key={index} color="gray.700">
            <Icon as={FiCheck} color="green.500" boxSize={{ base: 4, md: 5 }} />
            <Text fontSize={{ base: "sm", md: "md" }} {...textStyle}>{feature}</Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

const DemoRequestModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.target as HTMLFormElement;
      
      await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        form,
        EMAILJS_CONFIG.PUBLIC_KEY,
      );
      
      toast({
        title: "Demo Request Received!",
        description: "We'll get back to you within 24 hours to schedule your demo.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      form.reset();
      onClose();
    } catch {
      toast({
        title: "Error sending request",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay backdropFilter="blur(10px)" />
      <ModalContent bg="white" color="black">
        <ModalHeader {...headingStyle}>Request a Demo</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel {...textStyle}>Name</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiUser color="gray.500" />
                  </InputLeftElement>
                  <Input
                    name="from_name"
                    placeholder="Your name"
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: 'brand.400' }}
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                    {...textStyle}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel {...textStyle}>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiMail color="gray.500" />
                  </InputLeftElement>
                  <Input
                    name="from_email"
                    type="email"
                    placeholder="your.email@company.com"
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: 'brand.400' }}
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                    {...textStyle}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel {...textStyle}>Company</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiBriefcase color="gray.500" />
                  </InputLeftElement>
                  <Input
                    name="company"
                    placeholder="Your company name"
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: 'brand.400' }}
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                    {...textStyle}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel {...textStyle}>Message</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiMessageSquare color="gray.500" />
                  </InputLeftElement>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your needs..."
                    bg="gray.50"
                    border="1px solid"
                    borderColor="gray.200"
                    _hover={{ borderColor: 'brand.400' }}
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                    pl={10}
                    minH="150px"
                    {...textStyle}
                  />
                </InputGroup>
              </FormControl>

              {/* Hidden input for recipient email */}
              <Input
                type="hidden"
                name="to_email"
                value="info@m3labs.co.uk"
              />

              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                width="full"
                mt={4}
                isLoading={isSubmitting}
                color="black"
                bg="#9638FF"
                border="2px solid #000000"
                fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
                letterSpacing="0.2px"
                fontWeight="bold"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(150, 56, 255, 0.3)',
                  bg: "#8228EF"
                }}
              >
                Submit Request
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

// Styled components with motion
const MotionBox = motion(Box);

const ConnectorFlow = () => {
  const iconSize = useBreakpointValue({ base: 12, md: 24 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on initial load
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Run on initial load
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <Box position="relative" h={{ base: "400px", md: "450px" }} w="100%" mt={0} overflow="visible" zIndex={5}>
      <Text color="gray.600" fontSize="sm" textAlign="center" mb={4}>
        These are just some of our supported connectors. Contact us to learn more about all available integrations.
      </Text>
      <HStack spacing={0} w="100%" h="100%" position="relative" overflow="visible" zIndex={5}>
        {/* Left Side - Services */}
        <Box flex={{ base: "1", md: "1.5" }} h="100%" position="relative" zIndex={10}>
          <VStack spacing={{ base: 15, md: 18 }} h="100%" justify="flex-start" pl={{ base: 2, md: 12 }} pt={{ base: 20, md: 30 }}>
            {[
              { icon: FaSlack, color: "#E01E5A", name: "Slack" },
              { icon: FaMicrosoft, color: "#00A4EF", name: "Microsoft" },
              { icon: SiZendesk, color: "#03363D", name: "Zendesk" },
              { icon: FaJira, color: "#0052CC", name: "Jira" },
            ].map((item, index) => (
              <HStack key={index} w="100%" spacing={{ base: 0, md: 0 }} position="relative">
                {/* Service Icon */}
                <Box
                  as={MotionBox}
                  p={{ base: 2, md: 4 }}
                  bg="gray.50"
                  backdropFilter="blur(8px)"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="gray.200"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ 
                    x: 0,
                    opacity: 1
                  }}
                  transition="0.5s ease-out"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                  _hover={{
                    transform: "translateX(5px)",
                    boxShadow: `0 0 30px ${item.color}30`,
                    borderColor: item.color
                  }}
                  zIndex={20}
                >
                  <Box as={item.icon} fontSize={iconSize} color={item.color} />
                </Box>

                {/* Connection Line */}
                <Box flex="1" position="relative" ml={0} display={{ base: "block", md: "block" }}>
                  <MotionBox
                    position="absolute"
                    top="50%"
                    left="-8px"
                    right={{ base: "-100px", md: "-320px" }}
                    height="2px"
                    bg={`linear-gradient(to right, ${item.color}, ${item.color})`}
                    style={{
                      transformOrigin: "left center",
                      transform: index === 0 
                        ? `rotate(${-75 + (isMobile ? 10 : 0)}deg) translateY(${isMobile ? -50 : -60}px)` 
                        : index === 3 
                          ? `rotate(${-225 + (isMobile ? 15 : 0)}deg) translateY(${isMobile ? -180 : -220}px)`
                          : `rotate(${-100 + (index * (isMobile ? 15 : 15))}deg) translateY(${isMobile ? (-110 - (index * 30)) : (-140 - (index * 35))}px)`,
                      zIndex: 25
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ 
                      scaleX: 1,
                      opacity: 1
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 0.3
                    }}
                  >
                    {/* Animated Particles */}
                    {[...Array(3)].map((_, i) => (
                      <MotionBox
                        key={i}
                        position="absolute"
                        left="0"
                        top="-2px"
                        width={{ base: "3px", md: "4px" }}
                        height={{ base: "3px", md: "4px" }}
                        borderRadius="full"
                        bg={item.color}
                        animate={{
                          left: ["0%", "100%"],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5 + index * 0.2,
                          ease: "linear"
                        }}
                      />
                    ))}
                  </MotionBox>
                </Box>
              </HStack>
            ))}
          </VStack>
        </Box>

        {/* Right Side - AI Platform */}
        <Box flex="1" h="100%" position="relative" zIndex={10}>
          <MotionBox
            position={{ base: "absolute", md: "absolute" }}
            right={{ base: "5px", md: 16 }}
            top={{ base: "16%", md: "1%" }}
            transform={{ base: "none", md: "none" }}
            width={{ base: "120px", md: "280px" }}
            height={{ base: "200px", md: "350px" }}
            bg="white"
            backdropFilter="blur(8px)"
            borderRadius="2xl"
            border="1px solid"
            borderColor="black"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={{ base: 4, md: 8 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            overflow={{ base: "hidden", md: "visible" }}
            boxShadow="lg"
            zIndex={30}
          >
            {/* Task Processing Animation */}
            <Box 
              position="absolute" 
              top="0" 
              left="0" 
              right="0"
              bottom="0" 
              pointerEvents="none"
              overflow="hidden"
            >
              {[...Array(4)].map((_, index) => {
                // Calculate different positions for each task
                const positions = [
                  { left: "20%", top: "35%" },
                  { left: "60%", top: "45%" },
                  { left: "30%", top: "75%" },
                  { left: "50%", top: "65%" }
                ];
                
                return (
                  <MotionBox
                    key={index}
                    position="absolute"
                    left={positions[index].left}
                    top={positions[index].top}
                    width={{ base: "80px", md: "130px" }}
                    height={{ base: "24px", md: "38px" }}
                    bg="white"
                    backdropFilter="blur(4px)"
                    borderRadius="lg"
                    border="2px solid"
                    borderColor="black"
                    initial={{ 
                      opacity: 0,
                      scale: 0.8
                    }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0.8, 1, 0.8],
                      x: ["-10%", "10%", "-10%"],
                      y: ["-5%", "5%", "-5%"]
                    }}
                    transition={{
                      duration: 3,
                      delay: index * 0.8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <HStack 
                      spacing={{ base: 1.5, md: 2 }}
                      p={{ base: 1.5, md: 2.5 }}
                      align="center"
                      h="100%"
                    >
                      <Box 
                        w={{ base: "5px", md: "8px" }}
                        h={{ base: "5px", md: "8px" }}
                        borderRadius="full" 
                        bg="#9638FF"
                        boxShadow="0 0 10px rgba(150, 56, 255, 1)"
                      />
                      <Box 
                        flex="1" 
                        h={{ base: "6px", md: "8px" }}
                        bg="transparent" 
                        borderRadius="full"
                        overflow="hidden"
                        position="relative"
                        border="1px solid rgba(150, 56, 255, 0.5)"
                      >
                        {/* Background track */}
                        <Box
                          position="absolute"
                          top={0}
                          left={0}
                          right={0}
                          bottom={0}
                          bg="rgba(0, 0, 0, 0.05)"
                        />
                        
                        {/* Animated fill */}
                        <MotionBox
                          h="100%"
                          bg="#9638FF"
                          borderRadius="full"
                          position="absolute"
                          left={0}
                          top={0}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: 2,
                            ease: "linear",
                            repeat: Infinity,
                            repeatType: "loop",
                            repeatDelay: 0.2
                          }}
                          transformOrigin="left center"
                          boxShadow="0 0 8px rgba(150, 56, 255, 0.8)"
                        />
                        
                        {/* Shimmer effect */}
                        <MotionBox
                          position="absolute"
                          top={0}
                          left={0}
                          right={0}
                          bottom={0}
                          pointerEvents="none"
                          backgroundImage="linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{
                            duration: 1,
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "loop",
                            repeatDelay: 0.5
                          }}
                        />
                      </Box>
                      <Text 
                        color="gray.800" 
                        fontSize={{ base: "6px", md: "10px" }} 
                        fontFamily="mono"
                        display={{ base: "none", md: "block" }}
                        fontWeight="bold"
                      >
                        {["Processing", "Analyzing", "Learning", "Optimizing"][index]}
                      </Text>
                    </HStack>
                  </MotionBox>
                );
              })}
            </Box>

            <Icon 
              as={FiGrid} 
              color="black" 
              fontSize={{ base: "32px", md: "56px" }}
              position="relative"
              zIndex={10}
            />
            <VStack 
              spacing={{ base: 0.5, md: 2 }} 
              position="relative" 
              zIndex={11} 
              bg="white" 
              px={{ base: 2, md: 4 }} 
              py={{ base: 1, md: 2 }} 
              borderRadius="md" 
              boxShadow="sm" 
              border="1px solid" 
              borderColor="gray.100" 
              mt={{ base: 1, md: 2 }}
              width={{ base: "80px", md: "auto" }}
              textAlign="center"
              mx="auto"
            >
              <Text 
                color="black" 
                fontSize={{ base: "xs", md: "2xl" }} 
                fontWeight="bold" 
                lineHeight="shorter"
                textAlign="center"
              >
                AI Worker
              </Text>
            </VStack>
          </MotionBox>
        </Box>
      </HStack>
    </Box>
  );
};

const AIWorker = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  // Add refs for each section
  const heroRef = useRef<HTMLDivElement>(null);
  const integrationsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Add state for screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on initial load
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Run on initial load
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Auto-play the video when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Video autoplay failed:", error);
      });
    }

    // Clean up on unmount
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <Box 
      bg="white" 
      minH="100vh" 
      pt="64px" 
      overflow="hidden" 
      borderTop="0" 
      borderBottom="0"
      borderLeft="0"
      borderRight="0"
      border="0"
      style={{ 
        border: "none !important", 
        borderTop: "none !important",
        borderBottom: "none !important",
        borderLeft: "none !important",
        borderRight: "none !important",
        boxShadow: "none !important"
      }}
      position="relative"
    >
      {/* Full-width overlay to hide any top lines */}
      <Box 
        position="absolute"
        top="0"
        left="0"
        right="0"
        height="20px"
        bg="white"
        zIndex="9999"
      />
      
      <DemoRequestModal isOpen={isOpen} onClose={onClose} />
      
      {/* Fixed Background Video - Only on Desktop */}
      {!isMobile && (
        <Box 
          width="100%" 
          height="110vh"
          position="fixed"
          top="0"
          left="0"
          right="0"
          zIndex="1"
          overflow="hidden"
          bg="#f5f5f5"
        >
          <video 
            ref={videoRef}
            src="./videos/herbup.mov"
            controls={false}
            autoPlay
            muted
            playsInline
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '100%',
              height: '92%',
              objectFit: 'cover',
              objectPosition: 'center 35%',
              filter: 'contrast(1.03) brightness(1.02) saturate(1.03)',
              willChange: 'transform',
              transformOrigin: 'center center'
            }}
          />
        </Box>
      )}
      
      {/* Spacer to push content below the fixed video - Only on Desktop */}
      {!isMobile && <Box height="105vh" />}
      
      {/* Content Container with semi-transparent background */}
      <Box
        position="relative"
        zIndex="2"
        bgGradient={!isMobile ? "linear(to-b, rgba(255,255,255,0.85), white 300px)" : undefined}
        bg={isMobile ? "white" : undefined}
        borderTopRadius={!isMobile ? { base: "2xl", md: "3xl" } : undefined}
        mt={!isMobile ? { base: "-80px", md: "-110px" } : "0"}
        pt={isMobile ? "70px" : "0"}
        backdropFilter={!isMobile ? "blur(12px)" : undefined}
        boxShadow={!isMobile ? "0 -10px 30px rgba(0,0,0,0.15)" : undefined}
        transition="all 0.3s ease-in-out"
      >
        {/* Hero Section */}
        <Box
          ref={heroRef}
          bg="white"
          py={{ base: 6, md: 10 }}  
          minH={{ base: "70vh", md: "80vh" }}
          display="flex"
          alignItems="flex-start"  
          paddingTop={{ base: "-10px", md: "80px" }}
          width="100%"
          overflow="hidden"
          mb={{ base: -50, md: -70 }}
          borderTop="0"
          style={{ borderTop: "none !important" }}
        >
          <Container maxW="6xl" px={{ base: 4, md: 6 }}>
            <VStack spacing={{ base: 4, md: 6 }} align="center" textAlign="center" mb={{ base: 6, md: 8 }}>
              <Badge
                colorScheme="purple"
                px={3}
                py={1}
                borderRadius="full"
                textTransform="uppercase"
                fontSize={{ base: "xs", md: "sm" }}
                {...textStyle}
              >
                Enterprise Ready
              </Badge>
              <Heading
                size={{ base: "xl", md: "2xl" }}
                color="black"
                fontWeight="bold"
                lineHeight="shorter"
                px={{ base: 2, md: 0 }}
                {...headingStyle}
              >
                Text2Agent Factory for{' '}
                <Text as="span" color="brand.400" {...headingStyle}>
                  Real-Time AI Workflows
                </Text>
              </Heading>
              <Text 
                fontSize={{ base: "lg", md: "xl" }} 
                color="gray.800" 
                maxW="2xl" 
                {...textStyle}
              >
                Herb instantly transforms natural language into custom AI agent workflows—built in real time and fully integrated with your enterprise tools to boost productivity and streamline operations.
              </Text>
            </VStack>
            
            {/* Two column section - custom flex instead of SimpleGrid */}
            <Flex 
              direction={{ base: "column", md: "row" }} 
              align="center" 
              justify="center"
              width="100%"
              position="relative"
              border="0 !important"
              borderTop="0 !important"
              style={{ border: "none !important", borderTop: "none !important" }}
            ></Flex>
          </Container>
        </Box>

        {/* Integrations Grid */}
        <Box
          ref={integrationsRef}
          minH="60vh"
          display="flex"
          alignItems="flex-start"
          pt={{ base: 0, md: 0 }}
          pb={{ base: 8, md: 10 }}
          style={{ marginTop: "-400px" }}
        >
          <Container maxW="6xl" px={{ base: 4, md: 6 }} pt={{ base: 0, md: 0 }}>
            <VStack spacing={{ base: 4, md: 6 }} align="stretch">
              <Box textAlign="center" mt={{ base: 0, md: 0 }}>
                <Heading color="black" size={{ base: "lg", md: "xl" }} mb={{ base: 2, md: 4 }} {...headingStyle}>
                  Enterprise Integrations
                </Heading>
                <Text color="gray.700" fontSize={{ base: "md", md: "lg" }} maxW="2xl" mx="auto" {...textStyle}>
                  Connect your AI workers with industry-leading platforms
                </Text>
              </Box>
              <Box px={{ base: 4, md: 6 }}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 4, md: 6 }}>
                  <IntegrationCard
                    icon={FiGrid}
                    title="Microsoft 365"
                    features={[
                      "Smart email management",
                      "Teams collaboration",
                      "SharePoint integration",
                      "OneDrive automation"
                    ]}
                  />
                  <IntegrationCard
                    icon={SiSlack}
                    title="Slack"
                    features={[
                      "Real-time analysis",
                      "Channel management",
                      "Smart notifications",
                      "Workflow automation"
                    ]}
                  />
                  <IntegrationCard
                    icon={SiSalesforce}
                    title="Salesforce"
                    features={[
                      "Lead scoring",
                      "Opportunity tracking",
                      "Sales analytics",
                      "Report automation"
                    ]}
                  />
                  <IntegrationCard
                    icon={SiZendesk}
                    title="Zendesk"
                    features={[
                      "Ticket automation",
                      "Smart ticket routing",
                      "Customer insights",
                      "Support analytics"
                    ]}
                  />
                </SimpleGrid>
              </Box>

              <Box mb={{ base: 5, md: 10 }}>
                <ConnectorFlow />
              </Box>
            </VStack>
          </Container>
        </Box>

        {/* Testimonials Section */}
        <Box 
          ref={testimonialsRef}
          py={{ base: 8, md: 10 }} 
          position="relative" 
          overflow="hidden"
          style={{ marginTop: "-150px" }}
          minH="85vh"
          display="flex"
          alignItems="center"
        >
          {/* Background Gradient Effect */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="100%"
            height="100%"
            background="white"
            pointerEvents="none"
          />

          <Container maxW="6xl" px={{ base: 4, md: 6 }} position="relative">
            <VStack spacing={{ base: 10, md: 16 }}>
              <VStack spacing={{ base: 3, md: 4 }} textAlign="center" mt={{ base: "70px", md: 0 }}>
                <Heading color="black" size={{ base: "lg", md: "xl" }} {...headingStyle}>
                  Trusted by Industry Leaders
                </Heading>
                <Text color="gray.700" fontSize={{ base: "md", md: "lg" }} maxW="2xl" {...textStyle}>
                  Hear what our enterprise partners say about M3Labs AI Workers
                </Text>
              </VStack>

              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 6, md: 8 }} w="full">
                {/* LSEG Testimonial */}
                <Box
                  bg="gray.50"
                  p={{ base: 6, md: 8 }}
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor="gray.200"
                  position="relative"
                  _hover={{
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.3s',
                    borderColor: 'brand.400'
                  }}
                >
                  {/* Quote Mark */}
                  <Box
                    position="absolute"
                    top={4}
                    left={4}
                    fontSize={{ base: "4xl", md: "6xl" }}
                    color="brand.400"
                    opacity={0.3}
                    lineHeight={1}
                  >
                    "
                  </Box>
                  
                  <VStack align="start" spacing={{ base: 4, md: 6 }}>
                    <Text color="gray.700" fontSize={{ base: "md", md: "lg" }} pt={8} fontStyle="italic" {...textStyle}>
                      AI Workers represent the future of enterprise automation. The potential for improving data processing accuracy and workflow efficiency is immense. I believe organizations that adopt this technology early will have a significant competitive advantage.
                    </Text>
                    
                    <HStack spacing={4} pt={{ base: 2, md: 4 }}>
                      <Box
                        bg="brand.400"
                        borderRadius="full"
                        p={1}
                        width={{ base: "40px", md: "48px" }}
                        height={{ base: "40px", md: "48px" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize={{ base: "lg", md: "xl" }}
                        color="white"
                        {...boldTextStyle}
                      >
                        SJ
                      </Box>
                      <Box>
                        <Text color="gray.800" fontSize="sm" {...textStyle}>
                          Senior Technology Manager, LSEG
                        </Text>
                      </Box>
                    </HStack>
                  </VStack>
                </Box>

                {/* Grant Thornton Testimonial */}
                <Box
                  bg="gray.50"
                  p={{ base: 6, md: 8 }}
                  borderRadius="2xl"
                  border="1px solid"
                  borderColor="gray.200"
                  position="relative"
                  _hover={{
                    transform: 'translateY(-5px)',
                    transition: 'transform 0.3s',
                    borderColor: 'brand.400'
                  }}
                >
                  {/* Quote Mark */}
                  <Box
                    position="absolute"
                    top={4}
                    left={4}
                    fontSize={{ base: "4xl", md: "6xl" }}
                    color="brand.400"
                    opacity={0.3}
                    lineHeight={1}
                  >
                    "
                  </Box>
                  
                  <VStack align="start" spacing={{ base: 4, md: 6 }}>
                    <Text color="gray.700" fontSize={{ base: "md", md: "lg" }} pt={8} fontStyle="italic" {...textStyle}>
                      The concept of AI Workers is transformative for professional services. As we look to the future of audit and consulting, intelligent automation will be key to delivering higher quality services while allowing our teams to focus on strategic thinking.
                    </Text>
                    
                    <HStack spacing={4} pt={{ base: 2, md: 4 }}>
                      <Box
                        bg="brand.400"
                        borderRadius="full"
                        p={1}
                        width={{ base: "40px", md: "48px" }}
                        height={{ base: "40px", md: "48px" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize={{ base: "lg", md: "xl" }}
                        color="white"
                        {...boldTextStyle}
                      >
                        SC
                      </Box>
                      <Box>
                        <Text color="gray.800" fontSize="sm" {...textStyle}>
                          Technology Director, Grant Thornton UK
                        </Text>
                      </Box>
                    </HStack>
                  </VStack>
                </Box>
              </SimpleGrid>
            </VStack>
          </Container>
        </Box>

        {/* CTA Section */}
        <Container maxW="6xl" py={{ base: 8, md: 16 }} px={{ base: 4, md: 6 }}>
          <Box
            bg="white"
            p={{ base: 6, md: 12 }}
            borderRadius="2xl"
            textAlign="center"
            border="1px solid"
            borderColor="gray.200"
          >
            <VStack spacing={{ base: 4, md: 6 }}>
              <Heading color="black" size={{ base: "lg", md: "xl" }} {...headingStyle}>
                Ready to Transform Your Workflow?
              </Heading>
              <Text color="gray.700" fontSize={{ base: "md", md: "lg" }} maxW="2xl" {...textStyle}>
                Join leading enterprises in revolutionizing their operations with our AI workers.
                Schedule a demo today and see the power of intelligent automation.
              </Text>
              <Button
                size={{ base: "md", md: "lg" }}
                colorScheme="brand"
                rightIcon={<FiArrowRight />}
                onClick={onOpen}
                color="black"
                bg="white"
                border="2px solid black"
                boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
                _hover={{
                  bg: "gray.100",
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.3)',
                }}
                _active={{
                  bg: "gray.200",
                  transform: 'translateY(0)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                }}
                {...boldTextStyle}
              >
                Request Demo
              </Button>
            </VStack>
          </Box>
        </Container>

        {/* Add ScrollToTop component */}
        <ScrollToTop />
      </Box>
    </Box>
  );
};

export default AIWorker; 