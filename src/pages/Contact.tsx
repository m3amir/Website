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
  InputGroup,
  InputLeftElement
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
    } catch (error) {
      console.error('Error sending email:', error)
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
    <Box py={20} position="relative" overflow="hidden">
      <Container maxW="7xl" position="relative">
        <MotionVStack
          spacing={8}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading size="2xl" textAlign="center">Get in Touch</Heading>
          <Text fontSize="lg" color="text.secondary" maxW="2xl" textAlign="center">
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
          >
            <VStack spacing={6} align="stretch">
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiUser color="gray.300" />
                  </InputLeftElement>
                  <Input
                    name="from_name"
                    type="text"
                    placeholder="Your name"
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    _hover={{
                      borderColor: "brand.400",
                    }}
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
                    placeholder="your.email@example.com"
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    _hover={{
                      borderColor: "brand.400",
                    }}
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Message</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FiMessageSquare color="gray.300" />
                  </InputLeftElement>
                  <Textarea
                    name="message"
                    placeholder="Your message"
                    minH="150px"
                    bg="whiteAlpha.100"
                    border="1px solid"
                    borderColor="whiteAlpha.200"
                    _hover={{
                      borderColor: "brand.400",
                    }}
                    _focus={{
                      borderColor: "brand.400",
                      boxShadow: "0 0 0 1px var(--chakra-colors-brand-400)",
                    }}
                    pl={10}
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
                bg="brand.400"
                color="white"
                size="lg"
                w="full"
                isLoading={isSubmitting}
                _hover={{
                  bg: 'brand.500',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 12px rgba(150, 56, 255, 0.3)',
                }}
                transition="all 0.3s ease"
              >
                Send Message
              </Button>
            </VStack>
          </MotionBox>
        </MotionVStack>

        {/* Decorative elements */}
        <MotionBox
          position="absolute"
          top="20%"
          left="0"
          width="200px"
          height="200px"
          borderRadius="full"
          bg="brand.400"
          filter="blur(100px)"
          opacity={0.1}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          zIndex={-1}
        />
        <MotionBox
          position="absolute"
          bottom="10%"
          right="0"
          width="250px"
          height="250px"
          borderRadius="full"
          bg="brand.500"
          filter="blur(120px)"
          opacity={0.1}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          zIndex={-1}
        />
      </Container>
    </Box>
  )
}

export default Contact 