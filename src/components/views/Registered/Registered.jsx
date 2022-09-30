import { useParams } from 'react-router-dom'

const Registered = () => {
  const { teamID } = useParams()

  return <div className='container'>TEAM {teamID}</div>
}

export default Registered
