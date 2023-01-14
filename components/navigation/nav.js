import { AppBar, Toolbar, Stack, Typography, IconButton, Drawer, Box, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { colors } from '../../util/them'
import classes from './nav.module.css'
import { Menu } from '@mui/icons-material'
import { useCallback, useEffect, useState, Fragment, useRef } from 'react'
import { useRouter } from 'next/router'

const Navigation = (props) => {
    const [show, setshow] = useState(true);
    const [scroll, setScroll] = useState(0);
    const [open, setOpen] = useState(false)

    const router = useRouter()
    const isBig = useMediaQuery(`(min-width:1250px)`)


    return (
        <>
            <div style={{
                padding: 0,
                position: "relative",
                height: "10vh"
            }}>
                <AppBar
                    position={"absolute"}
                    sx={{
                        backgroundColor: colors.side_blue,
                        paddingY: "1rem",
                        backgroundPosition: "center center",
                        width: "100%",
                        overflow: "hidden",
                        margin: 0,
                    }}
                >
                    <Toolbar sx={{
                        width: "100%",
                        height: "8vh"
                    }}>
                        <Stack sx={{
                            width: "100%",
                            height: "9vh",
                            position: "absolute",
                            left: "0",
                            zIndex: -1,
                            overflow: "hidden",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <Box sx={{
                                position: "relative",
                                width: "100%",
                                height: "9vh"
                            }}>
                                <Image
                                    src={require("../../static/ogac-1.png")}
                                    alt="Oni-gege Ara group of schools official logo"
                                    layout='fill'
                                    className={classes.image}
                                    objectFit="cover"
                                // style={{
                                //     mixBlendMode: "multiply"
                                // }}
                                />
                            </Box>
                        </Stack>

                        <Stack sx={{
                            width: {
                                xs: "180%",
                                sm: "80%",
                                md: "80%",
                                lg: "80%"
                            },
                            flexFlow: "row",
                        }}>
                            <Stack className={classes.image_container} onClick={() => router.replace("/#top")} sx={{
                                cursor: "pointer"
                            }}>
                                <Image
                                    src={require("../../static/ogac-white-logo.png")}
                                    alt="Oni-gege Ara group of schools official logo"
                                    height={"50"}
                                    width={"80"}
                                    className={classes.image}
                                    objectFit="cover"
                                    style={{
                                        mixBlendMode: "multiply"
                                    }}
                                />
                            </Stack>
                            <Typography sx={{
                                fontSize: {
                                    xs: ".8rem",
                                    sm: ".9rem",
                                    md: "1.1rem",
                                    lg: "1.5rem"
                                },
                                justifyContent: "center",
                                fontWeight: 700,
                                color: colors.side_blue_brown
                            }}>
                                ONI-GEGE ARA
                                <br />
                                GROUP OF SCHOOLS
                            </Typography>
                        </Stack>

                        <Stack sx={{
                            display: "flex",
                            width: {
                                xs: "80%",
                                sm: "120%",
                                md: "120%",
                                lg: "120%"
                            },
                            display: {
                                xs: "none",
                                sm: "flex",
                                md: "flex",
                                lg: "flex"
                            },
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            flexFlow: "row"
                        }} className={classes.nav}>
                            <Link href={"/#top"} ><a>Home</a></Link>
                            <Link href={"/about"} ><a>About</a></Link>
                            <Link href={"/contact"} ><a>Contact</a></Link>
                            <Link href={"/post/all"} ><a>Events</a></Link>
                            {isBig && <> <Link href={"/student"} ><a>Students</a></Link>
                                <Link href={"/teacher"} ><a>Staff</a></Link>
                                {props.type && <Link href={"/ogac/admin/admin"} ><a>DashBoard</a></Link>}
                            </>}
                            {/* <Link href={"/#top"} ><a>FAQ</a></Link> */}
                        </Stack>
                        <Stack sx={{
                            display: {
                                xs: "flex",
                                sm: "none",
                                md: "none",
                                lg: "none"
                            },
                            width: {
                                xs: "100%"
                            },
                        }}>
                            <Menu
                                onClick={() => setOpen(prev => !prev)}
                                sx={{
                                    fontSize: "2rem",
                                    width: "100%",
                                    color: colors.side_blue_brown
                                }} />

                        </Stack>
                    </Toolbar>
                </AppBar>
                <Drawer anchor={"left"} open={open} onClose={() => setOpen(prev => !prev)}>
                    <Box
                        onClick={() => setOpen(false)}
                        sx={{
                            width: "80%",
                            margin: "5rem"
                        }}>

                        <Stack sx={{
                            width: "70%"
                        }}>
                            <Stack sx={{
                                width: "100%",
                            }}>
                                <Image
                                    src={require("../../static/ogac-white-logo.png")}
                                    alt="Oni-gege Ara group of schools official logo"
                                    height={"80"}
                                    width={"180"}
                                    className={classes.image}
                                    objectFit="cover"
                                    style={{
                                        mixBlendMode: "multiply"
                                    }}
                                />
                            </Stack>
                            <Typography sx={{
                                fontSize: {
                                    xs: "1rem",
                                },
                                textAlign: "center",
                                justifyContent: "center",
                                fontWeight: 700,
                                color: colors.side_blue_brown
                            }}>
                                ONI-GEGE ARA
                                <br />
                                GROUP OF SCHOOLS
                            </Typography>
                        </Stack>
                        <ul style={{
                            listStyle: "none",
                            height: "100%",
                            display: "flex",
                            flexFlow: "column",
                            justfiyContent: "space-evenly"
                        }}>
                            <li className={classes.list_val}>
                                <Link href={"/#top"} ><a>Home</a></Link>
                            </li>
                            <li className={classes.list_val}>
                                <Link href={"/about"} ><a>About</a></Link>
                            </li>
                            <li className={classes.list_val}>
                                <Link href={"/contact"} ><a>Contact</a></Link>
                            </li>
                            <li className={classes.list_val}>
                                <Link href={"/post/all"} ><a>Events</a></Link>
                            </li>
                            {isBig
                                &&
                                <>
                                    <li className={classes.list_val}>
                                        <Link href={"/student"} ><a>Students</a></Link>
                                    </li>
                                    <li className={classes.list_val}>
                                        <Link href={"/staff"} ><a>Staff</a></Link>
                                    </li>
                                    {props.type && <li className={classes.list_val}>
                                        <Link href={"/ogac/admin/admin"} ><a>DashBoard</a>
                                        </Link>
                                    </li>}
                                </>
                            }
                        </ul>
                    </Box>
                </Drawer>
            </div>

        </>
    )
}

export default Navigation