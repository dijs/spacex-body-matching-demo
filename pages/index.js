import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useQuery, gql } from '@apollo/client';

const MISSIONS = gql`
  query GetMissions {
    launchesPast(limit: 10) {
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      rocket {
        rocket_name
      }
    }
  }
`;

function Missions() {
  const { loading, error, data } = useQuery(MISSIONS);

  if (loading) return null;
  if (error) return <p>Error :(</p>;

  return [...data.launchesPast]
    .sort(
      (a, b) => new Date(b.launch_date_local) - new Date(a.launch_date_local)
    )
    .map(
      ({
        mission_name,
        launch_date_local,
        launch_site: { site_name_long },
        rocket: { rocket_name },
      }) => (
        <div className={styles.mission} key={mission_name}>
          <h2>{mission_name}</h2>
          <p>{site_name_long}</p>
          <p>{new Date(launch_date_local).toLocaleDateString()}</p>
          <p>
            <b>{rocket_name}</b>
          </p>
        </div>
      )
    );
}

export default function Home() {
  return (
    <div>
      <Head>
        <title>To the Moon!</title>
        <meta name="description" content="Example Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>🚀 To the Moon 🌙</h1>
        <div className={styles.missions}>
          <Missions />
        </div>
      </main>
    </div>
  );
}
