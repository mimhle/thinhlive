import Profile from './Profile';
import { redirect } from "next/navigation";
import { getUsers } from '/lib/backend/auth';

export default async function Page({ params }) {
    const { id } = params;

    await getUsers().then((data) => {
        data = data.map(user => user.username);
        if (!data.includes(id) || id.startsWith('Anon_')) {
            redirect("/404");
        }
    });

    return <Profile id={id} />;
}
