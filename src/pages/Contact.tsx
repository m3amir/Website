import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  useToast,
  useBreakpointValue,
  Icon
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { FiUser, FiMail, FiMessageSquare } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../config/emailjs'

const MotionBox = motion(Box)
const MotionVStack = motion(VStack)

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()
  const iconSize = useBreakpointValue({ base: "0.65rem", md: "0.8rem" })
  const inputPadding = useBreakpointValue({ base: "0.75rem", md: "1rem" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const form = e.target as HTMLFormElement
      
      await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        form,
        EMAILJS_CONFIG.PUBLIC_KEY,
      )
      
      toast({
        title: 'Message sent!',
        description: "We'll get back to you as soon as possible.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      form.reset()
    } catch {
      toast({
        title: 'Error sending message',
        description: "Please try again later.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box 
      py={{ base: 28, md: 36 }} 
      position="relative" 
      overflow="hidden"
    >
      <Container maxW="7xl" position="relative" px={{ base: 4, md: 8 }}>
        <MotionVStack
          spacing={{ base: 8, md: 10 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading 
            size={{ base: "xl", md: "2xl" }} 
            textAlign="center"
            px={{ base: 2, md: 0 }}
            bgGradient="linear(to-r, brand.300, brand.500)"
            bgClip="text"
          >
            Get in Touch
          </Heading>
          <Text 
            fontSize={{ base: "md", md: "lg" }} 
            color="text.secondary" 
            maxW="2xl" 
            textAlign="center"
            px={{ base: 4, md: 0 }}
          >
            Have a question or want to work together? Send us a message and we'll get back to you as soon as possible.
          </Text>

          <MotionBox
            as="form"
            onSubmit={handleSubmit}
            w="full"
            maxW="xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            px={{ base: 4, md: 0 }}
          >
            <VStack spacing={{ base: 4, md: 6 }} align="stretch">
              <FormControl isRequired>
                <FormLabel fontSize={{ base: "sm", md: "md" }} fontWeight="medium">Name</FormLabel>
                <Input
                  name="from_name"
                  type="text"
                  placeholder="Your name"
                  border="2px solid"
                  borderColor="gray.300"
                  bg="white"
                  color="gray.800"
                  borderRadius="md"
                  fontSize={{ base: "sm", md: "md" }}
                  h="auto"
                  py={inputPadding}
                  pl="2.5rem"
                  _hover={{
                    borderColor: "brand.300",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-300)",
                  }}
                  _focus={{
                    borderColor: "brand.400",
                    boxShadow: "0 0 0 2px var(--chakra-colors-brand-400)",
                  }}
                />
                <Box position="absolute" left="1rem" top="2.5rem" pointerEvents="none">
                  <Icon as={FiUser} color="brand.300" boxSize={iconSize} />
                </Box>
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize={{ base: "sm", md: "md" }} fontWeight="medium">Email</FormLabel>
                <Input
                  name="from_email"
                  type="email"
                  placeholder="your.email@example.com"
                  border="2px solid"
                  borderColor="gray.300"
                  bg="white"
                  color="gray.800"
                  borderRadius="md"
                  fontSize={{ base: "sm", md: "md" }}
                  h="auto"
                  py={inputPadding}
                  pl="2.5rem"
                  _hover={{
                    borderColor: "brand.300",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-300)",
                  }}
                  _focus={{
                    borderColor: "brand.400",
                    boxShadow: "0 0 0 2px var(--chakra-colors-brand-400)",
                  }}
                />
                <Box position="absolute" left="1rem" top="2.5rem" pointerEvents="none">
                  <Icon as={FiMail} color="brand.300" boxSize={iconSize} />
                </Box>
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontSize={{ base: "sm", md: "md" }} fontWeight="medium">Message</FormLabel>
                <Textarea
                  name="message"
                  placeholder="Your message"
                  minH={{ base: "120px", md: "150px" }}
                  border="2px solid"
                  borderColor="gray.300"
                  bg="white"
                  color="gray.800"
                  borderRadius="md"
                  fontSize={{ base: "sm", md: "md" }}
                  py={inputPadding}
                  pl="2.5rem"
                  _hover={{
                    borderColor: "brand.300",
                    boxShadow: "0 0 0 1px var(--chakra-colors-brand-300)",
                  }}
                  _focus={{
                    borderColor: "brand.400",
                    boxShadow: "0 0 0 2px var(--chakra-colors-brand-400)",
                  }}
                />
                <Box position="absolute" left="1rem" top="2.5rem" pointerEvents="none">
                  <Icon as={FiMessageSquare} color="brand.300" boxSize={iconSize} />
                </Box>
              </FormControl>

              {/* Hidden input for recipient email */}
              <Input
                type="hidden"
                name="to_email"
                value="info@m3labs.co.uk"
              />

              <Button
                type="submit"
                bg="purple.600"
                color="white"
                size={{ base: "md", md: "lg" }}
                w="full"
                isLoading={isSubmitting}
                fontSize={{ base: "sm", md: "md" }}
                h="auto"
                py={inputPadding}
                mt={4}
                fontWeight="semibold"
                borderRadius="md"
                border="none"
                boxShadow="0 4px 12px rgba(150, 56, 255, 0.2)"
                _hover={{
                  bg: 'purple.500',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(150, 56, 255, 0.4)',
                }}
                _active={{
                  bg: 'purple.700',
                  transform: 'translateY(0)',
                  boxShadow: '0 2px 8px rgba(150, 56, 255, 0.3)',
                }}
                transition="all 0.3s ease"
                style={{
                  background: 'linear-gradient(135deg, #9363ff 0%, #6e38cc 100%)',
                }}
              >
                Send Message
              </Button>
            </VStack>
          </MotionBox>
        </MotionVStack>
      </Container>
    </Box>
  )
}

export default Contact 