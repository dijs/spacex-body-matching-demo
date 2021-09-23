import Missions from '@/components/Missions'
import Rockets from '@/components/Rockets'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

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
        <div className={styles.data}>
          <div className={styles.col}>
            <h2>Missions (Cached)</h2>
            <Missions />
          </div>
          <div className={styles.col}>
            <h2>Rockets (Uncached)</h2>
            <Rockets />
          </div>
        </div>
      </main>
    </div>
  )
}
