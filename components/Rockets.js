import styles from '@/styles/Home.module.css'
import { useQuery } from '@apollo/client'
import { ROCKETS } from '@/lib/query'
import { useRef, useState, useEffect } from 'react'

const Rocket = ({ description, name }) => (
  <div className={styles.rocket} key={name}>
    <h3>{name}</h3>
    <p>{description}</p>
  </div>
)

const Rockets = () => {
  const startTime = useRef(Date.now())
  const [timing, setTiming] = useState(0)
  const {
    loading,
    error,
    data = { rockets: [] },
    refetch,
  } = useQuery(ROCKETS, { fetchPolicy: 'network-only', notifyOnNetworkStatusChange: true })

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

  const rockets = [...data.rockets].map(Rocket)

  return (
    <div className={styles.col}>
      <h2 className={styles.header}>
        Rockets<small> (Uncached)</small>
      </h2>
      <div className={styles.timing}>
        Took <b>{timing || '--'}</b> ms to fetch
      </div>
      <div className={styles.actions}>
        <button onClick={() => refetch()} disabled={loading}>
          {loading ? 'Refetching...' : 'Refetch'}
        </button>
      </div>
      {rockets}
    </div>
  )
}

export default Rockets
