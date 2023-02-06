import { Stack, Typography, CircularProgress } from "@mui/material";
import AboutChild from "./about-child";
import { useEffect, useState } from 'react';

const About = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [newWho, setNewWho] = useState([])
    useEffect(() => {
        setLoading(true)
        fetch("/api/test", {
            method: "GET"
        }).then(response => response.json()).then(res => {
            const whoVal = res.who
            setNewWho(whoVal.split("?"))
            setData(res)
            setLoading(false)
        }).catch(error => {
            setLoading(false)
            setError(error.message)
        })
    }, [])




    return (<Stack sx={{
        width: "100%",
        paddingX: "10px"
    }}>
        <Stack sx={{
            width: "100%",
            flex: 12,
            flexFlow: "row"
        }}>
            {error ?
                <Stack sx={{
                    height: "10vh",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100"
                }}>
                    <Typography sx={{
                        width: "100%",
                        textAlign: "center"
                    }}>An error Occured please try again</Typography>
                </Stack> : data.length === 0 && loading ?
                    <Stack sx={{
                        height: "5vh",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <CircularProgress aria variant={"indeterminate"} />
                    </Stack>
                    : <Stack sx={{
                        width: "100%",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        marginBottom: "10px",
                        flexFlow: "row wrap"
                    }}>
                        <AboutChild title={"OUR VISION"} type="norms" content={data.vision} />
                        <AboutChild type="norms" title={"OUR MISSION"} content={data.mission} />
                        <AboutChild type="norms" title={"What we stand for"} content={data.what} />
                        <AboutChild increase_box={true} type={"list"} title={"What We Do"} content={<>
                            {
                                newWho.map((el, i) => (
                                    <Typography key={i} sx={{
                                        fontSize: {
                                            xs: "1rem",
                                            sm: "1.5rem",
                                            md: "1.8rem",
                                            lg: "1.5rem"
                                        },
                                        width: "100%",
                                        height: "auto",
                                        padding: "0px 0px",
                                        marginY: "5px",
                                        textAlign: "center"
                                    }}>{el}</Typography>
                                ))
                            }

                        </>} />
                    </Stack>}
        </Stack>
    </Stack >)
}

export const getServerSideProps = async () => {
    try {
        const response = await fetch("/api/test", {
            method: "GET"
        })
        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
        }
        const result = await response.json()
        console.log(result)
        return {
            props: {
                data: result
            }
        }

    } catch (error) {
        return {
            props: {
                data: null,
                error: error.message
            }
        }
    }
}


export default About