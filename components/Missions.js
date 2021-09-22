import styles from '@/styles/Home.module.css'
import { useQuery } from '@apollo/client'
import { MISSIONS } from '@/lib/query'

const Missions = () => {
  const { loading, error, data } = useQuery(MISSIONS)

  if (loading) return null
  if (error) return <p>Error :(</p>

  return [...data.launchesPast]
    .sort((a, b) => new Date(b.launch_date_local) - new Date(a.launch_date_local))
    .map(
      ({
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
    )
}

export default Missions
