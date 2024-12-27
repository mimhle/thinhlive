import {Watch} from "./Watch";
import { getLives } from "/lib/backend/live";
import { redirect } from "next/navigation";

export default async function Page({params}) {
    const {id} = params;

    await getLives().then(data => {
        data = data.map(room => room.username);

        if (!data.includes(id)) {
            redirect("/404");
        }
    });

    return <Watch></Watch>
}