import { useState } from "react"
import './todoContainer.css'
export function TodoContainer(){
const [newTodo,setNewTodo] =useState('')
  const [inputValue,setInputValue] = useState([])

  const inputChange = function(event){
   setNewTodo(event.target.value)
   
  }

  const btnClick =function (){
    setInputValue([...inputValue,{id:crypto.randomUUID(),text:newTodo}])
    setNewTodo('')
    
  }
  
return(
  <>
  <div className="container">
    <div className="input-btn">
      <input placeholder="what do you want to do" type="text" onChange={inputChange} value={newTodo} />
      <button className="button" onClick={btnClick}>save</button>
    </div>
     <button className="button" onClick={()=>{
      setInputValue([])
    }}>reset</button>
    <div className="content">
      <ul>
       {inputValue.map((input)=>{
        return(
          
          <div className="list">
          <li key={input.id}>{input.text}</li>
          <button className="li-btn" onClick={
            ()=>{setInputValue(inputValue.filter(item => item.id !== input.id ))}
          }>*</button>
          </div>
          
        )
       })}
      </ul>

    </div>
   
  </div>
  </>
)
}