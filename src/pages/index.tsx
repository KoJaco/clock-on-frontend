import Head from 'next/head';
import { Inter } from '@next/font/google';

import UserProfile from '@/components/auth/UserProfile';
import ColorCreateForm from '@/ui-components/ColorCreateForm';
import Slideover from '@/components/Slideover';

const inter = Inter({ subsets: ['latin'] });

function Home() {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="min-h-screen">
                <Slideover />
                {/* <UserProfile /> */}
            </main>
        </>
    );
}

export function getServerSideProps() {
    const renderedAt = new Date();
    const formattedBuildDate = renderedAt.toLocaleDateString('en-US', {
        dateStyle: 'long',
    });
    const formattedBuildTime = renderedAt.toLocaleTimeString('en-US', {
        timeStyle: 'long',
    });
    return {
        props: {
            renderedAt: `${formattedBuildDate} at ${formattedBuildTime}`,
        },
    };
}

export default Home;

// export default withAuthenticator(Home);
