import React from 'react'
import Typewriter from 'typewriter-effect';

const TextEffect = ({textArr}) => (
         <Typewriter
        options={{
            strings: textArr,
            autoStart: true,
            loop: true,
        }}/>

)

export default TextEffect