// react component for the home page 

import { useEffect,useState } from "react"

// componenents 
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => { 
    // local state, state starts with null 
    const [workouts, setWorkouts] = useState(null)
    useEffect(() => { 
        const fetchWorkouts = async () => {
            // because we used a proxy, we don't have http:localhost:4000 in front
            // BUT it only work in development, for deployement, you must make sure 
            // every request points to the correct endpoints
            const response = await fetch('/api/workouts')
            // now pass json from the response object into something we can work with
            // array of objects (each representing objects) in json const now 
            const json = await response.json()

            if (response.ok) {
                //set the state 
                setWorkouts(json)
            }
        }
        
        fetchWorkouts()
    }, [])
    // [] so that this only gets run once -- when the componenet is first rendered 

    return ( 
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout = {workout} />

                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}



export default Home