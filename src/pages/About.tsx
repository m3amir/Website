import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FiStar, FiCode, FiUsers, FiGlobe } from 'react-icons/fi'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'

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
  return (
    <Box bg="black" minH="100vh" pt={32} pb={20}>
      <Container maxW="5xl">
        <VStack spacing={16} align="stretch">
          {/* Hero Section */}
          <VStack spacing={6} align="center" textAlign="center">
            <Heading
              color="white"
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              letterSpacing="tight"
              lineHeight="1.2"
            >
              Our Journey
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="whiteAlpha.800"
              maxW="2xl"
              lineHeight="1.6"
            >
              From humble beginnings, explore the milestones that have shaped M3Labs into what it is today.
            </Text>
          </VStack>

          {/* Timeline Section */}
          <Box>
            <VerticalTimeline lineColor="rgba(255, 255, 255, 0.1)">
              {timelineData.map(item => (
                <VerticalTimelineElement
                  key={item.year}
                  className="vertical-timeline-element"
                  contentStyle={{
                    background: '#171717',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '1rem',
                    boxShadow: 'none',
                  }}
                  contentArrowStyle={{
                    borderRight: '7px solid rgba(255, 255, 255, 0.1)',
                  }}
                  date={item.year}
                  iconStyle={{
                    background: '#9638FF',
                    color: '#fff',
                    boxShadow: '0 0 0 4px rgba(150, 56, 255, 0.2)',
                  }}
                  icon={<item.icon />}
                >
                  <Heading
                    as="h3"
                    fontSize="xl"
                    color="white"
                    mb={2}
                  >
                    {item.title}
                  </Heading>
                  <Text color="whiteAlpha.800">
                    {item.description}
                  </Text>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

export default About 