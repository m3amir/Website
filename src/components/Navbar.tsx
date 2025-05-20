import { Box, Container, Button, Stack, Text, IconButton, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, VStack } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HamburgerIcon } from '@chakra-ui/icons'

const MotionBox = motion(Box)
const MotionStack = motion(Stack)

const Navbar = () => {
  const location = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const isActive = (path: string) => location.pathname === path

  const NavLinks = ({ isMobile = false, onClose = () => {} }) => (
    <>
      <Link to="/products" onClick={isMobile ? onClose : undefined}>
        <Button
          variant="unstyled"
          color={location.pathname === '/security' || location.pathname === '/knowledge' ? "white" : "#787878"}
          position="relative"
          overflow="hidden"
          py={2}
          px={4}
          width={isMobile ? "full" : "auto"}
          fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
          fontWeight="normal"
          fontSize="14px"
          letterSpacing="0.2px"
          _before={{
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '2px',
            bottom: 0,
            left: 0,
            background: 'brand.400',
            transform: isActive('/products') ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'right',
            transition: 'transform 0.3s ease',
          }}
          _hover={{
            _before: {
              transform: 'scaleX(1)',
              transformOrigin: 'left',
            },
            cursor: "pointer"
          }}
          _focus={{
            boxShadow: "none",
            outline: "none"
          }}
        >
          Products
        </Button>
      </Link>
      <Link to="/ai-worker" onClick={isMobile ? onClose : undefined}>
        <Button
          variant="unstyled"
          color={location.pathname === '/security' || location.pathname === '/knowledge' ? "white" : "#787878"}
          position="relative"
          overflow="hidden"
          py={2}
          px={4}
          width={isMobile ? "full" : "auto"}
          fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
          fontWeight="normal"
          fontSize="14px"
          letterSpacing="0.2px"
          _before={{
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '2px',
            bottom: 0,
            left: 0,
            background: 'brand.400',
            transform: isActive('/ai-worker') ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'right',
            transition: 'transform 0.3s ease',
          }}
          _hover={{
            _before: {
              transform: 'scaleX(1)',
              transformOrigin: 'left',
            },
            cursor: "pointer"
          }}
          _focus={{
            boxShadow: "none",
            outline: "none"
          }}
        >
          AI Worker
        </Button>
      </Link>
      <Link to="/knowledge" onClick={isMobile ? onClose : undefined}>
        <Button
          variant="unstyled"
          color={location.pathname === '/security' || location.pathname === '/knowledge' ? "white" : "#787878"}
          position="relative"
          overflow="hidden"
          py={2}
          px={4}
          width={isMobile ? "full" : "auto"}
          fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
          fontWeight="normal"
          fontSize="14px"
          letterSpacing="0.2px"
          _before={{
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '2px',
            bottom: 0,
            left: 0,
            background: 'brand.400',
            transform: isActive('/knowledge') ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'right',
            transition: 'transform 0.3s ease',
          }}
          _hover={{
            _before: {
              transform: 'scaleX(1)',
              transformOrigin: 'left',
            },
            cursor: "pointer"
          }}
          _focus={{
            boxShadow: "none",
            outline: "none"
          }}
        >
          Knowledge
        </Button>
      </Link>
      <Link to="/security" onClick={isMobile ? onClose : undefined}>
        <Button
          variant="unstyled"
          color={location.pathname === '/security' || location.pathname === '/knowledge' ? "white" : "#787878"}
          position="relative"
          overflow="hidden"
          py={2}
          px={4}
          width={isMobile ? "full" : "auto"}
          fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
          fontWeight="normal"
          fontSize="14px"
          letterSpacing="0.2px"
          _before={{
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '2px',
            bottom: 0,
            left: 0,
            background: 'brand.400',
            transform: isActive('/security') ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'right',
            transition: 'transform 0.3s ease',
          }}
          _hover={{
            _before: {
              transform: 'scaleX(1)',
              transformOrigin: 'left',
            },
            cursor: "pointer"
          }}
          _focus={{
            boxShadow: "none",
            outline: "none"
          }}
        >
          Security
        </Button>
      </Link>
      <Link to="/contact" onClick={isMobile ? onClose : undefined}>
        <Button
          variant="unstyled"
          color={location.pathname === '/security' || location.pathname === '/knowledge' ? "white" : "#787878"}
          position="relative"
          overflow="hidden"
          py={2}
          px={6}
          width={isMobile ? "full" : "auto"}
          fontFamily="'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif"
          fontWeight="normal"
          fontSize="14px"
          letterSpacing="0.2px"
          _before={{
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '2px',
            bottom: 0,
            left: 0,
            background: 'brand.400',
            transform: isActive('/contact') ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'right',
            transition: 'transform 0.3s ease',
          }}
          _hover={{
            _before: {
              transform: 'scaleX(1)',
              transformOrigin: 'left',
            },
            cursor: "pointer"
          }}
          _focus={{
            boxShadow: "none",
            outline: "none"
          }}
        >
          Contact
        </Button>
      </Link>
    </>
  )

  return (
    <>
      <MotionBox
        as="nav"
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1000}
        backdropFilter={location.pathname === '/security' || location.pathname === '/knowledge' ? "none" : "blur(10px)"}
        bg={location.pathname === '/security' || location.pathname === '/knowledge' ? "#000000" : "rgba(255, 255, 255, 0.9)"}
        borderBottom="1px solid"
        borderColor={location.pathname === '/security' || location.pathname === '/knowledge' ? "gray.800" : "gray.200"}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        style={location.pathname === '/security' || location.pathname === '/knowledge' ? { backgroundColor: "#000000" } : {}}
        className={location.pathname === '/security' || location.pathname === '/knowledge' ? "security-page-nav" : ""}
      >
        <Container 
          maxW="container.xl" 
          py={4} 
          px={{ base: 2, md: 6 }}
          className={location.pathname === '/security' || location.pathname === '/knowledge' ? "security-page-nav" : ""} 
          style={location.pathname === '/security' || location.pathname === '/knowledge' ? { backgroundColor: "#000000" } : {}}
        >
          <Stack 
            direction="row" 
            justify="space-between" 
            align="center"
            spacing={{ base: 8, md: "100px" }}
            className={location.pathname === '/security' || location.pathname === '/knowledge' ? "security-page-nav" : ""}
            style={location.pathname === '/security' || location.pathname === '/knowledge' ? { backgroundColor: "#000000" } : {}}
            pr={{ base: 0, md: "020px" }}
            pl={{ base: 0, md: "-800px" }}
          >
            <Link to="/">
              <MotionBox
                fontWeight="bold"
                fontSize="xl"
                color="text.primary"
                position="relative"
                display="inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                pl={{ base: 0, md: 0 }}
                style={{ backgroundColor: "transparent !important" }}
                className={location.pathname === '/security' || location.pathname === '/knowledge' ? "security-page-nav-logo" : ""}
                sx={{
                  "& *": {
                    backgroundColor: "transparent !important"
                  }
                }}
              >
                <Box
                  as="span"
                  position="relative"
                  zIndex={1}
                  _after={{
                    content: '""',
                    position: 'absolute',
                    left: '0',
                    bottom: '-4px',
                    width: '100%',
                    height: '2px',
                    background: 'brand.400',
                    transform: 'scaleX(0)',
                    transformOrigin: 'right',
                    transition: 'transform 0.3s ease',
                  }}
                  _hover={{
                    _after: {
                      transform: 'scaleX(1)',
                      transformOrigin: 'left',
                    }
                  }}
                  style={{ backgroundColor: "transparent !important" }}
                >
                  <Text 
                    as="span" 
                    color={location.pathname === '/security' || location.pathname === '/knowledge' ? "#FFFFFF" : "#000000"}
                    style={{ backgroundColor: "transparent !important", color: location.pathname === '/security' || location.pathname === '/knowledge' ? "#FFFFFF !important" : "#000000 !important" }}
                  >
                    M3
                  </Text>
                  <Text 
                    as="span" 
                    color={location.pathname === '/security' || location.pathname === '/knowledge' ? "#FFFFFF" : "#000000"}
                    style={{ backgroundColor: "transparent !important", color: location.pathname === '/security' || location.pathname === '/knowledge' ? "#FFFFFF !important" : "#000000 !important" }}
                  >
                    Labs
                  </Text>
                </Box>
              </MotionBox>
            </Link>
            
            {/* Desktop Navigation */}
            <MotionStack
              direction="row"
              gap={8}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              display={{ base: "none", md: "flex" }}
              position={{ md: "absolute" }}
              right={{ md: "100px" }}
            >
              <NavLinks />
            </MotionStack>

            {/* Mobile Menu Button */}
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon color={location.pathname === '/security' || location.pathname === '/knowledge' ? "white" : "text.primary"} />}
              variant="ghost"
              color={location.pathname === '/security' || location.pathname === '/knowledge' ? "white" : "text.primary"}
              display={{ base: "flex", md: "none" }}
              onClick={onOpen}
              _focus={{
                boxShadow: "none",
                outline: "none"
              }}
              _hover={{
                cursor: "pointer"
              }}
            />
          </Stack>
        </Container>

        {/* Mobile Navigation Drawer */}
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
          <DrawerOverlay />
          <DrawerContent 
            bg={location.pathname === '/security' || location.pathname === '/knowledge' ? "#000000" : "white"} 
            maxW="200px"
            style={location.pathname === '/security' || location.pathname === '/knowledge' ? { backgroundColor: "#000000" } : {}}
            className={location.pathname === '/security' || location.pathname === '/knowledge' ? "security-page-nav" : ""}
          >
            <DrawerCloseButton color={location.pathname === '/security' || location.pathname === '/knowledge' ? "white" : "text.primary"} />
            <DrawerHeader borderBottomWidth="1px" color={location.pathname === '/security' || location.pathname === '/knowledge' ? "white" : "text.primary"}>Menu</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} mt={4}>
                <NavLinks isMobile onClose={onClose} />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </MotionBox>
    </>
  )
}

export default Navbar 