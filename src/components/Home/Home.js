
import React, { useEffect } from 'react'
import './Home.css'
import { useState } from 'react';
import { useRef } from 'react';



export const Home = () => {
    const [isVisible, setVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 2) { // Adjust this value for smaller viewport
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };


    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);
    return (
        <div className='my-class'>
            <div className='internal_class'>
                <div class="container-img">
                    <img src="https://img.freepik.com/premium-photo/couple-training-gym_186382-6616.jpg?w=2000" />
                    <div class="card">
                        <h2>SMARTER IS STRONGER</h2>
                        <h4>Intelligent Training Platform</h4>
                    </div>
                </div>
            </div>



            <div className="second-cards">
                <div class="first-card">
                    <img src="https://images.herzindagi.info/image/2022/May/fun-cardio-workout.jpg" alt="" />
                    <div class="text">
                        <h1>Why Do we need to do Cardio ?</h1>
                        <section>
                            <p style={{ 'display': 'inline-block' }}>
                                Cardiovascular exercise, or cardio, is a vital component of a well-rounded fitness routine that improves cardiovascular health, aids in weight management, enhances endurance and stamina, boosts mental well-being, and fosters social connections, making it an essential part of a healthy and active lifestyle.
                            </p>
                        </section>
                    </div>
                </div>

                <div class="second-card">
                    <img src="https://muscleevo.net/wp-content/uploads/2022/08/dumbbell-curl.jpg" alt="" />
                    <div class="text">
                        <h1>Why Do we need to work out our Strength ? </h1>
                        <section >
                            Working out our strength through resistance training is crucial for various reasons as it enhances muscle and bone health, improves functional abilities, supports weight management, boosts metabolism, enhances athletic performance, reduces the risk of injury, promotes longevity, and contributes to overall physical and mental well-being.
                        </section>
                    </div>
                </div>
            </div>


            <div className="landscape">
                <img src="https://images.squarespace-cdn.com/content/v1/5e81f296eca8656d4cc7f9ac/1625218190083-45ABEW5ZJG5BIZRCS5O6/SwiftGym036_sr.jpg?format=2500w"
                    alt="" />
                <div class="inner-card">
                    <h1>The Power of a Comprehensive Gym Program</h1>

                    <span>A well-designed gym program incorporates a variety of exercises and training modalities to effectively target different muscle groups, improve overall strength and endurance, enhance cardiovascular health, promote flexibility, and achieve specific fitness goals.</span>

                    <button><a href="">Discover more</a></button>

                </div>

            </div>

            {isVisible && (
                <button
                    className='scroll-to-top'
                    onClick={scrollToTop}
                >
                    Back to top
                </button>
            )}


        </div>
    )
}