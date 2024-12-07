import { secondsToHms } from "../../../lib/frontend/utils";

export default function Gallery({ items }) {
    return <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-2 w-auto m-2 place-items-center">
        {items.map((item, index) => <div key={index} className="card bg-neutral w-full">
            <a className="card-body bg-base-100/20 rounded-xl p-6" href={item.link}>
                {item.thumbnail ? <div className="relative">
                    <div
                        className=" absolute top-0 right-0 flex items-center bg-red-500 text-white rounded-xl h-fit w-fit text-sm px-2">
                        {item.live ? "LIVE" : ""}
                    </div>
                    <div
                        className=" absolute bottom-0 right-0 flex items-center bg-base-200 text-white rounded-xl h-fit w-fit text-sm px-2">
                        {item.runtime ? secondsToHms(item.runtime / 1000, true) : null}
                    </div>
                    <img src={item.thumbnail} alt="" className="w-full h-32 object-contain"/>
                </div> : <div className="skeleton h-32 w-full opacity-5 bg-white"></div>}
                {item.title ? <h1 className="text-xl font-bold">{item.title}</h1> : <div className="skeleton h-5 w-full opacity-5 bg-white"></div>}
                {item.username ? <p>{item.username}</p> : <div className="skeleton h-4 w-full opacity-5 bg-white"></div>}
            </a>
        </div>)}
    </div>
}