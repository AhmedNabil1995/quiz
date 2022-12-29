import './quesion.css';
import React, {useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import correct from '../../sounds/correct.mp3';
import wrong from '../../sounds/wrong.mp3';
import { IQuesion, WithQuesionProps } from './quesion.types';

export const WithQuesion = (Component:WithQuesionProps)=>{

    const HOCQuesion = () => {
        
        let [quesions,setQuesions] = useState<IQuesion[]|[]>([]);
        let [currentQuesionNum,setCurrentQuesionNum] = useState(1);
        let [showNextBtn,setShowNextBtn] = useState(false); // show or hide next button
        let [score,setScore] = useState(0);
        let [timeLeft,setTimeLeft] = useState(10);
        let optionsContainer = useRef<HTMLDivElement | null>(null); 
        let timer = useRef<number|null>(null) // the id returned from the setInterval
        let navigate = useNavigate()
        const correctAudio = new Audio(correct);
        const wrongAudio = new Audio(wrong);
      
        //fetch quesions from the API
        useEffect(()=>{
            fetch('http://localhost:5000/quesions')
            .then((res) => res.json())
            .then(data=>{setQuesions(data)})
            .catch(console.log)
      
        },[])
      
        useEffect(()=>{
            //srart the timer to count from 10 to 0
            startTimer()
      
            return ()=>{
              stopTimer();
            }
        },[])
      
        //counting from 10 to 0
        const startTimer=()=>{
      
          let time=10;
          setTimeLeft(time); // reset timeLeft every time this function called
       
            timer.current = window.setInterval(()=>{
              if(time>0){
                setTimeLeft(--time);
              }else{
                stopTimer()
                disableChooseAnswer()
                showNextButtonOrEndQuiz();
              }
            },1000)
            
        }
      
        const stopTimer =()=>{
          if(timer.current)
          window.clearInterval(timer.current);
        }
      
        const removeClassesFromOptions =()=>{
          if(optionsContainer.current){
            Array.from(optionsContainer.current.children).forEach((el)=>{
              el.classList.remove('correctAnswer')
              el.classList.remove('wrongAnswer')
              el.classList.remove('disableSelection')
            })
          }
        }
      
        const disableChooseAnswer =()=>{
          if(optionsContainer.current){
            Array.from(optionsContainer.current.children).forEach((el)=>{
              el.classList.add('disableSelection')
            })
          }
          
        }
      
        function showNextButtonOrEndQuiz(){
       
          //if it was the last quesion then navigate to result screen to show your rank
          if(currentQuesionNum===quesions.length){
            endQuiz();
            //if it is not then show next button to get the next quesion
          }else{
            setShowNextBtn(true)
          }
        }
      
      
        function endQuiz(){
          setTimeout(() => {
            localStorage.setItem('score',score.toString())
            navigate('/result')
          }, 1500);
        }
      
      
      
        const checkAnswer=(e:React.MouseEvent<HTMLDivElement>)=>{
          
          stopTimer()
          disableChooseAnswer()
      
          //check if your answer is correct or not
          if((e.target as HTMLDivElement).textContent === quesions[currentQuesionNum-1]['pos']){
            (e.target as HTMLDivElement).classList.add('correctAnswer');
            correctAudio.play();
            setScore(++score)
          }else{
            (e.target as HTMLDivElement).classList.add('wrongAnswer');
            wrongAudio.play();
          }
      
          showNextButtonOrEndQuiz()
         
        }
      
        const getNextQuesion =()=>{
          setCurrentQuesionNum(++currentQuesionNum);
          removeClassesFromOptions();
          setShowNextBtn(false)
          startTimer()  
      }
              return (
                <Component 
                getNextQuesion={getNextQuesion}
                checkAnswer = {checkAnswer}
                currentQuesionNum ={currentQuesionNum}
                quesions = {quesions}
                showNextBtn={showNextBtn}
                timeLeft={timeLeft}
                ref ={optionsContainer}/>
              )
            }

      return HOCQuesion;
}