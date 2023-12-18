type PropsType = {
    url: string,
    alt: string
}

const Image = ({ url, alt }: PropsType) => {
    return (
        <div className="my-2 border border-zinc-950 max-w-[500px] h-[80vw] w-[80vw] sm:w-[200px] sm:h-[200px] aspect-square">
            <img
                src={url}
                alt={alt}
                className="w-full h-full object-cover"
            />
        </div>
    )
}
export default Image