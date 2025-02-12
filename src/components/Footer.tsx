import { Box, Container, Text, Link, HStack } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Box bg="background.secondary" py={4} mt="auto">
      <Container maxW="7xl">
        <HStack spacing={2} justify="center" color="text.secondary">
          <Text>© {new Date().getFullYear()} M3Labs.</Text>
          <Text>|</Text>
          <Link href="mailto:info@m3labs.co.uk" color="brand.400" _hover={{ color: 'brand.300' }}>
            info@m3labs.co.uk
          </Link>
        </HStack>
      </Container>
    </Box>
  )
}

export default Footer 