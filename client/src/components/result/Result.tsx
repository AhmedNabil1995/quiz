import './result.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import finish from '../../sounds/finish.mp3';


const Result = () => {
  let [rank,setRank] = useState()

  const audio = new Audio(finish);

  // fetching rank from API
  useEffect(()=>{
      let score = localStorage.getItem('score')
      fetch(`http://localhost:5000/rank`,
      {
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },body:JSON.stringify({score})
      ,method:'POST'
       })
      .then(res=>res.json())
      .then(data=>setRank(data))
      .catch(console.log);
  },[])

  useEffect(()=>{
    audio.play()
  })

  return (
    <div className='result_container model'>

      <div className='result_icon'><i className="fa-solid fa-crown"></i></div>

      <div className='result_final'>
      <p>You've completed the Quiz</p>
      <p className='result_rank'>your rank is {rank}%</p>
      </div>

      <div className='result_btn_group'>
        <Link to='/quesions' className='btn outline'>Replay Quiz</Link>
        <Link to='/' className='btn solid'>Quit Quiz</Link>
      </div>
    </div>
  )
}

export default Result
