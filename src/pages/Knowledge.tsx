import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  Icon,
  Grid,
  Divider,
  Button,
  Flex,
  Badge,
  useColorModeValue,
  Image,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiUser, FiArrowRight } from 'react-icons/fi'
import { ArticleMetadata } from '../types/article'
import { articleService } from '../services/articleService'

const MotionBox = motion(Box)
const MotionGrid = motion(Grid)

// Default image for articles that don't have one
const defaultImage = '/images/TBRL.png';

const BlogCard = ({ article }: { article: ArticleMetadata }) => {
  // Get a default image if the article doesn't have one
  const imageSource = article.imageUrl || defaultImage
  
  // Hover animation variants
  const cardVariants = {
    initial: { y: 0, opacity: 1 },
    hover: { 
      y: -8, 
      boxShadow: "0 20px 30px rgba(150, 56, 255, 0.15)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }
  
  // Color modes
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200')
  const hoverBorderColor = 'brand.400'
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.700', 'gray.300')
  const headingColor = useColorModeValue('gray.900', 'white')
  
  return (
    <LinkBox as={MotionBox}
      initial="initial"
      whileHover="hover"
      variants={cardVariants}
      maxW={{ base: "full", md: "95%", lg: "95%" }}
    >
      <Box
        borderRadius="none"
        overflow="hidden"
        bg={bgColor}
        border="1px solid"
        borderColor={borderColor}
        transition="all 0.3s ease"
        _hover={{
          borderColor: hoverBorderColor,
        }}
        boxShadow="md"
        height="100%"
        display="flex"
        flexDirection="column"
        position="relative"
      >
        {/* Image container with hover zoom effect */}
        <Box 
          position="relative" 
          height="200px" 
          overflow="hidden"
          borderTopRadius="none"
        >
          <MotionBox
            width="100%"
            height="100%"
            variants={{
              hover: { scale: 1.05 }
            }}
            transition={{ duration: 0.4 }}
            style={{ transform: "translateY(-40px)" }}
          >
            <Image
              src={imageSource}
              alt=""
              width="full"
              height="full"
              objectFit="cover"
            />
          </MotionBox>
          
          {/* Category badge */}
          <Badge
            position="absolute"
            top="3"
            left="3"
            px={2}
            py={1}
            borderRadius="none"
            colorScheme="purple"
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="wide"
            fontWeight="bold"
            zIndex={2}
          >
            Blog
          </Badge>
        </Box>
        
        {/* Content section */}
        <VStack 
          align="stretch" 
          p={5} 
          spacing={4} 
          flex="1"
          justify="space-between"
          position="relative"
        >
          <VStack align="stretch" spacing={3}>
            <LinkOverlay as={Link} to={`/articles/${article.slug}`}>
              <MotionBox variants={{
                hover: { x: 3 }
              }}>
                <Heading 
                  size="md" 
                  color={headingColor}
                  lineHeight="1.4"
                  noOfLines={2}
                >
                  {article.title}
                </Heading>
              </MotionBox>
            </LinkOverlay>
            
            <Text 
              color={textColor} 
              fontSize="sm"
              noOfLines={3}
            >
              {article.description}
            </Text>
          </VStack>
          
          <Box>
            <Divider borderColor={borderColor} mb={4} />
            
            <HStack spacing={2} flexWrap="wrap" mb={4}>
              {article.tags.slice(0, 3).map(tag => (
                <Tag
                  key={tag}
                  size="sm"
                  variant="subtle"
                  colorScheme="purple"
                  borderRadius="none"
                >
                  {tag}
                </Tag>
              ))}
              {article.tags.length > 3 && (
                <Tag
                  size="sm"
                  variant="subtle"
                  colorScheme="gray"
                  borderRadius="none"
                >
                  +{article.tags.length - 3}
                </Tag>
              )}
            </HStack>

            <HStack justify="space-between" fontSize="xs" color={textColor}>
              <HStack spacing={1}>
                <Icon as={FiUser} />
                <Text>{article.author}</Text>
              </HStack>
              
              <HStack spacing={1} color="brand.400">
                <Text fontWeight="medium">Read Article</Text>
                <Icon 
                  as={FiArrowRight} 
                  className="arrow-icon"
                  transition="transform 0.2s ease"
                />
              </HStack>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </LinkBox>
  )
}

const Blog = () => {
  const [articles, setArticles] = useState<ArticleMetadata[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }
  
  // Color modes - defined at the top to avoid conditional Hook calls
  const bgGradient = useColorModeValue(
    'linear(to-br, purple.50, white, white)',
    'linear(to-br, gray.900, gray.800)'
  )
  const textColor = useColorModeValue('gray.700', 'gray.300')
  const headingColor = useColorModeValue('gray.900', 'white')
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColorValue = useColorModeValue('gray.100', 'gray.700')
  
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true)
      try {
        const metadata = await articleService.getAllMetadata()
        if (metadata && metadata.length > 0) {
          // Sort by date (newest first)
          const sortedArticles = [...metadata].sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          setArticles(sortedArticles)
        }
      } catch (e) {
        setError((e as Error).message)
      }
      setLoading(false)
    }

    loadArticles()
  }, [])

  if (loading) {
    return (
      <Box minH="100vh" py={24}>
        <Container maxW="7xl">
          <Flex justify="center" align="center" h="50vh">
            <MotionBox
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Text color="brand.400" fontSize="xl" fontWeight="medium">
                Loading blog posts...
              </Text>
            </MotionBox>
          </Flex>
        </Container>
      </Box>
    )
  }

  if (error) {
    return (
      <Box minH="100vh" py={24}>
        <Container maxW="7xl">
          <VStack spacing={6} align="center" justify="center" h="50vh">
            <Heading color="red.400" size="md">Error Loading Content</Heading>
            <Text color={textColor}>{error}</Text>
            <Button colorScheme="purple" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </VStack>
        </Container>
      </Box>
    )
  }

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      {/* Hero Section */}
      <Box 
        pt={28} 
        pb={24} 
        position="relative"
        overflow="hidden"
        bg="#3A3A3A"
      >
        <Container maxW="7xl" position="relative" zIndex={1} bg="transparent" boxShadow="none" backdropFilter="none">
          <Flex justifyContent="space-between" alignItems="center">
            <MotionBox
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <VStack spacing={6} align={{ base: "center", md: "flex-start" }} maxW="2xl">
                <HStack>
                  <Box 
                    h="30px" 
                    w="5px" 
                    bgGradient="linear(to-b, brand.400, purple.600)" 
                    borderRadius="full"
                  />
                  <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    color="brand.300"
                    letterSpacing="wider"
                  >
                    INSIGHTS & STORIES
                  </Text>
                </HStack>
                
                <Heading 
                  color="white"
                  fontSize={{ base: "4xl", md: "5xl" }}
                  fontWeight="bold"
                  lineHeight="1.2"
                  letterSpacing="tight"
                >
                  Blog
                </Heading>
                
                <Text 
                  fontSize={{ base: "lg", md: "xl" }} 
                  lineHeight="1.6"
                  color="gray.300"
                  maxW="2xl"
                >
                  Explore our collection of insights, best practices, and stories about AI, machine learning, and digital transformation.
                </Text>
              </VStack>
            </MotionBox>
          </Flex>
        </Container>
      </Box>

      {/* Content Section */}
      <Box pt={16} pb={20}>
        <Container 
          maxW="8xl" 
          bg="transparent" 
          boxShadow="none" 
          backdropFilter="none" 
          px={{ base: 4, lg: 4 }} 
          margin="0"
          marginInlineStart="0"
        >
          {/* Articles Grid */}
          <AnimatePresence>
            <MotionGrid
              templateColumns={{ 
                base: "repeat(1, 1fr)", 
                md: "repeat(2, 1fr)", 
                lg: "repeat(2, 1fr)" 
              }}
              columnGap={{ base: 8, lg: 12 }}
              rowGap={{ base: 8, lg: 12 }}
              maxW={{ base: "full", lg: "850px" }}
              mx={{ base: "auto", lg: "0" }}
              ml={{ base: "auto", lg: "100px" }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {articles.map((article: ArticleMetadata) => (
                <MotionBox
                  key={article.id}
                  variants={itemVariants}
                  maxW={{ base: "full", md: "370px", lg: "400px" }}
                >
                  <BlogCard article={article} />
                </MotionBox>
              ))}
            </MotionGrid>
          </AnimatePresence>

          {/* Empty state */}
          {articles.length === 0 && !loading && !error && (
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Flex 
                direction="column" 
                align="center" 
                justify="center" 
                py={16} 
                px={8}
                bg={cardBg}
                borderRadius="xl"
                boxShadow="md"
                border="1px solid"
                borderColor={borderColorValue}
              >
                <Heading size="md" mb={4} color={headingColor}>
                  No articles found
                </Heading>
                <Text color={textColor} textAlign="center" maxW="lg" mb={6}>
                  We don't have any blog posts yet. Check back soon for new content!
                </Text>
              </Flex>
            </MotionBox>
          )}
        </Container>
      </Box>
    </Box>
  )
}

export default Blog 