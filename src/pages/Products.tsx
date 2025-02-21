import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Button,
  Icon,
  Badge,
  useBreakpointValue,
  List,
  ListItem,
  ListIcon,
  Circle,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { FiCheck, FiArrowRight, FiGrid, FiCpu, FiDatabase, FiShield, FiLock, FiKey, FiEdit, FiFileText, FiSearch, FiTool, FiAlertCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import { motion, useScroll, useInView } from 'framer-motion';
import { useRef, useState, useEffect, RefObject, useCallback } from 'react';
import ReactFlow, { 
  Node, 
  Edge, 
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { SVG } from '@svgdotjs/svg.js';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionSimpleGrid = motion(SimpleGrid);

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const WorkflowBox = ({ icon, title, delay, hasLine = true, position = "center" }: { 
  icon: React.ElementType; 
  title: string; 
  delay: number;
  hasLine?: boolean;
  position?: "left" | "center" | "right";
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(boxRef, { once: true, margin: "-100px" });

  return (
    <MotionBox
      ref={boxRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      bg="brand.400"
      borderRadius="xl"
      p={4}
      width="120px"
      height="120px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
      position="relative"
      _after={hasLine ? {
        content: '""',
        position: 'absolute',
        width: position === "center" ? "2px" : "35px",
        height: position === "center" ? "35px" : "2px",
        bg: 'brand.400',
        ...(position === "center" ? {
          bottom: '-35px',
          left: '50%',
          transform: 'translateX(-50%)',
        } : position === "left" ? {
          right: '-35px',
          top: '50%',
          transform: 'translateY(-50%)',
        } : {
          left: '-35px',
          top: '50%',
          transform: 'translateY(-50%)',
        })
      } : {}}
    >
      <Icon as={icon} boxSize={8} color="white" />
      <Text color="white" fontSize="sm" textAlign="center" fontWeight="medium">
        {title}
      </Text>
    </MotionBox>
  );
};

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  benefits: string[];
}

const FeatureCard = ({ icon, title, description, benefits }: FeatureCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <MotionBox
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.5 }}
    bg="whiteAlpha.50"
    backdropFilter="blur(8px)"
    borderRadius="xl"
    p={6}
    border="1px solid"
    borderColor="whiteAlpha.100"
    _hover={{
      transform: 'translateY(-5px)',
      borderColor: 'brand.400',
      boxShadow: '0 4px 20px rgba(150, 56, 255, 0.2)',
    }}
  >
    <VStack align="start" spacing={4}>
      <Icon as={icon} boxSize={8} color="brand.400" />
      <Heading size="md" color="white">
        {title}
      </Heading>
      <Text color="whiteAlpha.800" fontSize="sm">
        {description}
      </Text>
      <List spacing={2} w="100%">
        {benefits.map((benefit, index) => (
          <ListItem key={index} fontSize="sm" color="whiteAlpha.900">
            <HStack>
              <ListIcon as={FiCheck} color="brand.400" />
              <Text>{benefit}</Text>
            </HStack>
          </ListItem>
        ))}
      </List>
    </VStack>
    </MotionBox>
  );
};

