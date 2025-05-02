import { Box, Heading, Text, VStack, keyframes } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ComingSoon = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Box
      minH="100vh"
      w="100%"
      bg="black"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      {/* Grid background effect */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.2"
        backgroundImage={`
          linear-gradient(to right, rgba(30, 144, 255, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(30, 144, 255, 0.1) 1px, transparent 1px)
        `}
        backgroundSize="40px 40px"
        zIndex="1"
      />
      
      {/* Dynamic glow effect */}
      <Box
        position="absolute"
        top={`${mousePosition.y * 100}%`}
        left={`${mousePosition.x * 100}%`}
        transform="translate(-50%, -50%)"
        width="40vw"
        height="40vw"
        background="radial-gradient(circle, rgba(0,163,255,0.15) 0%, rgba(0,0,0,0) 70%)"
        pointerEvents="none"
        transition="all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        zIndex="1"
      />
      
      {/* Animated gradient background */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.5"
        bgGradient="linear(to-br, rgba(0,30,60,0.8), rgba(0,0,20,0.8))"
        zIndex="0"
      />
      
      {/* Floating particles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <Box
          key={i}
          position="absolute"
          width={`${10 + i * 5}px`}
          height={`${10 + i * 5}px`}
          borderRadius="full"
          background={`rgba(${i * 50}, ${255 - i * 30}, 255, 0.${3 + i})`}
          top={`${20 + i * 15}%`}
          left={`${10 + i * 18}%`}
          animation={`${float} ${8 + i}s infinite ease-in-out`}
          zIndex="1"
          boxShadow={`0 0 15px 2px rgba(${i * 50}, ${255 - i * 30}, 255, 0.${3 + i})`}
        />
      ))}
      
      <VStack spacing={8} zIndex="2">
        <Box
          animation={`${pulse} 2s infinite ease-in-out`}
        >
          <Heading
            as="h1"
            fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, #00A3FF, #00FFA3)"
            backgroundSize="300% 300%"
            animation={`${gradientAnimation} 5s ease infinite`}
            bgClip="text"
            mb={4}
            letterSpacing="tight"
            textShadow="0 2px 10px rgba(0, 163, 255, 0.3)"
          >
            M3Labs
          </Heading>
        </Box>
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="light"
          letterSpacing="wider"
          textTransform="uppercase"
        >
          Coming Soon
        </Heading>
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          maxW="600px"
          opacity={0.8}
          px={4}
          textAlign="center"
        >
          We're working on something exciting. Stay tuned!
        </Text>
      </VStack>
    </Box>
  );
};

export default ComingSoon;
