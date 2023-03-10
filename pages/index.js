import { Box, CircularProgress, Stack, Typography } from '@mui/material'
import HeadComponent from '../components/header/head'
import HomeModule from '../components/home/home'
import { colors } from '../util/them'
import MainNav from '../components/navigation/main-nav'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getHomePagePost } from '../store/post-slice'
import Image from 'next/image';
import BackgroundImage from '../static/ogac-1.png'
import dynamic from 'next/dynamic'
import About from "../components/about/about"


const Home = ({ data }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getHomePagePost())
  }, [dispatch])

  useEffect(() => {
    localStorage.clear()
  })
  const DynamicEvent = dynamic(() => import("../components/event/event"), {
    loading: () => <Stack sx={{
      height: "50vh",
      justifyContent: "center",
      alignItems: "center"
    }}><CircularProgress variant='indeterminate' /></Stack>
  })
  const DynamicFooter = dynamic(() => import("../components/footer/footer"), {
    loading: () => <Stack sx={{
      height: "50vh",
      justifyContent: "center",
      alignItems: "center"
    }}><CircularProgress variant='indeterminate' /></Stack>
  })
  const DynamicTeam = dynamic(() => import("../components/team/team"), {
    loading: () => <Stack sx={{
      height: "50vh",
      justifyContent: "center",
      alignItems: "center"
    }}><CircularProgress variant='indeterminate' /></Stack>
  })



  return (
    <Stack id='top'>
      <a name="top"></a>
      <HeadComponent
        title={"Oni-gege Ara"}
        content={"This is the official Website of Onigege Ara Groups of School"}
        keywords={"ONAG Home Page, Ogun State, School"}
      />
      <Stack sx={{
        height: "10%",
      }}>
        <MainNav />
      </Stack>
      <Stack >
        <HomeModule />
      </Stack>
      <Stack sx={{
        overflow: "hidden",
        position: "relative",
        height: "100%",
        width: "100%",
        overflow: "hidden"
      }} id="about">
        <Box sx={{
          width: "100%",
          position: "absolute",
          height: {
            xs: "300vh",
            md: "300vh",
            lg: "300vh",
            xl: "400vh"
          },
          zIndex: -1
        }} >
          <Image src={BackgroundImage} alt={"Background image of about us"} layout={"fill"} objectFit={"cover"} objectPosition={"center"} />
        </Box>
        <Stack sx={{
          position: "relative",
          zIndex: 1
        }}>
          <a name="about"></a>
          <Typography sx={{
            width: "100%",
            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
              md: "3.5rem",
              lg: "4rem"
            },
            color: colors.side_blue_brown,
            textDecoration: "underline",
            textAlign: "center",
            fontWeight: 900,
            marginY: "10px"
          }}> About OGAC</Typography>
          <About />
        </Stack>
      </Stack>
      <Stack sx={{ width: "100%", marginBottom: "1rem" }} >
        <DynamicEvent />
      </Stack >
      <Stack sx={{ width: "100%" }}>
        <DynamicTeam />
      </Stack>
      <Stack id="contact" sx={{
        height: "auto"
      }}>
        <a name="about"></a>
        <DynamicFooter />
      </Stack>
    </Stack>
    // <About />
  )
}




export default Home