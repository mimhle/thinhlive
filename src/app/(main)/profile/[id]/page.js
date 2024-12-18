import Live from './Profile';

export default async function Page({ params }) {
    const { id } = params;

    return <Live id={id} />;
}
