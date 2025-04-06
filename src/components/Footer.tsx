import { Box, Container, Text, Link, HStack, useColorModeValue } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import React from 'react'

interface FooterProps {
  variant?: 'default' | 'security' | 'custom'
  bgColor?: string
  textColor?: string
  linkColor?: string
}

const Footer = ({ 
  variant = 'default',
  bgColor,
  textColor,
  linkColor
}: FooterProps) => {
  const location = useLocation()
  const currentPath = location.pathname

  // Determine if we're on the security page
  const isSecurityPage = currentPath === '/security'
  
  // If we're on the security page and no variant is explicitly set, use security variant
  const effectiveVariant = isSecurityPage && variant === 'default' ? 'security' : variant

  // Pre-compute all the color mode values unconditionally to avoid conditional Hook calls
  const defaultBgColor = useColorModeValue('white', 'gray.800')
  const defaultTextColor = useColorModeValue('gray.600', 'gray.300')
  const defaultBorderColor = useColorModeValue('gray.200', 'gray.700')

  // Set colors based on variant or custom props
  let backgroundColor, mainTextColor, mainLinkColor, borderTopColor

  switch (effectiveVariant) {
    case 'security':
      backgroundColor = bgColor || '#000000'
      mainTextColor = textColor || '#FFFFFF'
      mainLinkColor = linkColor || '#9638FF'
      borderTopColor = '#333333'
      break
    case 'custom':
      backgroundColor = bgColor || defaultBgColor
      mainTextColor = textColor || defaultTextColor
      mainLinkColor = linkColor || 'brand.400'
      borderTopColor = defaultBorderColor
      break
    default:
      backgroundColor = defaultBgColor
      mainTextColor = defaultTextColor
      mainLinkColor = 'brand.400'
      borderTopColor = defaultBorderColor
  }

  // For security page, we'll use direct inline styles to ensure they take precedence
  const securityStyles = effectiveVariant === 'security' ? {
    style: {
      backgroundColor: '#000000 !important',
      color: '#FFFFFF !important',
      borderTopColor: '#333333 !important',
    } as React.CSSProperties
  } : {}

  // For security page links, we'll use direct inline styles
  const securityLinkStyles = effectiveVariant === 'security' ? {
    style: {
      backgroundColor: '#000000 !important',
      color: '#9638FF !important',
    } as React.CSSProperties
  } : {}

  // For security page text, we'll use direct inline styles
  const securityTextStyles = effectiveVariant === 'security' ? {
    style: {
      backgroundColor: '#000000 !important',
      color: '#FFFFFF !important',
    } as React.CSSProperties
  } : {}

  return (
    <Box 
      py={4} 
      mt="auto" 
      bg={backgroundColor}
      color={mainTextColor}
      borderTopWidth="1px"
      borderTopColor={borderTopColor}
      className={`site-footer ${effectiveVariant}-footer`}
      {...securityStyles}
      data-page-type={effectiveVariant}
    >
      <Container maxW="7xl" {...securityStyles}>
        <HStack spacing={2} justify="center" {...securityStyles}>
          <Text {...securityTextStyles}>© {new Date().getFullYear()} M3Labs.</Text>
          <Text {...securityTextStyles}>|</Text>
          <Link 
            href="mailto:info@m3labs.co.uk" 
            color={mainLinkColor} 
            _hover={{ color: effectiveVariant === 'security' ? '#bf7bff' : 'brand.300' }}
            bg={backgroundColor}
            {...securityLinkStyles}
          >
            info@m3labs.co.uk
          </Link>
        </HStack>
      </Container>
    </Box>
  )
}

export default Footer 