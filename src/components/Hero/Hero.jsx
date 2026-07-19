import { useRef, useEffect } from 'react'
import { Box, Text, Flex, VStack, HStack, Image, useToken } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MatchBox from './MatchBox'
import { playerData } from '../../data/playerData'
import useMatches from '../../hooks/useMatches'
import heroBg from '@assets/polaco3.webp'
import heroBg2 from '@assets/polaco2.webp'
import '../../styles/globals.css'

gsap.registerPlugin(ScrollTrigger)

const MotionBox = motion(Box)

function PlayerPanel() {
  const [amber] = useToken('colors', ['brand.amber'])
  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      justifyContent={'flex-start'}
      alignItems={'flex-start'}
      gap={{ base: 0, md: 4 }}
      fontFamily='"Dela Gothic One", sans-serif'
    >
      <Text
        className="player-number"
        fontFamily='"Dela Gothic One", sans-serif'
        fontSize={{ base: '28vw', md: '16vw', lg: '10vw' }}
        lineHeight={0.9}
        color="brand.gray2"
      // sx={{ WebkitTextStroke: `2px #e7e5e591` }}
      >
        {playerData.number}
      </Text>
      <Box w={{ base: '100px', md: "1px" }} h={{ base: "1px", md: "70px", lg: "100px" }} bg="brand.amber" mt={{ base: 4, md: 8 }}/>
      <Flex id="player-info-text" direction={'column'} justifyContent={'flex-start'} gap={1} mt={{ base: 2, md: 8 }}>
        <Flex gap={1} justifyContent='flex-start' alignItems={{ base: 'flex-start', md: 'center' }} direction={{ base: 'column', md: 'row' }}>
          <Text className='text-title' fontSize={{ base: '9px', md: "10px" }} color="brand.bone"
            textTransform="uppercase" letterSpacing="widest">
            Posición
          </Text>
          <Text className='text-title' fontSize={{ base: '9px', md: "12px" }} color="brand.dorado"
            fontWeight="700" textTransform="uppercase" letterSpacing={{ base: "none", md: "widest" }}>
            {playerData.position}
          </Text>
        </Flex>
        <Flex justifyContent='flex-start' alignItems='center' gap={{ base: '10px', md: '14px' }}>
          <Image src={playerData.nationalityFlag} w={{ base: '15px', md: '25px' }} />
          <Text className='text' mb={'-5px'} fontSize={{ base: 'xs', md: "md" }} color="brand.amber" letterSpacing="wider">
            {playerData.nationality}
          </Text>
        </Flex>
        <Flex justifyContent='flex-start' alignItems={'flex-end'} gap={{ base: '8px', md: '10px' }} spacing={1} mt={'3px'} ml={-1}>
          <Image src={playerData.logoCurrentClub} ml={{ base: '2px', md: 'none' }} w={{ base: '20px', md: '30px' }} h={{ base: '20px', md: '30px' }} />
          <Text className='text' fontSize={{ base: 'xs', md: "md" }} color="brand.amber" letterSpacing="wider">
            {playerData.currentClub}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default function Hero() {
  const outerRef     = useRef(null)
  const containerRef = useRef(null)
  const photoRef     = useRef(null)
  const line1Ref     = useRef(null)
  const line2Ref     = useRef(null)
  const vignetteRef  = useRef(null)
  const { matches }  = useMatches()
  const [amber, bgRef] = useToken('colors', ['brand.amber', 'brand.bgRef'])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([line1Ref.current, line2Ref.current],
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: 'expo.out', delay: 0.4 }
      )
      gsap.fromTo(photoRef.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.5, ease: 'power3.out', delay: 0.6 }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(vignetteRef.current,
        { opacity: 0.15 },
        {
          opacity: 0.75,
          ease: 'none',
          scrollTrigger: {
            trigger: outerRef.current,
            start: 'top top',
            end: '+=80vh',
            scrub: 1.2,
          },
        }
      )
    }, outerRef)
    return () => ctx.revert()
  }, [])

  return (
    <Box ref={outerRef} h="200vh" position="relative" zIndex={1} id= 'hero'>
      <Box
        ref={containerRef}
        position="sticky"
        top={0}
        h="100vh"
        overflow="hidden"
        bg="brand.dark"
        sx={{
          maskImage: 'linear-gradient(black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(black 90%, transparent)',
          // dvh evita el salto al colapsar la barra del navegador en mobile; vh queda de fallback
          '@supports (height: 100dvh)': { height: '100dvh' },
        }}
      >
        {/* Foto de fondo — fundida con el fondo */}
        <Box
          position="absolute"
          inset={0}
          zIndex={0}
          pointerEvents="none"
          display="flex"
          justifyContent="center"
          alignItems={{ base: 'flex-end', md: 'flex-start' }}
          mt={{ base: 20, md: 12 }}
          ml={{ base: '0%', md: '25%' }}
          sx={{
            maskImage:
              'radial-gradient(120% 90% at 50% 30%, black 35%, transparent 78%)',
            WebkitMaskImage:
              'radial-gradient(120% 90% at 50% 30%, black 35%, transparent 78%)',
          }}
        >
          <Image
            className="hero-bg1"
            src={heroBg}
            alt=""
            aria-hidden="true"
            draggable={false}
            zIndex={1}
            w={{ base: '1650px', md: '30vw' }}
            h={{ base: '800px', md: 'auto' }}
            objectFit={{ base: 'contain', md: 'contain' }}
            objectPosition={{ base: 'center top', md: 'center top' }}
            opacity={{ base: 0.21, lg: 0.20 }}
            filter="grayscale(100%) contrast(1.05)"
            sx={{ mixBlendMode: 'luminosity' }}
            mr={{ base: '-550px', md: '-500px' }}
            mb={{ base: '-100px', md: 0 }}
          />
          <Image
            className="hero-bg2"
            src={heroBg2}
            alt=""
            aria-hidden="true"
            draggable={false}
            zIndex={2}
            w={{ base: '900px', md: '50vw' }}
            h={{ base: 'auto', md: 'auto' }}
            objectFit={{ base: 'cover', md: 'contain' }}
            objectPosition={{ base: 'center', md: 'center top' }}
            opacity={{ base: 0.21, lg: 0.20 }}
            filter="grayscale(100%) contrast(1.05)"
            sx={{ mixBlendMode: 'luminosity' }}
            ml={{ base: '210px', md: 40 }}
            mb={{ base: -20, md: 0 }}
          />
        </Box>
        
        {/* Player photo */}
        <Box
          className="player-photo-container"
          position="absolute"
          inset={0}
          zIndex={{base: 3, md: 5,  lg:9}}
          pl={{ base: '2%', lg: '10%' }}
          pt={{ base: '23%', lg: '5%' }}
          display="flex"
          justifyContent={{ base: 'flex-start', lg: 'flex-start' }}
          alignItems={{ base: 'flex-start', lg: 'flex-start' }}
          pointerEvents="none"
        >
          <Box
            ref={photoRef}
            h={{ base: '87vh', lg: '90vh' }}                               
            style={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
          >
            <Image
              className="player-photo"
              src={playerData.image}
              alt={`${playerData.displayName}, ${playerData.position.toLowerCase()} profesional de ${playerData.currentClub}`}
              h={{ base: '100%', lg: '100%' }}
              w={{ base: '58vw', lg: '30vw' }}
              objectFit="contain"
              objectPosition="bottom center"
              draggable={false}
            />
          </Box>
        </Box>

        {/* Visible name text */}
        <Box
          className='player-name-container'
          position="absolute"
          inset={0}
          zIndex={2}
          pointerEvents="none"
          display="flex"
          flexDir="column"
          alignItems='center'
          justifyContent={{ base: 'flex-start', md: 'center' }}
          pl={{ base: 0, lg: '16%' }}
          pt={{ base: '30%', lg: '16%' }}
        >
          <Flex 
          direction="column" 
          as="h1" 
          overflow="hidden"
          >

              <Text
                ref={line1Ref}
                className="player-name"
                as="span"
                display="block"
                fontFamily='"Dela Gothic One", sans-serif'
                fontSize={{ base: '12vw', md: '16vw', lg: '6vw' }}
                color="brand.amber"
                lineHeight={0.9}
                style={{ opacity: 0 }}
                mt={{ base: ' 0px', md: '-20px', lg: '0px' }}
                ml={{ base: 28, md: 2 }}
                mb={{ base: '-45px',lg: '0px' }}
              >
                {playerData.name}
              </Text>            

            <Text
              ref={line2Ref}
              as="span"
              display="block"
              fontFamily='"Dela Gothic One", sans-serif'
              fontSize={{ base: '11.6vw', md: '16vw', lg: '5vw' }}
              letterSpacing="2px"
              color="transparent"
              lineHeight={0.9}
              style={{ opacity: 0 }}
              sx={{ WebkitTextStroke: `2px ${amber}` }}
              pl={{ base: 2, md: 0 }}
            >
              {playerData.fullName}
            </Text>

            
          </Flex>
        </Box>
        {/* Player info — bottom left */}
        <Box
          className="player-info"
          position="absolute"
          bottom={{ base: 'auto', lg: '20%' }}
          left={{ base: '60%', lg: '34%' }}
          top={{ base: '52%', lg: '38%' }}
          zIndex={15}
        >
          <PlayerPanel />
        </Box>

        {/* MatchBox desktop */}
        <Box
          position="absolute"
          bottom="12%"
          right={0}
          top={{ base: 'auto', lg: '20%' }}
          zIndex={10}
          display={{ base: 'none', lg: 'block' }}
        >
          <MatchBox last={matches.last} next={matches.next} variant="card" />
        </Box>

        {/* MatchBox mobile */}
        <Box
          position="absolute"
          bottom={{base:"30px",md:"40px"}}
          left={0}
          right={0}
          zIndex={15}
          display={{ base: 'block', lg: 'none' }}
        >
          <MatchBox last={matches.last} next={matches.next} variant="strip" />
        </Box>



        {/* Vignette */}
        <Box
          ref={vignetteRef}
          position="absolute"
          inset={0}
          zIndex={20}
          background="radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.65) 100%)"
          pointerEvents="none"
          style={{ opacity: 0.15 }}
        />
      </Box>
    </Box>
  )
}
