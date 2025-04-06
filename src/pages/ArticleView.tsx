import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack,
  Image,
  HStack,
  Tag,
  Divider
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Article } from '../types/article'
import { articleService } from '../services/articleService'
import { marked } from 'marked'

const MotionBox = motion(Box)

const ArticleView = () => {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<Article | null>(null)

  useEffect(() => {
    const loadArticle = async () => {
      if (slug) {
        const foundArticle = await articleService.getArticleBySlug(slug)
        if (foundArticle) {
          setArticle(foundArticle)
        }
      }
    }
    loadArticle()
  }, [slug])

  if (!article) {
    return (
      <Box py={20} bg="white">
        <Container maxW="7xl">
          <Text color="black">Article not found</Text>
        </Container>
      </Box>
    )
  }

  return (
    <Box py={20} bg="white">
      <Container maxW="4xl">
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <VStack spacing={8} align="stretch">
            {article.imageUrl && (
              <Image
                src={article.imageUrl}
                alt={article.title}
                w="full"
                h="400px"
                objectFit="cover"
                borderRadius="lg"
              />
            )}

            <VStack spacing={4} align="stretch">
              <Heading size="2xl" color="black">{article.title}</Heading>
              
              <HStack spacing={4} color="gray.700">
                <Text>{article.author}</Text>
                <Text>•</Text>
                <Text>{new Date(article.date).toLocaleDateString()}</Text>
                <Text>•</Text>
                <Text>{article.readTime}</Text>
              </HStack>

              <HStack spacing={2} flexWrap="wrap">
                {article.tags.map(tag => (
                  <Tag
                    key={tag}
                    size="md"
                    variant="subtle"
                    colorScheme="purple"
                  >
                    {tag}
                  </Tag>
                ))}
              </HStack>
            </VStack>

            <Divider borderColor="gray.300" />

            <Box
              className="article-content"
              dangerouslySetInnerHTML={{ __html: marked(article.content) }}
              sx={{
                'h1, h2, h3, h4, h5, h6': {
                  color: 'black',
                  fontWeight: 'bold',
                  marginTop: '1.5em',
                  marginBottom: '0.5em',
                },
                'h1': { fontSize: '3xl' },
                'h2': { fontSize: '2xl' },
                'h3': { fontSize: 'xl' },
                'p': {
                  color: 'gray.800',
                  marginBottom: '1em',
                  lineHeight: '1.7',
                },
                'ul, ol': {
                  color: 'gray.800',
                  paddingLeft: '1.5em',
                  marginBottom: '1em',
                },
                'li': {
                  marginBottom: '0.5em',
                },
                'a': {
                  color: 'brand.400',
                  textDecoration: 'none',
                  _hover: {
                    textDecoration: 'underline',
                  },
                },
                'blockquote': {
                  borderLeft: '4px solid',
                  borderColor: 'brand.400',
                  paddingLeft: '1em',
                  marginY: '1.5em',
                  color: 'gray.700',
                  fontStyle: 'italic',
                },
                'code': {
                  bg: 'gray.100',
                  color: 'black',
                  padding: '0.2em 0.4em',
                  borderRadius: 'md',
                  fontSize: '0.9em',
                },
                'pre code': {
                  display: 'block',
                  padding: '1em',
                  overflow: 'auto',
                },
              }}
            />
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  )
}

export default ArticleView 