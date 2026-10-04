import React, { useState } from 'react';
import './App.css';

function TodoList() { //объявляем react-компонент
  const [tasks, setTasks] = useState([]);//создаём пустой массив tasks — текущее значение, setTasks — функция, чтобы его обновить
  const [text, setText] = useState("");//Состояние для текста в поле ввода

  const addTask = () => { // ф-я обработчик для добавления задачи
    const value = text.trim(); //убирает лишние пробелы по краям
    if (value === "") return; //защита от добавления пустых задач
//новая задача
    const newTask = {
      id: Date.now(), // уникальный идентификатор
      text: value, //текст
      completed: false,// статус выполнения
    };
//обновление списка задач
    setTasks(prev => [...prev, newTask]);
    setText(""); //очищает поле ввода после добавления задачи
  };
//ф-я для переподключения статуса выполнено
  const toggleTask = (id) => {
    setTasks(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    );
  };
//удаление задачи по id
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length; //сколько задач уже выполнено
  const totalCount = tasks.length;// общее количество задач

  return (
    <div className="todo-list">
      <h3 className="todo-title">TodoList</h3>

      <div className="input-row">
        <input
          className="todo-input"
          type="text"
          placeholder="Введите задачу"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') addTask(); }}
          aria-label="Введите задачу"
        />
        <button className="add-btn" onClick={addTask} disabled={text.trim() === ""}>
          Добавить
        </button>
      </div>

      {totalCount === 0 ? (
        <p className="empty">Нет задач</p>
      ) : (
        <>
          <ul className="tasks" role="list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <input
                  className="task-checkbox"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  aria-label="Выполнено"
                />
                <span
                  className="task-text"
                  style={{ textDecoration: task.completed ? "line-through" : "none" }}
                >
                  {task.text}
                </span>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                  Удалить
                </button>
              </li>
            ))}
          </ul>

          <div className="status">
            Выполнено {completedCount} из {totalCount}
          </div>
        </>
      )}
    </div>
  );
}

export default TodoList;