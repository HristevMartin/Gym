import { Link } from 'react-router-dom';
import './Programs.css'

export const Programs = () => {
    return (
        <div className='global-program-card'>
            <h2 className='global-program-card-heading'>Gym Programs</h2>
            <div className="program-card">
                <div className="program-card-containers">
                    <div className='container-wrapper'>
                        <h3>Push-Pull Work Out</h3>
                        <img src='https://fitbod.me/wp-content/uploads/2021/12/Benefits-of-A-Push-Pull-Routine.jpg' />
                        <section className='program-info'>
                            <p>Push-pull workout splits done four times a week provide efficient and effective muscle training by targeting each muscle group twice a week. This method promotes better muscle development and reduces the risk of injury and excessive muscle soreness compared to other workout schedules.</p>
                        </section>
                        <Link className='container-wrapper-button' to='/program-detail/1'>Find Out More</Link>
                    </div>

                </div>
                <div className="program-card-containers">
                    <div className='container-wrapper'>
                        <h3>Balanced Body Split Program</h3>
                        <img src='https://i.ytimg.com/vi/MWcJuLKB7RY/maxresdefault.jpg' />
                        <section className='program-info'>
                            <p>The "Balanced Body Split Program" is an effective way to enhance overall fitness, increase muscle definition, and improve functional strength. Over the course of the four days, this program strategically targets a diverse range of muscle groups to promote muscular development</p>
                        </section>
                        <Link className='container-wrapper-button' to='/program-detail/1'>Find Out More</Link>
                    </div>

                </div>
                <div className="program-card-containers">
                    <div className='container-wrapper'>
                        <h3>Push-Pull Work Out</h3>
                        <img src='https://cdn.muscleandstrength.com/sites/default/files/upper_lower_workout_-_1200x630.jpg' />
                        <section className='program-info'>
                            <p>The Upper/Lower gym split is a type of workout routine that divides training sessions into upper body and lower body workouts. It is a popular approach for strength and muscle development. Moreover, the Upper/Lower gym split is flexible and can be adapted to fit any individual's schedule.</p>
                        </section>
                        <Link className='container-wrapper-button' to='/program-detail/1'>Find Out More</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}


export default Programs;