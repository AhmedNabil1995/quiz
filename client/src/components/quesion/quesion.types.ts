import React, { LegacyRef } from "react"

export type QuesionProps = {
    getNextQuesion:()=>void,
    checkAnswer:(e:React.MouseEvent<HTMLDivElement>)=>void,
    currentQuesionNum:number,
    quesions:IQuesion[]|[],
    showNextBtn:boolean,
    timeLeft:number,
    ref:React.ForwardedRef<HTMLDivElement | null>
  }
  
  export type WithQuesionProps = React.ComponentType<QuesionProps>

  export interface IQuesion{
    id: number,
    word: string,
    pos: string
  }