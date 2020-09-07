import React , { useState,useEffect } from 'react';
import './App.css';

import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {

 
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos,setfilteredTodos] = useState([]);

  useEffect(()=>{
    getLocalTodos();
  },[]);
 
  useEffect(()=>{
    filterHandler();
    savelocalTodos();
  },[todos, status]);

  //functions
  const filterHandler = () =>{
    switch(status){
      case 'completed':
        setfilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setfilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setfilteredTodos(todos);
        break;
    }
  }; 

  const savelocalTodos = () => {
if (localStorage.getItem("todos")===null){
      localStorage.setItem("todos",JSON.stringify([]));
    }
else{
  localStorage.setItem("todos",JSON.stringify(todos));
    }
  };
 
  const getLocalTodos = () =>{
    if (localStorage.getItem("todos")===null){
      localStorage.setItem("todos",JSON.stringify([]));
    }
else{
  let todoLocal = JSON.parse(localStorage.getItem("todos"));
  setTodos(todoLocal);  
}
  };
  
  
  return (
    <div className="App">
      <header>
      <h1>Todo List</h1>
    </header>
    <Form inputText={inputText}
          todos={todos}
          setTodos={setTodos} 
          setInputText={setInputText}
          setStatus={setStatus}
          status={status} 
          
          />
    <TodoList filteredTodos={filteredTodos} setTodos={setTodos} todos={todos} /> 
    </div>
  );
}

export default App;