const CustomNode = ({ data }: { data: { icon: React.ElementType; label: string } }) => {
  return (
    <Box
          bg="brand.400"
      borderRadius="xl"
      p={4}
      width="120px"
      height="120px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
    >
      <Icon as={data.icon} boxSize={8} color="white" />
      <Text color="white" fontSize="sm" textAlign="center" fontWeight="medium">
        {data.label}
      </Text>
    </Box>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const FlowDiagram = ({ shouldAnimate }: { shouldAnimate: boolean }) => {
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !shouldAnimate) return;

    // Clear any existing content
    svgRef.current.innerHTML = '';

    // Create SVG canvas with adjusted size for the security section
    const draw = SVG().addTo(svgRef.current).size('100%', 400);
    
    // Define gradient for boxes
    const gradient = draw.gradient('linear', (add) => {
      add.stop(0, '#9638FF')
      add.stop(1, '#7D0AFF')
    });

    // Helper function to create boxes with fade-in animation
    const createBox = (x: number, y: number, icon: React.ElementType, text: string, delay: number) => {
      const group = draw.group();
      
      // Box
      const box = group.rect(120, 120)
        .radius(16)
        .fill(gradient)
        .move(x - 60, y - 60)
        .opacity(0);

      // Icon (as SVG path)
      const iconSvg = group.path(getIconPath(icon))
        .fill('white')
        .move(x - 16, y - 25)
        .opacity(0);

      // Text
      const textElement = group.text(text)
        .fill('white')
        .font({
          family: 'Inter',
          size: 14,
          anchor: 'middle',
          weight: 500
        })
        .move(x, y + 15)
        .opacity(0);
      
      textElement.cx(x);

      // Animate the box with delay
      setTimeout(() => {
        box.animate(800, 0, 'now').opacity(1);
        iconSvg.animate(800, 0, 'now').opacity(1);
        textElement.animate(800, 0, 'now').opacity(1);
      }, delay);

      return group;
    };

    // Create boxes with wider spacing and moved down
    const box1 = createBox(80, 250, FiLock, 'Data Encryption', 0);
    const box2 = createBox(400, 150, FiShield, 'Access Control', 300);
    const box3 = createBox(400, 350, FiKey, 'Key Management', 600);

    // Create curved connections with shadow and longer curves
    const createConnection = (startX: number, startY: number, endX: number, endY: number, delay: number) => {
      // Increase control point offset for smoother, longer curves
      const controlPointOffset = Math.abs(endX - startX) * 0.7;
      
      // Create shadow path
      const shadowPath = draw.path(`
        M ${startX} ${startY}
        C ${startX + controlPointOffset} ${startY},
          ${endX - controlPointOffset} ${endY},
          ${endX} ${endY}
      `).fill('none')
        .stroke({ color: '#9638FF', width: 4, opacity: 0 });

      // Create main path with animated dash
      const path = draw.path(`
        M ${startX} ${startY}
        C ${startX + controlPointOffset} ${startY},
          ${endX - controlPointOffset} ${endY},
          ${endX} ${endY}
      `).fill('none')
        .stroke({ color: '#9638FF', width: 2 })
        .opacity(0);

      // Animate the paths with delay
      setTimeout(() => {
        shadowPath.animate(800, 0, 'now').opacity(0.2);
        path.animate(800, 0, 'now').opacity(1).after(() => {
          // Add dash animation after fade in
          const pathLength = path.length();
          path.attr({
            'stroke-dasharray': `${pathLength/20} ${pathLength/30}`,
            'stroke-dashoffset': pathLength
          });
          path.animate(3000, 0, 'now').attr({
            'stroke-dashoffset': 0
          }).loop();
        });
      }, delay);
    };

    // Create horizontal connections with adjusted positions and delays
    createConnection(140, 250, 340, 150, 900);  // Box 1 to Box 2
    createConnection(140, 250, 340, 350, 1200); // Box 1 to Box 3

  }, [shouldAnimate]); // Re-run effect when shouldAnimate changes

  return (
    <MotionBox 
      ref={svgRef} 
      width="100%" 
      height="400px"
      initial={{ opacity: 0 }}
      animate={{ opacity: shouldAnimate ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        '& svg': {
          overflow: 'visible',
        }
      }}
    />
  );
};

// Update the helper function to include security icon paths
const getIconPath = (icon: React.ElementType) => {
  // Simplified paths for icons
  const paths = {
    [FiLock.name]: 'M19 11h-1V7A6 6 0 0 0 6 7v4H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zm-7 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm3-7H9V7a3 3 0 1 1 6 0v4z',
    [FiShield.name]: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    [FiKey.name]: 'M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4'
  };
  
  return paths[icon.name] || '';
};

