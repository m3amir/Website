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
} from '@chakra-ui/react';
import { FiCheck, FiArrowRight, FiGrid, FiUser, FiMail, FiMessageSquare, FiBriefcase } from 'react-icons/fi';
import { 
  SiSlack, 
  SiSalesforce,
  SiZendesk
} from 'react-icons/si';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';
import { motion } from 'framer-motion';
import { FaSlack, FaMicrosoft, FaJira } from 'react-icons/fa';
import ScrollToTop from '../components/ScrollToTop'

interface IntegrationCardProps {
  icon: React.ElementType;
  title: string;
  features: string[];
}

const IntegrationCard = ({ icon, title, features }: IntegrationCardProps) => {
  return (
    <Box
      bg="whiteAlpha.100"
      p={6}
      borderRadius="xl"
      border="1px solid"
      borderColor="whiteAlpha.200"
      _hover={{
        transform: 'translateY(-5px)',
        transition: 'transform 0.2s',
        borderColor: 'brand.400'
      }}
    >
      <Icon as={icon} boxSize={10} color="brand.400" mb={4} />
      <Heading size="md" mb={4} color="white">
        {title}
      </Heading>
      <VStack align="start" spacing={3}>
        {features.map((feature, index) => (
          <HStack key={index} color="whiteAlpha.900">
            <Icon as={FiCheck} color="green.400" />
            <Text>{feature}</Text>
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
    } catch (error) {
      console.error('Error sending email:', error);
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
      <ModalContent bg="gray.900" color="white">
        <ModalHeader>Request a Demo</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiUser color="gray.300" />
                  </InputLeftElement>
                  <Input
                    name="from_name"
                    placeholder="Your name"
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    _hover={{ borderColor: 'brand.400' }}
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiMail color="gray.300" />
                  </InputLeftElement>
                  <Input
                    name="from_email"
                    type="email"
                    placeholder="your.email@company.com"
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    _hover={{ borderColor: 'brand.400' }}
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Company</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiBriefcase color="gray.300" />
                  </InputLeftElement>
                  <Input
                    name="company"
                    placeholder="Your company name"
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    _hover={{ borderColor: 'brand.400' }}
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Message</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiMessageSquare color="gray.300" />
                  </InputLeftElement>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your needs..."
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    _hover={{ borderColor: 'brand.400' }}
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                    pl={10}
                    minH="150px"
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
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(150, 56, 255, 0.3)',
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
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionStack = motion(VStack);
const MotionIcon = motion(Icon);

const ConnectorFlow = () => {
  const iconSize = useBreakpointValue({ base: 16, md: 24 });
  
  return (
    <Box position="relative" h={{ base: "300px", md: "400px" }} w="100%" mt={0}>
      <Text color="whiteAlpha.600" fontSize="sm" textAlign="center" mb={4}>
        These are just some of our supported connectors. Contact us to learn more about all available integrations.
      </Text>
      <HStack spacing={0} w="100%" h="100%" position="relative">
        {/* Left Side - Services */}
        <Box flex="1.5" h="100%" position="relative">
          <VStack spacing={{ base: 6, md: 10 }} h="100%" justify="flex-start" pl={{ base: 2, md: 12 }} pt={{ base: 4, md: 8 }}>
            {[
              { icon: FaSlack, color: "#E01E5A", name: "Slack" },
              { icon: FaMicrosoft, color: "#00A4EF", name: "Microsoft" },
              { icon: SiZendesk, color: "#ffffff", name: "Zendesk" },
              { icon: FaJira, color: "#0052CC", name: "Jira" },
            ].map((item, index) => (
              <HStack key={index} w="100%" spacing={{ base: 2, md: 4 }} position="relative">
                {/* Service Icon */}
                <MotionBox
                  p={{ base: 3, md: 4 }}
                  bg="whiteAlpha.50"
                  backdropFilter="blur(8px)"
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ 
                    x: 0,
                    opacity: 1
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1
                  }}
                  _hover={{
                    transform: "translateX(5px)",
                    boxShadow: `0 0 30px ${item.color}30`,
                    borderColor: item.color
                  }}
                >
                  <MotionIcon
                    as={item.icon}
                    fontSize={iconSize}
                    color={item.color}
                  />
                </MotionBox>

                {/* Connection Line */}
                <Box flex="1" position="relative">
                  <MotionBox
                    position="absolute"
                    top="50%"
                    right={{ base: "-60px", md: "-120px" }}
                    width={{ base: "calc(100% + 80px)", md: "calc(100% + 160px)" }}
                    height="2px"
                    bg={`linear-gradient(to right, ${item.color}40, ${item.color})`}
                    style={{
                      transformOrigin: "left center",
                      transform: `rotate(${-15 + index * 10}deg)`,
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
                          duration: 2,
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
        <Box flex="1" h="100%" position="relative">
          <MotionBox
            position="absolute"
            right={{ base: 4, md: 16 }}
            top="0"
            width={{ base: "160px", md: "280px" }}
            height={{ base: "280px", md: "400px" }}
            bg="whiteAlpha.50"
            backdropFilter="blur(8px)"
            borderRadius="2xl"
            border="1px solid"
            borderColor="whiteAlpha.200"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={{ base: 4, md: 8 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            overflow={{ base: "hidden", md: "visible" }}
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
                  { left: "20%", top: "20%" },
                  { left: "60%", top: "30%" },
                  { left: "30%", top: "70%" },
                  { left: "50%", top: "60%" }
                ];
                
                return (
                  <MotionBox
                    key={index}
                    position="absolute"
                    left={positions[index].left}
                    top={positions[index].top}
                    width={{ base: "70px", md: "120px" }}
                    height={{ base: "20px", md: "32px" }}
                    bg="whiteAlpha.100"
                    backdropFilter="blur(4px)"
                    borderRadius="lg"
                    border="1px solid"
                    borderColor="whiteAlpha.300"
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
                      p={{ base: 1, md: 2 }}
                      align="center"
                      h="100%"
                    >
                      <Box 
                        w={{ base: "2px", md: "4px" }}
                        h={{ base: "2px", md: "4px" }}
                        borderRadius="full" 
                        bg="brand.400"
                        boxShadow="0 0 10px rgba(123, 31, 162, 0.5)"
                      />
                      <Box 
                        flex="1" 
                        h={{ base: "2px", md: "3px" }}
                        bg="whiteAlpha.200" 
                        borderRadius="full"
                        overflow="hidden"
                      >
                        <MotionBox
                          h="100%"
                          bg="brand.400"
                          borderRadius="full"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity
                          }}
                        />
                      </Box>
                      <Text 
                        color="whiteAlpha.900" 
                        fontSize={{ base: "6px", md: "10px" }} 
                        fontFamily="mono"
                        display={{ base: "none", md: "block" }}
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
              color="white" 
              fontSize={{ base: "32px", md: "56px" }}
              position="relative"
              zIndex={1}
            />
            <VStack spacing={{ base: 1, md: 2 }} position="relative" zIndex={1}>
              <Text color="white" fontSize={{ base: "lg", md: "2xl" }} fontWeight="medium">
                AI Worker
              </Text>
              <Text color="whiteAlpha.700" fontSize={{ base: "sm", md: "lg" }}>
                Platform
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

  return (
    <Box bg="black" minH="100vh" pt="64px">
      <DemoRequestModal isOpen={isOpen} onClose={onClose} />
      
      {/* Hero Section */}
      <Box
        bg="linear-gradient(180deg, rgba(76, 29, 149, 0.1) 0%, rgba(0, 0, 0, 0) 100%)"
        py={20}
      >
        <Container maxW="6xl">
          <VStack spacing={6} align="center" textAlign="center">
            <Badge
              colorScheme="purple"
              px={3}
              py={1}
              borderRadius="full"
              textTransform="uppercase"
              fontSize="sm"
            >
              Enterprise Ready
            </Badge>
            <Heading
              size="2xl"
              color="white"
              fontWeight="bold"
              lineHeight="shorter"
            >
              AI Workers with{' '}
              <Text as="span" color="brand.400">
                Enterprise Integrations
              </Text>
            </Heading>
            <Text fontSize="xl" color="whiteAlpha.900" maxW="2xl">
              Seamlessly connect our AI workers with your existing business tools.
              Enhance productivity and streamline workflows with intelligent automation.
            </Text>
            <Button
              size="lg"
              colorScheme="brand"
              rightIcon={<FiArrowRight />}
              mt={4}
              onClick={onOpen}
            >
              Get Started
            </Button>
          </VStack>
        </Container>
      </Box>

      {/* Integrations Grid */}
      <Container maxW="6xl">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading color="white" size="lg" mb={4}>
              Enterprise Integrations
            </Heading>
            <Text color="whiteAlpha.700" fontSize="lg" maxW="2xl" mx="auto">
              Connect your AI workers with industry-leading platforms
            </Text>
          </Box>
          <Box overflowX="auto" pb={4} mx="-24px" px={6}>
            <HStack spacing={6} minW="min-content">
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
            </HStack>
          </Box>

          <Box>
            <ConnectorFlow />
          </Box>
        </VStack>
      </Container>

      {/* Testimonials Section */}
      <Box py={20} position="relative" overflow="hidden">
        {/* Background Gradient Effect */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          width="140%"
          height="140%"
          background="radial-gradient(circle, rgba(76, 29, 149, 0.1) 0%, rgba(0, 0, 0, 0) 70%)"
          pointerEvents="none"
        />

        <Container maxW="6xl" position="relative">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Heading color="white" size="xl">
                Trusted by Industry Leaders
              </Heading>
              <Text color="whiteAlpha.900" fontSize="lg" maxW="2xl">
                Hear what our enterprise partners say about M3Labs AI Workers
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} w="full">
              {/* LSEG Testimonial */}
              <Box
                bg="whiteAlpha.100"
                p={8}
                borderRadius="2xl"
                border="1px solid"
                borderColor="whiteAlpha.200"
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
                  fontSize="6xl"
                  color="brand.400"
                  opacity={0.3}
                  lineHeight={1}
                >
                  "
                </Box>
                
                <VStack align="start" spacing={6}>
                  <Text color="whiteAlpha.900" fontSize="lg" pt={8} fontStyle="italic">
                    AI Workers represent the future of enterprise automation. The potential for improving data processing accuracy and workflow efficiency is immense. I believe organizations that adopt this technology early will have a significant competitive advantage.
                  </Text>
                  
                  <HStack spacing={4} pt={4}>
                    <Box
                      bg="brand.400"
                      borderRadius="full"
                      p={1}
                      width="48px"
                      height="48px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="xl"
                      fontWeight="bold"
                      color="white"
                    >
                      SJ
                    </Box>
                    <Box>
                      <Text color="whiteAlpha.800" fontSize="sm">
                        Senior Technology Manager, LSEG
                      </Text>
                    </Box>
                  </HStack>
                </VStack>
              </Box>

              {/* Grant Thornton Testimonial */}
              <Box
                bg="whiteAlpha.100"
                p={8}
                borderRadius="2xl"
                border="1px solid"
                borderColor="whiteAlpha.200"
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
                  fontSize="6xl"
                  color="brand.400"
                  opacity={0.3}
                  lineHeight={1}
                >
                  "
                </Box>
                
                <VStack align="start" spacing={6}>
                  <Text color="whiteAlpha.900" fontSize="lg" pt={8} fontStyle="italic">
                    The concept of AI Workers is transformative for professional services. As we look to the future of audit and consulting, intelligent automation will be key to delivering higher quality services while allowing our teams to focus on strategic thinking.
                  </Text>
                  
                  <HStack spacing={4} pt={4}>
                    <Box
                      bg="brand.400"
                      borderRadius="full"
                      p={1}
                      width="48px"
                      height="48px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="xl"
                      fontWeight="bold"
                      color="white"
                    >
                      SC
                    </Box>
                    <Box>
                      <Text color="whiteAlpha.800" fontSize="sm">
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
      <Container maxW="6xl" py={16}>
        <Box
          bg="linear-gradient(180deg, rgba(76, 29, 149, 0.1) 0%, rgba(0, 0, 0, 0) 100%)"
          p={12}
          borderRadius="2xl"
          textAlign="center"
        >
          <VStack spacing={6}>
            <Heading color="white" size="xl">
              Ready to Transform Your Workflow?
            </Heading>
            <Text color="whiteAlpha.900" fontSize="lg" maxW="2xl">
              Join leading enterprises in revolutionizing their operations with our AI workers.
              Schedule a demo today and see the power of intelligent automation.
            </Text>
            <Button
              size="lg"
              colorScheme="brand"
              rightIcon={<FiArrowRight />}
              onClick={onOpen}
            >
              Request Demo
            </Button>
          </VStack>
        </Box>
      </Container>

      {/* Demo Video Section */}
      <Box py={20} bg="whiteAlpha.50">
        <Container maxW="7xl">
          <MotionBox
            p={8}
            borderRadius="xl"
            bg="whiteAlpha.100"
            border="1px dashed"
            borderColor="brand.400"
            w="full"
            maxW="4xl"
            mx="auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MotionStack spacing={4} align="center">
              <MotionHeading
                size="lg"
                bgGradient="linear(to-r, brand.400, brand.600)"
                bgClip="text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                Demo Video
              </MotionHeading>
              <MotionBox
                w="full"
                h="300px"
                bg="whiteAlpha.50"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <MotionText
                  fontSize="xl"
                  color="text.secondary"
                  fontWeight="medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  Coming Soon
                </MotionText>
              </MotionBox>
              <MotionText
                color="text.secondary"
                fontSize="sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                Stay tuned for an in-depth demonstration of our AI Worker platform
              </MotionText>
            </MotionStack>
          </MotionBox>
        </Container>
      </Box>

      {/* Add ScrollToTop component */}
      <ScrollToTop />
    </Box>
  );
};

export default AIWorker; 