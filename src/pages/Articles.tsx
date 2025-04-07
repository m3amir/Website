import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack,
  HStack,
  Image,
  LinkBox,
  LinkOverlay,
  Icon,
  Badge,
  useColorModeValue,
  Grid
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArticleMetadata } from '../types/article'
import { articleService } from '../services/articleService'
import { FiClock, FiUser, FiCalendar } from 'react-icons/fi'

const MotionBox = motion(Box)
const MotionGrid = motion(Grid)

// Default images for articles that don't have one
const defaultImages = [
  '/images/articles/default1.png',
  '/images/articles/default2.png',
  '/images/articles/default3.png',
  '/images/articles/dashboard.png',
  '/images/articles/metrics.png',
  '/images/articles/enterprise-connect.png',
  '/images/articles/index.png',
  '/images/articles/rl.png',
  '/images/articles/SAT.png',
  '/images/articles/STR.png',
]

const ArticleCard = ({ article, index }: { article: ArticleMetadata; index: number }) => {
  // Get a default image if the article doesn't have one
  const imageSource = article.imageUrl || defaultImages[index % defaultImages.length]
  
  // Generate a random elevated position for staggered layout
  const elevation = (index % 3) * 20
  
  // Hover animation variants
  const cardVariants = {
    initial: { y: 0, opacity: 1 },
    hover: { 
      y: -10, 
      boxShadow: "0 10px 30px rgba(150, 56, 255, 0.2)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  }
  
  // Border colors for the card
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200')
  const hoverBorderColor = 'brand.400'
  
  // Background and text colors
  const cardBg = useColorModeValue('white', 'background.secondary')
  const textColor = useColorModeValue('gray.700', 'text.secondary')
  const headingColor = useColorModeValue('gray.800', 'text.primary')
  
  return (
    <LinkBox as={MotionBox}
      initial="initial"
      whileHover="hover"
      variants={cardVariants}
      marginTop={`${elevation}px`}
      height="fit-content"
    >
      <Box
        borderRadius="xl"
        overflow="hidden"
        bg={cardBg}
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
      >
        {/* Image container with hover zoom effect */}
        <Box 
          position="relative" 
          height="180px" 
          overflow="hidden"
          borderTopRadius="xl"
        >
          <MotionBox
            width="100%"
            height="100%"
            variants={{
              hover: { scale: 1.05 }
            }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={imageSource}
              alt={article.title}
              w="full"
              h="full"
              objectFit="cover"
              fallbackSrc="https://via.placeholder.com/400x250?text=AI+Insights"
            />
          </MotionBox>
          
          {/* Overlay gradient for better text readability */}
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bgGradient="linear(to-t, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)"
          />
          
          {/* Tags positioned on the image */}
          <HStack 
            position="absolute" 
            bottom="3" 
            left="3" 
            flexWrap="wrap"
            spacing={2}
          >
            {article.tags.slice(0, 2).map(tag => (
              <Badge
                key={tag}
                px={2}
                py={1}
                borderRadius="full"
                colorScheme="purple"
                fontSize="xs"
                variant="solid"
                textTransform="lowercase"
              >
                {tag}
              </Badge>
            ))}
            {article.tags.length > 2 && (
              <Badge
                px={2}
                py={1}
                borderRadius="full"
                colorScheme="gray"
                fontSize="xs"
                variant="solid"
              >
                +{article.tags.length - 2}
              </Badge>
            )}
          </HStack>
        </Box>
        
        {/* Content section */}
        <VStack 
          align="stretch" 
          p={5} 
          spacing={4} 
          flex="1"
          justify="space-between"
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
          
          {/* Article metadata */}
          <HStack justify="space-between" fontSize="xs" color={textColor} mt={2}>
            <HStack spacing={1}>
              <Icon as={FiUser} />
              <Text>{article.author}</Text>
            </HStack>
            
            <HStack spacing={1}>
              <Icon as={FiClock} />
              <Text>{article.readTime}</Text>
            </HStack>
            
            <HStack spacing={1}>
              <Icon as={FiCalendar} />
              <Text>{new Date(article.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric'
              })}</Text>
            </HStack>
          </HStack>
        </VStack>
      </Box>
    </LinkBox>
  )
}

const Articles = () => {
  const [articles, setArticles] = useState<ArticleMetadata[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Animation variants for page load
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
  
  useEffect(() => {
    const loadArticles = async () => {
      try {
        setIsLoading(true)
        const data = await articleService.getAllMetadata()
        
        // Sort articles by date (newest first)
        const sortedArticles = [...data].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        
        setArticles(sortedArticles)
      } catch (error) {
        console.error('Error loading articles:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadArticles()
  }, [])

  // Background gradient
  const bgGradient = useColorModeValue(
    'linear(to-b, gray.50, white)',
    'linear(to-b, gray.900, transparent)'
  )

  return (
    <Box
      as="section"
      py={16}
      bgGradient={bgGradient}
      minHeight="100vh"
    >
      <Container maxW="7xl">
        {/* Page Header */}
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          mb={16}
          textAlign="center"
        >
          <Heading 
            fontSize={{ base: "3xl", md: "4xl" }}
            mb={4}
            bgGradient="linear(to-r, brand.400, purple.400)"
            bgClip="text"
          >
            Latest Insights & Articles
          </Heading>
          <Text 
            fontSize={{ base: "md", md: "lg" }}
            maxW="2xl"
            mx="auto"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Explore our collection of insights on AI, machine learning, and business transformation.
          </Text>
        </MotionBox>
        
        {/* Articles Grid */}
        <AnimatePresence>
          {!isLoading && (
            <MotionGrid
              templateColumns={{ 
                base: "repeat(1, 1fr)", 
                md: "repeat(2, 1fr)", 
                lg: "repeat(3, 1fr)" 
              }}
              gap={{ base: 10, lg: 8 }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              mb={16}
            >
              {articles.map((article, index) => (
                <MotionBox
                  key={article.id}
                  variants={itemVariants}
                >
                  <ArticleCard article={article} index={index} />
                </MotionBox>
              ))}
            </MotionGrid>
          )}
        </AnimatePresence>
        
        {/* Empty state */}
        {!isLoading && articles.length === 0 && (
          <Box textAlign="center" py={20}>
            <Heading size="lg" mb={4}>No articles found</Heading>
            <Text>Check back soon for new content!</Text>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default Articles 