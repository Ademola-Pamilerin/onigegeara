import { Stack, Typography } from '@mui/material'
import HeadComponent from '../components/header/head'
import HomeModule from '../components/home/home'
import { colors } from '../util/them'
import About from '../components/about/about'
import Events from '../components/event/event'
import Team from '../components/team/team'
import Footer from '../components/footer/footer'
import MainNav from '../components/navigation/main-nav'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getHomePagePost } from '../store/post-slice'

const Home = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHomePagePost())
  }, [dispatch])

  useEffect(() => {
    localStorage.clear()
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
        height: "10%"
      }}>
        <MainNav />
      </Stack>
      <Stack >
        <HomeModule />
      </Stack>
      <Stack sx={{
        backgroundImage: "url(../static/ogac-1.png)",
        width: "100%",
        overflow: "hidden"
      }} id="about">
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
      <Stack sx={{ width: "100%", marginBottom: "1rem" }} >
        <Events />
      </Stack >
      <Stack sx={{ width: "100%" }}>
        <Team />
      </Stack>
      <Stack id="contact" sx={{
        height: "auto"
      }}>
        <a name="about"></a>
        <Footer />
      </Stack>
    </Stack>
  )
}

export default Home