
const CardChart = ({ title, children, editStyle }: any) => {
    return (
        <div className={`bg-white rounded-md py-2 px-4 shadow-lg ${editStyle}`}>
            <p className="text-center text-2xl font-bold text-[#FF954A]">{title}</p>
            {children}
        </div>
    )
}

export default CardChart