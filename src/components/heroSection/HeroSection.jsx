import { Typography } from '@material-tailwind/react'
import React, { useContext } from 'react'
import myContext from '../../context/data/myContext';

function HeroSection() {
    const context = useContext(myContext);
    const { mode } = context;
    return (
        <section
            style={{ background: mode === 'dark' ? 'rgb(75, 11, 28)' : '#941331' }}>

            {/* Hero Section  */}
            <div className="container mx-auto flex px-5 py-20 items-center justify-center flex-col">
                {/* Main Content  */}
                <main>
                    <div className="text-center">
                        <div className="mb-2">
                            {/* Image  */}
                            <div className="flex justify-center">
                                <img src="/movie-talk.svg" alt="Movie Talk Logo" style={{ width: '450px' }} />
                            </div>


                            {/* Text  */}
                            <h1 className=' text-3xl text-white font-bold mt-10'>Let's talk about movies</h1>
                        </div>

                        {/* Paragraph  */}
                        {/* <p
                            style={{ color: mode === 'dark' ? 'white' : 'white' }}
                            className="sm:text-3xl text-xl font-extralight sm:mx-auto mt-10">
                            Let's talk about movies and TV shows
                        </p> */}
                    </div>

                </main>
            </div>
        </section>
    )
}

export default HeroSection