import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {useNavigate} from 'react-router-dom';

const Learn = () => {
    const navigate = useNavigate();

    const handleBackNavigation = () => {
        navigate('/');
    }

    return (
        <div className='bg-container content-container pd-160'>
            <button type='button' className='back-button' onClick={handleBackNavigation}>
                <FontAwesomeIcon icon={faArrowLeft}/>
                Back to home
            </button>

            <header style={{alignSelf: 'start'}}>
                <h1>Discover Intentional Binding</h1>
                <p className='faded-text fs-20'>How understanding this phenomenon can benefit you</p>
            </header>

            <main className='content-container'>
                <section>
                    <h2>What is Intentional Binding?</h2>
                    <p className='faded-text fs-20'>Intentional binding is a psychological effect where the time between an action you take and its
                        result feels shorter than it actually is. It happens naturally when you do something
                        voluntarily, expect a result, and then notice that result.</p>
                    <p className='faded-text fs-20'>This process helps you feel more connected to your actions and their outcomes, reinforcing your
                        sense of control over your life.</p>
                </section>

                <section>
                    <h2>Why Does It Matter?</h2>
                    <p className='faded-text fs-20'>Understanding intentional binding can help you:
                        <ul>
                            <li className='faded-text fs-20'>Feel more confident in your decisions.</li>
                            <li className='faded-text fs-20'>Improve focus and mindfulness in daily tasks.</li>
                            <li className='faded-text fs-20'>Enhance your ability to learn from actions and results.</li>
                        </ul>
                    </p>
                </section>

                <section>
                    <h2>How Does It Work?</h2>
                    <p className='faded-text fs-20'>Intentional binding works through three simple steps:</p>
                    <ol>
                        <li className='faded-text fs-20'><strong>Take Action:</strong> You decide to do something and carry it out. For example,
                            pressing a button to turn on a light.
                        </li>
                        <li className='faded-text fs-20'><strong>Predict the Result:</strong> Based on your experience, you expect a specific
                            outcome, like the light turning on.
                        </li>
                        <li className='faded-text fs-20'><strong>Notice the Outcome:</strong> You observe what happens and confirm whether it matches
                            your expectation.
                        </li>
                    </ol>
                    <p className='faded-text fs-20'>When these steps align, your brain links the action and the result more closely in time, making
                        you feel more in control.</p>
                </section>

                <section>
                    <h2>The Bigger Picture</h2>
                    <p className='faded-text fs-20'>As a whole, intentional binding helps you build a stronger connection between what you do and
                        what happens next. This connection can:
                        <ul>
                            <li className='faded-text fs-20'>Increase your awareness of cause and effect in your life.</li>
                            <li className='faded-text fs-20'>Help you stay motivated by seeing the immediate impact of your efforts.</li>
                            <li className='faded-text fs-20'>Encourage you to be more intentional with your actions, leading to better decision-making.</li>
                        </ul>
                    </p>
                </section>
            </main>
        </div>
    );
}

export default Learn;