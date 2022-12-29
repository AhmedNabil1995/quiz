import './quesion.css';
import { WithQuesion } from './HOCQuesion';

import { QuesionProps } from './quesion.types';
import { forwardRef } from 'react';

const Quesion = forwardRef(({getNextQuesion,checkAnswer,currentQuesionNum,quesions,showNextBtn,timeLeft}:QuesionProps,optionsContainer:React.ForwardedRef<HTMLDivElement | null>) => {

  return (
    <div className='quesion model'>

      <div className='quesion_header'>
        <h1 className='quesion_header_title'>Awesome Quiz Application</h1>
        <div className='quesion_header_timer'>
            <span>Time Left</span>
            <span className='time'>{timeLeft<10?('0'+timeLeft):timeLeft}</span>
        </div>
        <div className='quesion_header_progress_container'>
        <div className='quesion_header_progress' style={{width:`${(currentQuesionNum/quesions.length)*100}%`}}></div>
        </div>
      </div>

      <div className='quesion_body'>
        <h2>{currentQuesionNum}. {quesions[currentQuesionNum-1]?.['word']}</h2>
        <div className='quesion_body_options' ref={optionsContainer}>
            <p className='option' onClick={checkAnswer}>noun</p>
            <p className='option' onClick={checkAnswer}>verb</p>
            <p className='option' onClick={checkAnswer}>adverb</p>
            <p className='option' onClick={checkAnswer}>adjective</p>
        </div>
      </div>

      <div className='quesion_footer'>
        <p className='quesion_number'>{currentQuesionNum} of {quesions.length} quesions</p>
        {showNextBtn&&<button className='btn solid' onClick={getNextQuesion}>next</button>}
      </div>
    </div>
  )
})

export default WithQuesion(Quesion)
