import loader from "../../assets/loader.svg";

const Loading = () => {
    return (
        <div className="h-full w-full px-10 space-y-10 pt-16 bg-loader">
            <span>Loading...</span>
            <img src={loader} alt="svg loader" />
        </div>
    )
}

export default Loading