import styles from '@/styles/Home.module.css'
import { useQuery } from '@apollo/client'
import { MISSIONS } from '@/lib/query'
import { useEffect, useRef, useState } from 'react'

const Mission = ({
  mission_name,
  launch_date_local,
  launch_site: { site_name_long },
  rocket: { rocket_name },
}) => (
  <div className={styles.mission} key={mission_name}>
    <h3>{mission_name}</h3>
    <small>{new Date(launch_date_local).toLocaleDateString()}</small>
    <p>
      {rocket_name} will launch from {site_name_long}
    </p>
  </div>
)

const Missions = () => {
  const startTime = useRef(Date.now())
  const [timing, setTiming] = useState(0)
  const {
    loading,
    error,
    data = { launchesPast: [] },
    refetch,
  } = useQuery(MISSIONS, { fetchPolicy: 'network-only', notifyOnNetworkStatusChange: true })

  useEffect(() => {
    if (loading) {
      startTime.current = Date.now()
    } else {
      if (!error) {
        setTiming(Date.now() - startTime.current)
      }
    }
  }, [loading, error])

  if (error) return <p>Error :(</p>

  const missions = [...data.launchesPast]
    .sort((a, b) => new Date(b.launch_date_local) - new Date(a.launch_date_local))
    .map(Mission)

  async function purge() {
    await fetch('/api/purge')
  }

  return (
    <div className={styles.col}>
      <h2 className={styles.header}>
        Missions <small>(Cached on Edge)</small>
      </h2>
      <div className={styles.timing}>
        Took <b>{timing || '--'}</b> ms to fetch
      </div>
      <div className={styles.actions}>
        <button onClick={() => refetch()} disabled={loading}>
          {loading ? 'Refetching...' : 'Refetch'}
        </button>
        <button onClick={purge}>Purge Cache</button>
      </div>
      {missions}
    </div>
  )
}

export default Missions