const Products = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleBoxes, setVisibleBoxes] = useState<Set<number>>(new Set());
  
  const features: FeatureCardProps[] = [
    {
      icon: FiCpu,
      title: "AI Worker Core",
      description: "Our flagship AI worker solution that transforms workplace automation and collaboration.",
      benefits: [
        "Smart email management",
        "Teams collaboration",
        "Real-time analysis",
        "Workflow automation"
      ]
    },
    {
      icon: FiGrid,
      title: "Integration Suite",
      description: "Seamlessly connect with your existing tools and platforms for enhanced productivity.",
      benefits: [
        "Microsoft 365 integration",
        "Slack connectivity",
        "Salesforce automation",
        "Custom API support"
      ]
    },
    {
      icon: FiDatabase,
      title: "Enterprise Analytics",
      description: "Powerful insights and reporting capabilities for data-driven decision making.",
      benefits: [
        "Lead scoring",
        "Sales analytics",
        "Performance tracking",
        "Custom reporting"
      ]
    },
    {
      icon: FiShield,
      title: "Security & Compliance",
      description: "Enterprise-grade security measures to protect your sensitive data and operations.",
      benefits: [
        "End-to-end encryption",
        "Role-based access",
        "Audit logging",
        "Compliance monitoring"
      ]
    }
  ];

  // Function to handle box visibility
  const handleBoxVisible = (index: number) => {
    setVisibleBoxes(prev => {
      const newSet = new Set(prev);
      newSet.add(index);
      // Start animation only when both boxes (0 and 1) are visible
      if (newSet.has(0) && newSet.has(1)) {
        setTimeout(() => setIsAnimating(true), 500); // Delay animation start by 500ms after both boxes are visible
      }
      return newSet;
    });
  };

  return (
    <Box bg="black" minH="100vh">
      {/* Hero Section */}
      <Box 
        pt={32} 
        pb={16}
        bg="linear-gradient(180deg, rgba(150, 56, 255, 0.1) 0%, rgba(0, 0, 0, 0) 100%)"
      >
        <Container maxW="7xl">
          <MotionVStack
            spacing={6}
            align="center"
            textAlign="center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Heading
              color="white"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="bold"
            >
              AI-Powered Workplace Solutions
            </Heading>
            <Text
              color="whiteAlpha.900"
              fontSize={{ base: "lg", md: "xl" }}
              maxW="3xl"
            >
              Transform your enterprise operations with our cutting-edge AI workers. 
              Streamline workflows, enhance collaboration, and drive innovation across your organization.
            </Text>
          </MotionVStack>
        </Container>
      </Box>

      {/* Features Grid */}
      <Container maxW="7xl" py={16}>
        <MotionSimpleGrid 
          columns={{ base: 1, md: 2 }} 
          spacing={8}
        >
          {features.map((feature, index) => (
            <Box key={index}>
              <FeatureCard {...feature} />
            </Box>
          ))}
        </MotionSimpleGrid>
      </Container>

      {/* Security Section */}
      <Box py={16} bg="whiteAlpha.50">
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
            <GridItem>
              <MotionVStack 
                spacing={12} 
                align={{ base: "center", lg: "start" }}
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
                viewport={{ once: true, margin: "-100px" }}
              >
                <VStack spacing={6} textAlign={{ base: "center", lg: "left" }} align={{ base: "center", lg: "start" }}>
                  <Heading color="white" fontSize={{ base: "2xl", md: "3xl" }}>
                    Your Data Security Is Our Priority
                  </Heading>
                  <Text color="whiteAlpha.900" fontSize={{ base: "md", md: "lg" }}>
                    We maintain the highest standards of data protection and privacy, ensuring your information remains secure and confidential at all times.
                  </Text>
                </VStack>
                
                <SimpleGrid columns={{ base: 1, md: 1 }} spacing={8} width="full">
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
                  ].map((item, index) => {
                    const boxRef = useRef<HTMLDivElement>(null);
                    const isBoxInView = useInView(boxRef, { 
                      once: true,
                      amount: 0.8
                    });

                    useEffect(() => {
                      if (isBoxInView) {
                        handleBoxVisible(index);
                      }
                    }, [isBoxInView, index]);

                    return (
                      <MotionBox
                        key={index}
                        ref={boxRef}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isBoxInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.3 }}
                        viewport={{ once: true }}
                        p={6}
                        bg="whiteAlpha.50"
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="whiteAlpha.100"
                      >
                        <HStack spacing={4} align="start">
                          <Icon as={item.icon} boxSize={6} color="brand.400" mt={1} />
                          <VStack align="start" spacing={2}>
                            <Heading size="sm" color="white">{item.title}</Heading>
                            <Text color="whiteAlpha.800" fontSize="sm">
                              {item.description}
                            </Text>
                          </VStack>
                        </HStack>
                      </MotionBox>
                    );
                  })}
                </SimpleGrid>
              </MotionVStack>
            </GridItem>
            
            <GridItem display={{ base: "none", lg: "block" }}>
              <FlowDiagram shouldAnimate={visibleBoxes.size === 2} />
            </GridItem>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={16}>
        <Container maxW="7xl">
          <MotionVStack 
            spacing={8} 
            align="center" 
            textAlign="center"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <Heading color="white" fontSize={{ base: "2xl", md: "3xl" }}>
              Ready to Transform Your Workplace?
            </Heading>
            <Text color="whiteAlpha.900" fontSize={{ base: "md", md: "lg" }} maxW="2xl">
              Join leading enterprises in revolutionizing their operations with our AI workers.
              Get started today and experience the future of work.
            </Text>
            <Link to="/contact">
              <Button
                size="lg"
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