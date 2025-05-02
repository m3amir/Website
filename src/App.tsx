import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme'
import ComingSoon from './components/ComingSoon'
import './App.css'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ComingSoon />
    </ChakraProvider>
  )
}

export default App
