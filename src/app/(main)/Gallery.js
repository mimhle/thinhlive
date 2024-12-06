export default function Gallery({ items }) {
    return <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-2 w-auto m-2 place-items-center">
        {items.map((item, index) => <div key={index} className="card bg-neutral w-full">
            <a className="card-body" href={item.link}>
                {/*<img src={item.thumbnail} className="w-full"/>*/}
                {item.thumbnail ? <img src={item.thumbnail} alt="" className="w-full h-32 object-contain"/> : <div className="skeleton h-32 w-full opacity-5 bg-white"></div>}
                {/*<h1 className="text-xl font-bold">{item.title}</h1>*/}
                {item.title ? <h1 className="text-xl font-bold">{item.title}</h1> : <div className="skeleton h-5 w-full opacity-5 bg-white"></div>}
                {/*<p>{item.description}</p>*/}
                {item.description ? <p>{item.description}</p> : <div className="skeleton h-4 w-full opacity-5 bg-white"></div>}
            </a>
        </div>)}
    </div>
}