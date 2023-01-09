import React, { useEffect, useRef, useState } from 'react';
import { Button, FormControl, Input, LinearProgress, Stack } from '@mui/material'
import Image from 'next/image';

export const FileUploadComponent = (props) => {
    const [dragactive, setDragActive] = useState(false)
    const [serverImg, setServerImg] = useState();
    const [image, setImage] = useState("");
    const inputRef = useRef(null)
    const [number, setNumber] = useState(0)
    const [start, setStart] = useState(false)


    //handle drag event
    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            e.target.files = e.dataTransfer.files
            imageChangeHandler(e)
        }
    }


    const imageChangeHandler = (event) => {
        setStart(true)
        if (window.FileReader) {
            const fileUploaded = event.target.files[0];
            const reader = new FileReader();
            if (fileUploaded && fileUploaded.type.match("image.*")) {
                reader.readAsDataURL(fileUploaded);
            } else {
                // setImage(image);
                return 0;
            }
            reader.onloadstart = () => {
                setStart(true)
            }
            reader.onloadend = () => {
                setStart(false)
                setImage(reader.result);
            }
            // reader.onload = () => {

            // };
            setServerImg(fileUploaded);
            setStart(false)
            props.pushVal(fileUploaded)
        }
    }
    const divHandler = (event) => {
        console.log("clicked")
        console.log(event)
        inputRef.current.click();
    }

    useEffect(() => {
        let interval = null;
        if (start) {
            interval = setInterval(() => {
                if (number === 90) {
                    setNumber(prev => prev)
                } else {
                    setNumber(prev => prev + 5)
                }
            }, 100)
        }
        return () => {
            if (interval !== null) {
                clearInterval(interval)
            }
        }
    }, [number, start])

    const { clearImage } = props
    useEffect(() => {
        if (clearImage) {
            setNumber(0)
            setServerImg(null)
            setImage("")
            setStart(false)
        }
    }, [clearImage])




    return <>
        {start && <LinearProgress variant='determinate' value={number} sx={{
            color: "primary.main"
        }} />}
        <FormControl>
            <input
                type='file'
                accept={"image/**"}
                ref={inputRef}
                multiple={false}
                onChange={(event) => imageChangeHandler(event)}
                style={{
                    display: "none"
                }}
            />
            <Stack onClick={(event) => divHandler(event)} sx={{
                width: "100%",
                height: "20rem",
                cursor: "pointer",
                position: "relative",
                boxShadow: ".1px .1px .1px 1px grey"
            }} onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop}>
                {dragactive ? <Stack sx={{
                    width: "100%",
                    height: "20rem",
                    justifyContent: "center",
                    alignItems: "center"
                }}>Drop</Stack> : image ? <Image src={image} alt={"Your quetion image"} layout={"fill"} objectFit={"cover"} /> :
                    <Stack sx={{
                        width: "100%",
                        height: "20rem",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center"
                    }}>{dragactive ? "Drop" : "Drag and Drop image or click to upload, Object to view must be at the center"}</Stack>
                }
            </Stack>
        </FormControl>
    </>
}

