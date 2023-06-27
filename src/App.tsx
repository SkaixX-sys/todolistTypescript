import React from 'react';
import './tailwindcss/output.css';
import './tailwindcss/input.css';
import './App.css';
import { useState } from 'react';

interface ITodo {
  id: number;
  text: string;
  isComplete: boolean;
}

function App() {
  const [todos, setTodos] = useState<ITodo[]>(JSON.parse(localStorage.getItem('todos') || '[]'));
  const [input, setInput] = useState<string>('');
  const [error, setError] = useState<string>('');

  function createTodo(): void {
    if (input.length > 1) {
      const id = Math.random() * 100;
      const todo = {
        id: id,
        text: input,
        isComplete: false
      };
      setTodos((prevTodos) => [...prevTodos, todo]);
      setInput('');
      localStorage.setItem('todos', JSON.stringify([...todos, todo]));
    } else {
      setError('The goal is small, please try again');
      setTimeout(() => {
        setError('');
      }, 3500);
    }
  }

  function completeTodo(id: number): void {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: true } : todo
      )
    );
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isComplete: true,
        };
      }
      return todo;
    });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }

  function continiueTodo(id: number): void {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isComplete: false } : todo
      )
    );
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isComplete: false,
        };
      }
      return todo;
    });
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  }


  function deleteTodo(id: number): void {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    localStorage.setItem(
      'todos',
      JSON.stringify(todos.filter((todo) => todo.id !== id))
    );
  }

  return (
    <div className='relative h-screen flex justify-center items-center flex-col bg-white'>
      <h1 className='text-center font-bold text-3xl text-black'>Todolist</h1>
      <div
        className={
          error
            ? 'error w-1/6 h-auto p-3 absolute top-10 text-center bg-red-700 text-white ease-out duration-300 animate-fadeIn'
            : 'hidden animate-fadeOut'
        }
      >
        {error}
      </div>
      <div className={todos.length ? `p-3 w-1/2 flex justify-center items-center` : `hidden`}>
        <table className='text-center p-3'>
          <tr className='hover:scale-103 duration-100 ease-out'>
            <th className='p-3  hover:scale-105 duration-100 ease-out'>Goal</th>
            <th className=' hover:scale-105 duration-100 ease-out'>Status</th>
            <th className=' hover:scale-105 duration-100 ease-out'>Do</th>
            <th className=' hover:scale-105 duration-100 ease-out'>Delete</th>
          </tr>
          {todos.map(todo => (
            <tr key={todo.id} className=' hover:scale-x-105 duration-100 ease-out'>
              <td className='text-left p-3  hover:scale-105 duration-100 ease-out'>{todo.text}</td>
              <td className=' hover:scale-105 duration-100 select-none ease-out'> {todo.isComplete ? <span>&#x2705;</span> : <span>&#x23F3;</span>}</td>
              <td className=' hover:scale-105 duration-100 select-none ease-out'>
                {todo.isComplete ?
                  <div onClick={() => continiueTodo(todo.id)} className='underline cursor-pointer'>Продолжить</div>
                  :
                  <div onClick={() => completeTodo(todo.id)} className='underline cursor-pointer'>Завершить</div>
                }
              </td>
              <td className='cursor-pointer hover:scale-105 duration-100 select-none ease-out'>
                <div onClick={() => deleteTodo(todo.id)}>&#x274C;</div>
              </td>
            </tr>
          ))}
        </table>

      </div>
      <form action='' className='mt-5 flex justify-center items-center'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Put the goal'
          className='border ps-4 pe-4 py-2 rounded focus:scale-110 duration-300 ease-out'
        />
        <div onClick={() => createTodo()} className='text-black py-2 text-xl px-3 duration-100 ease-out hover:translate-x-1 cursor-pointer select-none underline rounded ms-3'>
          Create
        </div>
      </form>
    </div>
  );
}

export default App;