import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
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
      primary: '#000000',
      secondary: '#1A1A1A',
      accent: '#2D2D2D',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#E0E0E0',
      accent: '#9638FF',
    }
  },
  styles: {
    global: {
      body: {
        bg: 'background.primary',
        color: 'text.primary',
      },
    },
  },
  components: {
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
    Container: {
      baseStyle: {
        maxW: '7xl',
        px: { base: '4', md: '8' },
      },
    },
  },
})

export default theme 