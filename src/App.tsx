import React, { useEffect, useState } from "react";
import "./App.css";
import TaskItem from "./components/TaskItem";
import { Task } from "./models/Task";
import InputField from "./components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { changeSearchTerm } from "./store/slices/tasksSlice";

function App() {
  // fetch tasks from my global store
  const tasks = useSelector(({ tasks: { search, data } }: any) => {
    if (search === "completed") {
      return data.filter((task: Task) => task.isDone === true);
    } else if (search === "active") {
      return data.filter((task: Task) => task.isDone === false);
    } else {
      return data;
    }
  });

  // to manager input from the input field
  const [todo, setTodo] = useState<string>("");

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    dispatch(changeSearchTerm(e.target.value))
  };

  return (
    <div className="min-h-screen bg-blue-500 p-10">
      <div className="flex flex-col gap-5">
        <p className="w-full text-center text-white font-bold text-3xl">
          Taskify
        </p>

        {/* Add task section */}
        <div className="w-full">
          <InputField todo={todo} setTodo={setTodo} />
        </div>

        {/* Task List section */}
        <div className="flex gap-5">
          <div className="w-1/2  mx-auto bg-cyan-400">
            <div className="flex gap-4 p-4">
              <p className="w-full text-2xl text-white">Tasks</p>
              <select name="" id="" onChange={handleChange}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="py-2 px-8 flex flex-col gap-2">
              {tasks.map((todo: Task) => (
                <TaskItem
                  key={todo.id}
                  id={todo.id}
                  description={todo.description}
                  isDone={todo.isDone}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
