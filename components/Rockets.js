import styles from '@/styles/Home.module.css'
import { useQuery } from '@apollo/client'
import { ROCKETS } from '@/lib/query'

const Rockets = () => {
  const { loading, error, data } = useQuery(ROCKETS)

  if (loading) return null
  if (error) return <p>Error :(</p>

  return [...data.rockets].map(({ description, active, name }) => (
    <div className={styles.rocket} key={name}>
      <h3>{name}</h3>
      <p>{description}</p>
    </div>
  ))
}

export default Rockets
