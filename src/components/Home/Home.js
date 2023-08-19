
import React, { useEffect } from 'react'
import './Home.css'
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';




export const Home = () => {
    const [isVisible, setVisible] = useState(false);

    const [expandedItems, setExpandedItems] = useState({});

    const toggleItemExpansion = (item) => {
        const newState = {};
        for (const key in expandedItems) {
            newState[key] = false;
        }

        newState[item] = !expandedItems[item];
        setExpandedItems(newState);
    };



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
                    <img className='fade-in-image' src="https://www.primalstrength.com/cdn/shop/files/gymdesign_render_Two_collumn_grid_cb1b5850-fa8e-4a7b-a2b3-190c2e45facd.jpg?v=1680719688&width=1500" />
                    <div class="card">
                        <h2 className='gym-marketplace'>GYM MARKETPLACE</h2>
                        <h4 className='buy-or-sell'>Buy or Sell Gym Equipment</h4>
                    </div>
                </div>
            </div>
            <article className='home-bars'>
                <div className='home-bars-wrapper'>
                    <h2 className='middle-header-main'>Invest in Your Gym Today!</h2>
                    <ul className='info-list'>
                        <li className={`home-bars-items ${expandedItems['HomeGymItems'] ? 'expanded' : ''}`}>
                            What is Gym Hub About ?
                            <FontAwesomeIcon className='expanded-info'
                                icon={expandedItems['HomeGymItems'] ? faMinus : faPlus}
                                onClick={() => toggleItemExpansion('HomeGymItems')}
                            />
                        </li>

                        <li className='home-bars-items'>Why Home Gym ?
                            <FontAwesomeIcon className='expanded-info'
                                icon={expandedItems['CommercialGymItems'] ? faMinus : faPlus}
                                onClick={() => toggleItemExpansion('CommercialGymItems')}
                            />
                        </li>
                        {expandedItems['HomeGymItems'] &&
                            <div className='expanded-item'>

                                <div className="video-frame">
                                    <iframe
                                        width="560"
                                        height="315"
                                        className='video-frame2'
                                        src="https://www.youtube.com/embed/tUykoP30Gb0"
                                        title="YouTube video player"
                                        frameborder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowfullscreen>
                                    </iframe>
                                </div>

                                <span>
                                    At Gym Hub, we understand the pivotal role of quality equipment in a fitness journey. That's why we've created a dedicated platform where passionate fitness enthusiasts meet trusted sellers. Whether you're a gym owner upgrading your facilities, an athlete seeking the next essential addition to your home gym, or a fitness newbie making the initial steps, Gym Hub offers a curated marketplace with the very best in gym equipment.

                                    Our platform seamlessly connects sellers with a vast audience of potential buyers, streamlining the selling process with transparency and trust at its core. For buyers, Gym Hub presents an extensive selection of equipment, from weights to cardio machines, ensuring you find the perfect fit for your fitness needs.

                                    Dive into a world where quality meets convenience, all tailored for the fitness community. Welcome to Gym Hub – your ultimate fitness equipment destination.
                                </span>
                            </div>}

                        {expandedItems['CommercialGymItems'] &&
                            <div className='expanded-item'>

                                <span>
                                    Investing in a home gym is not just a trend but a lifestyle shift. Having the convenience of a workout space in your own home not only eliminates commuting time to a commercial gym, but it also offers the flexibility to train on your own schedule. This flexibility can lead to more consistent workouts. Moreover, in the long run, a home gym can be a cost-effective solution, saving you monthly membership fees. Additionally, it provides a personalized environment where you can choose the equipment tailored to your fitness goals and preferences. With the ongoing global emphasis on health and wellness, a home gym is an investment in your health, ensuring you have no barriers to maintaining a regular fitness routine.
                                </span>
                            </div>}


                        <li className='home-bars-items'>Why Do we need to do Cardio
                            <FontAwesomeIcon className='expanded-info'
                                icon={expandedItems['WhyDoWeNeedToDoCardio'] ? faMinus : faPlus}
                                onClick={() => toggleItemExpansion('WhyDoWeNeedToDoCardio')}
                            />
                        </li>
                        <li className='home-bars-items'>Why Do we need to work out our Strength
                            <FontAwesomeIcon className='expanded-info'
                                icon={expandedItems['WhyDoWeNeedToWorkOutOurStrength'] ? faMinus : faPlus}
                                onClick={() => toggleItemExpansion('WhyDoWeNeedToWorkOutOurStrength')}
                            />
                        </li>
                        {expandedItems['WhyDoWeNeedToWorkOutOurStrength']
                            &&
                            <div className='expanded-item'>
                                <div class="second-card">
                                    <img className='scale-up' src="https://muscleevo.net/wp-content/uploads/2022/08/dumbbell-curl.jpg" alt="" />
                                    <div class="text">
                                        <h1>Why Do we need to work out our Strength ? </h1>
                                        <section className='home-p' >
                                            Working out our strength through resistance training is crucial for various reasons as it enhances muscle and bone health, improves functional abilities, supports weight management, boosts metabolism, enhances athletic performance, reduces the risk of injury, promotes longevity, and contributes to overall physical and mental well-being.
                                        </section>
                                    </div>
                                </div>
                            </div>
                        }
                        {expandedItems['WhyDoWeNeedToDoCardio'] &&
                            <div className='expanded-item'>
                                <div class="first-card">
                                    <img className='scale-up' src="https://images.herzindagi.info/image/2022/May/fun-cardio-workout.jpg" alt="" />
                                    <div class="text">
                                        <h1>Why Do we need to do Cardio ?</h1>
                                        <section>
                                            <p className='home-p' style={{ 'display': 'inline-block' }}>
                                                Cardiovascular exercise, or cardio, is a vital component of a well-rounded fitness routine that improves cardiovascular health, aids in weight management, enhances endurance and stamina, boosts mental well-being, and fosters social connections, making it an essential part of a healthy and active lifestyle.
                                            </p>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        }

                    </ul>
                </div>
            </article>
            {/* 
            <h2 className='middle-header-main'>Invest in Your Gym Set Up Today!</h2>

            <div className="second-cards">
                <div class="first-card">
                    <img className='scale-up' src="https://images.herzindagi.info/image/2022/May/fun-cardio-workout.jpg" alt="" />
                    <div class="text">
                        <h1>Why Do we need to do Cardio ?</h1>
                        <section>
                            <p className='home-p' style={{ 'display': 'inline-block' }}>
                                Cardiovascular exercise, or cardio, is a vital component of a well-rounded fitness routine that improves cardiovascular health, aids in weight management, enhances endurance and stamina, boosts mental well-being, and fosters social connections, making it an essential part of a healthy and active lifestyle.
                            </p>
                        </section>
                    </div>
                </div>

                <div class="second-card">
                    <img className='scale-up' src="https://muscleevo.net/wp-content/uploads/2022/08/dumbbell-curl.jpg" alt="" />
                    <div class="text">
                        <h1>Why Do we need to work out our Strength ? </h1>
                        <section className='home-p' >
                            Working out our strength through resistance training is crucial for various reasons as it enhances muscle and bone health, improves functional abilities, supports weight management, boosts metabolism, enhances athletic performance, reduces the risk of injury, promotes longevity, and contributes to overall physical and mental well-being.
                        </section>
                    </div>
                </div>
            </div>
 */}

            {/* <div className="landscape">
                <img src="https://images.squarespace-cdn.com/content/v1/5e81f296eca8656d4cc7f9ac/1625218190083-45ABEW5ZJG5BIZRCS5O6/SwiftGym036_sr.jpg?format=2500w"
                    alt="" />
                <div class="inner-card">
                    <h1>The Power of a Comprehensive Gym Program</h1>

                    <span>A well-designed gym program incorporates a variety of exercises and training modalities to effectively target different muscle groups, improve overall strength and endurance, enhance cardiovascular health, promote flexibility, and achieve specific fitness goals.</span>

                    <button><a href="">Discover more</a></button>

                </div>

            </div> */}

            {isVisible && (
                <button
                    className='scroll-to-top'
                    onClick={scrollToTop}
                >
                    <FontAwesomeIcon icon={faArrowUp} size="0x" />
                </button>
            )}


        </div>
    )
}