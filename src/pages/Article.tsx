import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Tag,
  Icon,
  Divider,
  Skeleton,
  Image,
  TextProps
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiClock, FiCalendar, FiUser } from 'react-icons/fi';
import { Article as ArticleType } from '../types/article';
import { articleService } from '../services/articleService';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ReactNode } from 'react';
import ScrollToTop from '../components/ScrollToTop'

interface MarkdownImageProps {
  src?: string;
  alt?: string;
}

const MarkdownImage = ({ src, alt }: MarkdownImageProps) => {
  // Parse width and height from alt text (e.g., "alt text|500|300" for width 500px and height 300px)
  const [altText, widthValue] = alt?.split('|') || [];
  const width = widthValue ? `${widthValue}px` : '100%';

  return (
    <Box 
      width="100%" 
      display="flex" 
      flexDirection="column"
      alignItems="center"
      mt={6}
      mb={2}
    >
      <Box
        width={width}
        maxWidth="100%"
        borderRadius="lg"
        boxShadow="lg"
        lineHeight="0"
      >
        <Image
          src={src}
          alt={altText || ''}
          width="100%"
          height="auto"
          display="block"
          style={{ margin: 0 }}
        />
      </Box>
      {altText && (
        <Text
          fontSize="sm"
          color="gray.600"
          textAlign="center"
          mt={1}
          fontStyle="italic"
          maxWidth={width}
        >
          {altText}
        </Text>
      )}
    </Box>
  );
};

interface MarkdownParagraphProps extends TextProps {
  children?: ReactNode;
}

const MarkdownParagraph = ({ children, ...props }: MarkdownParagraphProps) => {
  // Check if the only child is an image
  if (children && typeof children === 'object' && 'type' in children && children.type === MarkdownImage) {
    // Return the image directly without additional wrapping
    return <>{children}</>;
  }
  // Regular paragraph
  return (
    <Text
      marginY="1em"
      lineHeight="1.8"
      {...props}
    >
      {children}
    </Text>
  );
};

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        if (!slug) {
          throw new Error('Article slug is missing');
        }
        const articleData = await articleService.getArticleBySlug(slug);
        if (!articleData) {
          throw new Error('Article not found');
        }
        setArticle(articleData);
        setError(null);
      } catch (err) {
        console.error('Error loading article:', err);
        setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <Box bg="white" minH="calc(100vh - 64px)" mt="64px">
        <Container maxW="4xl">
          <VStack spacing={4} align="stretch">
            <Skeleton height="40px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="400px" />
          </VStack>
        </Container>
      </Box>
    );
  }

  if (error || !article) {
    return (
      <Box bg="white" minH="calc(100vh - 64px)" mt="64px">
        <Container maxW="4xl">
          <Text color="red.500" textAlign="center">
            {error || 'Article not found'}
          </Text>
        </Container>
      </Box>
    );
  }
  return (
    <>
      <Box as="article" py={{ base: 8, md: 12 }}>
        <Box bg="white" minH="calc(100vh - 64px)" mt="64px">
          <Container maxW="4xl">
            <VStack spacing={4} align="stretch">
              {/* Header */}
              <VStack spacing={2} align="stretch">
                {article.image && (
                  <Box
                    width="100%"
                    height="auto"
                    overflow="hidden"
                    borderRadius="lg"
                    mb={4}
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      width="100%"
                      objectFit="cover"
                    />
                  </Box>
                )}
                
                <Heading
                  color="black"
                  fontSize={{ base: "3xl", md: "4xl" }}
                  lineHeight="1.2"
                  fontWeight="bold"
                  pt={2}
                >
                  {article.title}
                </Heading>

                {/* Metadata */}
                <HStack spacing={6} color="gray.600" fontSize="sm">
                  <HStack spacing={2}>
                    <Icon as={FiCalendar} />
                    <Text>{article.date}</Text>
                  </HStack>
                  <HStack spacing={2}>
                    <Icon as={FiClock} />
                    <Text>{article.readTime}</Text>
                  </HStack>
                  <HStack spacing={2}>
                    <Icon as={FiUser} />
                    <Text>{article.author}</Text>
                  </HStack>
                </HStack>

                {/* Tags */}
                <HStack spacing={2} flexWrap="wrap">
                  {article.tags.map(tag => (
                    <Tag
                      key={tag}
                      size="md"
                      variant="subtle"
                      colorScheme="purple"
                      borderRadius="full"
                    >
                      {tag}
                    </Tag>
                  ))}
                </HStack>

                <Text
                  color="gray.700"
                  fontSize="lg"
                  fontStyle="italic"
                >
                  {article.description}
                </Text>
              </VStack>

              <Divider borderColor="gray.300" />

              {/* Article Body */}
              <Box
                className="markdown-content"
                color="black"
                sx={{
                  'h1, h2, h3, h4, h5, h6': {
                    color: 'black',
                    fontWeight: 'bold',
                    marginTop: '1.5em',
                    marginBottom: '0.5em',
                    textAlign: 'left'
                  },
                  'h1': { fontSize: '2xl' },
                  'h2': { fontSize: 'xl' },
                  'h3': { fontSize: 'lg' },
                  'p': {
                    marginY: '0.75em',
                    lineHeight: '1.8',
                    textAlign: 'left'
                  },
                  'ul, ol': {
                    paddingLeft: '1.5em',
                    marginY: '1em',
                    textAlign: 'left'
                  },
                  'li': {
                    marginY: '0.5em',
                    textAlign: 'left'
                  },
                  'a': {
                    color: 'brand.400',
                    textDecoration: 'none',
                    _hover: {
                      textDecoration: 'underline'
                    }
                  },
                  'blockquote': {
                    borderLeftWidth: '4px',
                    borderLeftColor: 'brand.400',
                    paddingLeft: '1em',
                    marginY: '1.5em',
                    fontStyle: 'italic',
                    color: 'gray.700',
                    textAlign: 'left'
                  },
                  'code': {
                    bg: 'gray.100',
                    color: 'black',
                    padding: '0.2em 0.4em',
                    borderRadius: 'md',
                    fontSize: '0.9em'
                  },
                  'pre code': {
                    display: 'block',
                    padding: '1em',
                    overflow: 'auto'
                  },
                  'img': {
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 'lg',
                  }
                }}
              >
                <ReactMarkdown
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    img: MarkdownImage,
                    p: MarkdownParagraph
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </Box>
            </VStack>
          </Container>
        </Box>
      </Box>
      <ScrollToTop />
    </>
  );
};

export default Article; 