export const Loader = ({ text="Loading ..." }) => {
    return (
        <div>
            <div aria-hidden="true">
                <p>{text}</p>
            </div>
        </div>
    )
}