import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid, 
  VStack,
  Tag,
  HStack,
  Image,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { ArticleMetadata } from '../types/article'
import { articleService } from '../services/articleService'

const MotionBox = motion(Box)

const ArticleCard = ({ article }: { article: ArticleMetadata }) => {
  return (
    <LinkBox as={MotionBox}
      whileHover={{ y: -5 }}
      style={{ transition: 'transform 0.2s' }}
    >
      <Box
        borderRadius="lg"
        overflow="hidden"
        bg="background.secondary"
        border="1px solid"
        borderColor="whiteAlpha.200"
        _hover={{
          borderColor: "brand.400",
          boxShadow: "0 4px 12px rgba(150, 56, 255, 0.1)",
        }}
      >
        {article.imageUrl && (
          <Image
            src={article.imageUrl}
            alt={article.title}
            w="full"
            h="200px"
            objectFit="cover"
          />
        )}
        <VStack align="stretch" p={6} spacing={4}>
          <VStack align="stretch" spacing={2}>
            <LinkOverlay as={Link} to={`/articles/${article.slug}`}>
              <Heading size="md" color="text.primary">
                {article.title}
              </Heading>
            </LinkOverlay>
            <Text color="text.secondary" fontSize="sm">
              {article.description}
            </Text>
          </VStack>
          
          <HStack justify="space-between" fontSize="sm" color="text.secondary">
            <Text>{article.author}</Text>
            <Text>{article.readTime}</Text>
          </HStack>

          <HStack spacing={2} flexWrap="wrap">
            {article.tags.map(tag => (
              <Tag
                key={tag}
                size="sm"
                variant="subtle"
                colorScheme="purple"
                cursor="pointer"
                _hover={{ bg: 'brand.400', color: 'white' }}
              >
                {tag}
              </Tag>
            ))}
          </HStack>
        </VStack>
      </Box>
    </LinkBox>
  )
}

const Articles = () => {
  const [articles, setArticles] = useState<ArticleMetadata[]>([])

  useEffect(() => {
    const loadArticles = async () => {
      const data = await articleService.getAllMetadata()
      setArticles(data)
    }
    loadArticles()
  }, [])

  return (
    <Box
      as="section"
      py={20}
      _hover={{
        transform: 'translateY(-5px)',
        transitionProperty: 'transform',
        transitionDuration: '0.2s'
      }}
    >
      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default Articles 