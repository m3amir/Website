import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Tag,
  Input,
  InputGroup,
  Icon,
  Grid,
  GridItem,
  Divider,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiBook, FiClock, FiArrowRight } from 'react-icons/fi'
import { ArticleMetadata } from '../types/article'
import { articleService } from '../services/articleService'

const MotionBox = motion(Box)
const MotionSimpleGrid = motion(SimpleGrid)

const KnowledgeCard = ({ article }: { article: ArticleMetadata }) => {
  return (
    <MotionBox
      as={Link}
      to={`/articles/${article.slug}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Box
        p={6}
        borderRadius="xl"
        bg="gray.100"
        border="1px solid"
        borderColor="gray.300"
        h="full"
        position="relative"
        _hover={{
          borderColor: "brand.400",
          boxShadow: "0 4px 20px rgba(150, 56, 255, 0.15)",
          '& .arrow-icon': {
            transform: 'translateX(4px)',
          }
        }}
      >
        <VStack align="stretch" spacing={4} h="full">
          <VStack align="stretch" spacing={3} flex="1">
            <HStack spacing={2}>
              <Icon as={FiBook} color="brand.400" />
              <Text color="black" fontSize="sm" fontWeight="semibold" letterSpacing="wide" textTransform="uppercase">
                Article
              </Text>
            </HStack>

            <Heading 
              size="md" 
              color="black"
              lineHeight="1.4"
              letterSpacing="tight"
            >
              {article.title}
            </Heading>

            <Text 
              color="black" 
              fontSize="sm"
              lineHeight="1.6"
            >
              {article.description}
            </Text>
          </VStack>

          <Box>
            <Divider borderColor="gray.300" mb={4} />
            <HStack spacing={2} flexWrap="wrap" mb={4}>
              {article.tags.map(tag => (
                <Tag
                  key={tag}
                  size="sm"
                  variant="solid"
                  colorScheme="purple"
                  borderRadius="full"
                  px={3}
                  border="1px solid"
                  borderColor="purple.300"
                >
                  {tag}
                </Tag>
              ))}
            </HStack>

            <HStack justify="space-between" fontSize="sm" color="black">
              <HStack spacing={2}>
                <Icon as={FiClock} />
                <Text>{article.readTime}</Text>
              </HStack>
              <HStack 
                spacing={2}
                color="brand.400"
                _hover={{ color: "brand.300" }}
              >
                <Text fontWeight="medium">Read More</Text>
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
    </MotionBox>
  )
}

const Knowledge = () => {
  const [articles, setArticles] = useState<ArticleMetadata[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true)
      try {
        const metadata = await articleService.getAllMetadata()
        if (metadata && metadata.length > 0) {
          setArticles(metadata)
        }
      } catch (e) {
        setError((e as Error).message)
      }
      setLoading(false)
    }

    loadArticles()
  }, [])

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  if (loading) {
    return (
      <Box minH="100vh" bg="white" pt="64px">
        <Container maxW="7xl" py={24}>
          <Text color="brand.400" textAlign="center">Loading articles...</Text>
        </Container>
      </Box>
    )
  }

  if (error) {
    return (
      <Box minH="100vh" bg="white" pt="64px">
        <Container maxW="7xl" py={24}>
          <Text color="red.400" textAlign="center">{error}</Text>
        </Container>
      </Box>
    )
  }

  return (
    <Box bg="white" minH="100vh">
      {/* Hero Section */}
      <Box 
        pt={24} 
        pb={12} 
        borderBottom="1px solid"
        borderColor="gray.200"
        bg="white"
      >
        <Container maxW="7xl">
          <VStack spacing={4} align="center" textAlign="center">
            <Heading 
              color="black"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              letterSpacing="tight"
              lineHeight="1.2"
              bg="white"
              px={4}
              py={2}
              borderRadius="md"
            >
              Knowledge Hub
            </Heading>
            <Text 
              fontSize={{ base: "lg", md: "xl" }} 
              maxW="2xl"
              lineHeight="1.6"
              fontWeight="medium"
              color="black"
              bg="white"
              px={4}
              py={2}
              borderRadius="md"
            >
              Comprehensive guides and resources to help you implement modern workplace solutions.
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Content Section */}
      <Box py={12}>
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: "250px 1fr" }} gap={8}>
            {/* Sidebar with search */}
            <GridItem>
              <Box position="sticky" top="84px">
                <InputGroup>
                  <Input
                    placeholder="Search..."
                    bg="gray.100"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="xl"
                    color="black"
                    fontSize="md"
                    height="44px"
                    _placeholder={{ color: 'gray.500' }}
                    _hover={{
                      borderColor: "brand.400",
                    }}
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>
              </Box>
            </GridItem>

            {/* Main content */}
            <GridItem>
              <MotionSimpleGrid
                columns={{ base: 1, xl: 2 }}
                spacing={8}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {filteredArticles.map(article => (
                  <KnowledgeCard key={article.slug} article={article} />
                ))}
              </MotionSimpleGrid>

              {filteredArticles.length === 0 && (
                <VStack spacing={4} align="center" py={12}>
                  <Text color="brand.400" fontSize="lg">
                    No articles found matching your search.
                  </Text>
                </VStack>
              )}
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

export default Knowledge 