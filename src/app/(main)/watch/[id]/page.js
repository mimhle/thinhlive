import Watch from "./Watch";
import { getLiveRooms } from "/lib/backend/live";
import { redirect } from "next/navigation";

export default async function Page({params}) {
    const {id} = params;

    await getLiveRooms().then(data => {
        data = data.map(room => room.name);

        if (!data.includes(id)) {
            redirect("/404");
        }
    });

    return <Watch></Watch>
}