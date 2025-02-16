import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { FiStar, FiCode, FiUsers, FiGlobe } from 'react-icons/fi'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import './About.css' // We'll create this file for custom timeline styles
import ScrollToTop from '../components/ScrollToTop'

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const timelineData: TimelineItem[] = [
  {
    year: 'Nov-2023',
    title: 'Foundation',
    description: 'M3Labs was founded with a vision to transform workplace solutions through innovative agentic AI.',
    icon: FiStar,
  },
  {
    year: 'Dec-2023',
    title: 'Major Restructuring',
    description: 'Pivoted our focus to enterprise customer success, developing targeted strategies for retention and satisfaction enhancement through AI-driven solutions.',
    icon: FiCode,
  },
  {
    year: 'Oct-2024',
    title: 'Team Expansion',
    description: 'Strengthened our core team with industry veterans specializing in AI productionalization, bringing decades of combined experience in enterprise AI deployment.',
    icon: FiUsers,
  },
  {
    year: 'Dec-2024',
    title: 'First version AI Worker',
    description: 'Developed and launched the first version of our holistic AI worker, a groundbreaking solution for enterprise workplace automation and optimization.',
    icon: FiGlobe,
  }
]

const About = () => {
  const timelineIconSize = useBreakpointValue({ base: '24px', md: '28px' })
  const timelineIconMarginLeft = useBreakpointValue({ base: '12px', md: '-14px' })
  const timelineIconMarginTop = useBreakpointValue({ base: '0px', md: '14px' })
  const timelineIconInnerSize = useBreakpointValue({ base: 12, md: 16 })
  const timelinePadding = useBreakpointValue({ base: '1rem', md: '2rem' })
  const timelineMarginBottom = useBreakpointValue({ base: '0.5rem', md: '2rem' })
  
  return (
    <Box bg="black" minH="100vh" pt={{ base: 24, md: 32 }} pb={{ base: 16, md: 20 }}>
      <Container maxW="5xl" px={{ base: 4, md: 8 }}>
        <VStack spacing={{ base: 12, md: 16 }} align="stretch">
          {/* Hero Section */}
          <VStack spacing={{ base: 4, md: 6 }} align="center" textAlign="center">
            <Heading
              color="white"
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              fontWeight="bold"
              letterSpacing="tight"
              lineHeight="1.2"
              px={{ base: 2, md: 0 }}
            >
              Our Journey
            </Heading>
            <Text
              fontSize={{ base: "md", sm: "lg", md: "xl" }}
              color="whiteAlpha.800"
              maxW="2xl"
              lineHeight="1.6"
              px={{ base: 4, md: 0 }}
            >
              From humble beginnings, explore the milestones that have shaped M3Labs into what it is today.
            </Text>
          </VStack>

          {/* Timeline Section */}
          <Box className="timeline-wrapper" px={{ base: 0, md: 4 }}>
            <VerticalTimeline lineColor="rgba(255, 255, 255, 0.1)">
              {timelineData.map((item, index) => (
                <VerticalTimelineElement
                  key={item.year}
                  className="vertical-timeline-element"
                  contentStyle={{
                    background: '#171717',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.75rem',
                    boxShadow: 'none',
                    padding: timelinePadding,
                    marginBottom: timelineMarginBottom,
                  }}
                  contentArrowStyle={{
                    borderRight: '7px solid rgba(255, 255, 255, 0.1)',
                  }}
                  date={item.year}
                  dateClassName={`timeline-date timeline-date-${index % 2 === 0 ? 'left' : 'right'}`}
                  iconStyle={{
                    background: '#9638FF',
                    color: '#fff',
                    boxShadow: '0 0 0 4px rgba(150, 56, 255, 0.2)',
                    width: timelineIconSize,
                    height: timelineIconSize,
                    marginLeft: timelineIconMarginLeft,
                    marginTop: timelineIconMarginTop,
                  }}
                  icon={<item.icon size={timelineIconInnerSize} />}
                >
                  <Heading
                    as="h3"
                    fontSize={{ base: "md", md: "xl" }}
                    color="white"
                    mb={{ base: 1, md: 2 }}
                  >
                    {item.title}
                  </Heading>
                  <Text 
                    color="whiteAlpha.800"
                    fontSize={{ base: "xs", md: "md" }}
                    lineHeight="1.6"
                  >
                    {item.description}
                  </Text>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </Box>
        </VStack>
      </Container>
      <ScrollToTop />
    </Box>
  )
}

export default About 