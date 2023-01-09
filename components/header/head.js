import Head from 'next/head'
const HeadComponent = (props) => {
    return (
        <Head>
            <title>{props.title}</title>
            <meta
                name="description"
                content={props.content} />
            <meta name="keywords" content={`OGAC, Onigege Ara Schools, ${props.keywords}`} />
        </Head>
    )
}
export default HeadComponent