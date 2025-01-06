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
        <div className='scroll-container content-container'>
            <button type='button' className='back-button' onClick={handleBackNavigation}>
                <FontAwesomeIcon icon={faArrowLeft}/>
                Back to home
            </button>

            <header style={{alignSelf: 'start'}}>
                <h2>Discover Intentional Binding</h2>
                <p className='faded-text fs-18'>How understanding this phenomenon can benefit you</p>
            </header>

            <main className='content-container'>
                <section>
                    <h3>What is Intentional Binding?</h3>
                    <p className='faded-text fs-18'>Intentional Binding is a psychological effect where the time between
                        an action and its result is perceived as closer together, increasing our sense of agency. In other
                        words, it enforces the sense that our <span style={{color: 'var(--primary-light)'}}>actions produce results</span>,
                        helping boost motivation and intentionality.
                    </p>
                    <p className='faded-text fs-18'>This happens naturally when you do something
                        voluntarily, expect a result, and then notice that result,
                        <span style={{color: 'var(--primary-light)'}}> activating the brain's sense of cause and effect</span>.
                    </p>
                </section>

                <section>
                    <h3>How Does It Work?</h3>
                    <p className='faded-text fs-18'>Intentional binding works through three simple steps:</p>
                    <ol>
                        <li className='faded-text fs-18'><span style={{color: 'var(--primary-light)'}}>Voluntary Action:</span> You decide to do something and carry it out.
                            It helps to choose from multiple options. For example: <span style={{color: 'var(--secondary-light)'}}>reading a book</span>.
                        </li>
                        <li className='faded-text fs-18'><span style={{color: 'var(--primary-light)'}}>Predict the Result:</span> Based on your experience, you expect a specific
                            outcome, like <span style={{color: 'var(--secondary-light)'}}>learning something new</span>.
                        </li>
                        <li className='faded-text fs-18'><span style={{color: 'var(--primary-light)'}}>Notice the Outcome:</span> You observe what happens and confirm whether it matches
                            your expectation.
                        </li>
                    </ol>
                    <p className='faded-text fs-18'>When these steps align, your brain links the action and the result more closely in time, making
                        you feel more in control.</p>
                </section>

                <section>
                    <h3>Putting It In Practice</h3>
                    <p className='faded-text fs-18'>Intentional binding helps you build a stronger connection between
                        what you do and what happens next. This connection can:
                    </p>
                    <ul>
                        <li className='faded-text fs-18'>
                            <span style={{color: 'var(--primary-light)'}}>Increase your awareness </span>
                            of cause and effect in your life.
                        </li>
                        <li className='faded-text fs-18'>
                            <span style={{color: 'var(--primary-light)'}}>Help you stay motivated </span>
                            by seeing the immediate impact of your efforts.
                        </li>
                        <li className='faded-text fs-18'>
                            <span style={{color: 'var(--primary-light)'}}>Encourage you to be more intentional </span>
                            with your actions, leading to better decision-making.
                        </li>
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default Learn;