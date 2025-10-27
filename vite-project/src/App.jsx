import './App.css'
import { useState } from 'react';
import { TodoContainer } from './TodoContainer'
import { TodoProvider } from './TodoContext';
function App() {
  const [searchBar, setSearchBar] = useState("");
   

  
  return(
    <>
    
    <div className='upper-div'>
      
    </div>
  <TodoProvider >
    <TodoContainer searchBar={searchBar} setSearchBar={setSearchBar}   />
    </TodoProvider>
    
    
    </>

  )
}

export default App
