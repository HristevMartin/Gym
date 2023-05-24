import './ProgramDetails.css'

export const ProgramDetail = () => {
    return (
        <div className="global-program-detail-div">
            <h1>Upper/Lower 4 Day Bodybuilding Workout</h1>
            <img src='https://cdn.muscleandstrength.com/sites/default/files/upper_lower_workout_-_1200x630.jpg' />
            <h2>Reach your muscle building goals with this balanced 4 day training split that mixes heavy compound exercises, machines and cables</h2>
            <h3 className='workout-summary'>Workout summary</h3>
            <div className='global-program-workout-sumamry'>
                <div className='global-program-info'>
                    <p>Main Goal</p>
                    <p>Build Muscle</p>

                    <p>Main Goal</p>
                    <p>Build Muscle</p>

                    <p>Main Goal</p>
                    <p>Build Muscle</p>

                    <p>Main Goal</p>
                    <p>Build Muscle</p>
                </div>
            </div>

            <h3 className='workout-description'>Workout Description</h3>
            <p className='global-program-description'>
                The upper/lower gym split is a workout method that divides your training sessions into two main categories: upper body and lower body workouts.
                <br />
                <br />
                During upper body workout days, you will focus on exercises targeting the muscles of your upper body, such as the chest, shoulders, back, biceps, triceps, traps, forearms, and possibly core.
                <br />
                <br />
                On lower body workout days, the emphasis will be on exercises for the muscles of your lower body, including the lower back, quadriceps, hamstrings, glutes, calves, and possibly core.
                In a typical upper/lower split, there is no overlap between the two categories. However, some individuals may choose to combine an upper-focused day with a specific lagging muscle group from the lower body, and vice versa.
                <br />
                <br />
                It is important to personalize your split to best align with your goals and specific training requirements.
            </p>
            <h3 className='global-program-description-what-is-the-workout'>What is an Upper/Lower Split?</h3>
            <p className='global-program-description-2'>
                The upper/lower gym split is a workout style that divides your training sessions into two main categories: upper body workout days and lower body workout days.
                <br />
                <br />
                During upper body workout days, you will focus on exercising the muscles of the upper body, including the chest, shoulders, back, biceps, triceps, traps, forearms, and possibly core.
                <br />
                <br />
                On lower body workout days, your attention will be on working out the muscles of the lower body, such as the lower back, quadriceps, hamstrings, glutes, calves, and possibly core.
                <br />
                <br />
                In a traditional upper/lower split, there is no overlap between the two categories. However, some individuals may incorporate upper-focused days along with a specific lagging muscle group from the lower body, and vice versa. It is important to personalize your split to optimize it for your specific goals and training requirements.
            </p>
            <h3 className='program-schedule'>Upper/Lower Workout Schedule</h3>
            <p className='program-schedule-description'>
                Each training day is balanced. You start by challenging major muscle groups with 3 sets of compound or taxing machine exercises. Next, you follow up by finishing a muscle group with a more isolation-style movement that typically focuses on the use of 3 second negatives. Lastly, you work smaller muscle groups with 3 sets each, using 3 second negatives when it makes sense.
            </p>
            <div className='training-schedule'>Here is the training schedule:</div>
            <div className="training-schedule-description">
                <ul>
                    <li>Monday - Upper Body</li>
                    <li>Tuesday - Lower Body</li>
                    <li>Wednesday - Rest</li>
                    <li>Thursday - Upper Body</li>
                    <li>Friday - Lower Body</li>
                    <li>Saturday - Rest</li>
                    <li>Sunday - Rest</li>
                </ul>
            </div>
            <h3 className='training-schedule-upper-training-days'>
                Upper Body Training Days
            </h3>
            <h4 className='upper-scheme'>Upper body training days follow this scheme:</h4>
            <div className='week-schedule-upper'>
                <p>Chest - 3 sets, compound</p>
                <p>Chest - 2 sets, isolation or machine/moderate compound. Use 3 second negatives when it makes sense.</p>
                <p>Back - 2 sets, isolation or machine/moderate compound. Use 3 second negatives when it makes sense.</p>
                <p>Shoulders - 2 sets, isolation or machine/moderate compound. Use 3 second negatives when it makes sense</p>
                <p>Triceps - 3 sets, isolation or machine/cable exercises. Use 3 second negatives when it makes sense.</p>
                <p>Biceps - 3 sets, isolation or machine/cable exercises. Use 3 second negatives when it makes sense.</p>
            </div>
        </div>
    )
}

export default ProgramDetail;