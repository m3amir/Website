import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
  },
  colors: {
    brand: {
      50: '#F3E5FF',
      100: '#E1C2FF',
      200: '#C894FF',
      300: '#AF66FF',
      400: '#9638FF',
      500: '#7D0AFF',
      600: '#6400DB',
      700: '#4C00B8',
      800: '#340095',
      900: '#1C0072',
    },
    background: {
      primary: '#FFFFFF',
      secondary: '#F5F5F5',
      accent: '#E0E0E0',
    },
    text: {
      primary: '#000000',
      secondary: '#333333',
      accent: '#9638FF',
    }
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'black',
        letterSpacing: "0.2px",
      },
      'html, body': {
        bg: 'white',
        color: 'black',
        letterSpacing: "0.2px",
      },
      '#root': {
        bg: 'white',
        color: 'black',
        letterSpacing: "0.2px",
      },
    },
  },
  components: {
    Box: {
      baseStyle: {
        bg: 'white',
        color: 'black',
      },
    },
    Container: {
      baseStyle: {
        maxW: '7xl',
        px: { base: '4', md: '8' },
        bg: 'white',
        color: 'black',
      },
    },
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
      },
      variants: {
        solid: {
          bg: 'brand.400',
          color: 'white',
          _hover: {
            bg: 'brand.500',
          },
        },
        outline: {
          borderColor: 'brand.400',
          color: 'text.primary',
          _hover: {
            bg: 'brand.400',
            color: 'white',
          },
        },
        unstyled: {
          background: 'transparent',
          border: 'none',
          padding: 0,
          height: 'auto',
          minWidth: 'auto',
          _hover: {
            background: 'transparent',
          },
          _active: {
            background: 'transparent',
          },
          _focus: {
            boxShadow: 'none',
          },
        },
      },
    },
  },
})

export default theme 