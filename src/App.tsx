import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import TaskList from "./components/TaskList/TaskList";
import TaskForm from "./components/TaskForm/TaskForm";
import { useState } from "react";
import { ITask } from "./interface/Task";

import styles from "./App.module.css";
import Modal from "./components/Modal/Modal";

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskUpdate, setTaskUpdate] = useState<ITask | null>(null);

  const deleteTask = (id: number) => {
    setTaskList(
      taskList.filter((task) => {
        return task.id !== id;
      }),
    );
  };

  const hideOrShowModel = (display: boolean) => {
    const modal = document.querySelector("#modal");
    if (display) {
      modal!.classList.remove("hide");
    } else {
      modal!.classList.add("hide");
    }
  };

  const editTaks = (task: ITask): void => {
    hideOrShowModel(true);
    setTaskUpdate(task);
  };

  const updateTask = (id: number, title: string, difficulty: number) => {
    const updateTask: ITask = { id, title, difficulty };

    const updatedItems = taskList.map((task) => {
      return task.id === updateTask.id ? updateTask : task;
    });

    setTaskList(updatedItems);
    hideOrShowModel(false);
  };

  return (
    <div>
      <Modal
        children={
          <TaskForm
            btnText="Editar Tarefa"
            taskList={taskList}
            task={taskUpdate}
            handleUpdate={updateTask}
          />
        }
      />
      <Header />
      <div className={styles.main}>
        <h2>Oque você vai fazer?</h2>
        <TaskForm taskList={taskList} btnText="Criar tarefa" setTaskList={setTaskList} />
        <h2>Essas são suas tarefas:</h2>
        <TaskList deleteTask={deleteTask} taskList={taskList} editTask={editTaks} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
