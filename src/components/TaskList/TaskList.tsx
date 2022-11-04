import { ITask } from "../../interface/Task";
import styles from "./TaskList.module.css";

type Props = {
  taskList: ITask[];
  deleteTask(id: number): void;
  editTask(task: ITask): void;
};

export default function TaskList({ taskList, deleteTask, editTask }: Props) {
  return (
    <>
      {taskList.length > 0 ? (
        taskList.map((task) => (
          <div key={task.id} className={styles.task}>
            <div className={styles.details}>
              <h4>{task.title}</h4>
              <p>Dificuldade: {task.difficulty}</p>
            </div>
            <div className={styles.actions}>
              <i className="bi bi-pencil" onClick={() => editTask(task)}></i>
              <i
                className="bi bi-trash"
                onClick={() => {
                  deleteTask(task.id);
                }}
              ></i>
            </div>
          </div>
        ))
      ) : (
        <div>
          <p>Não Ha tarefas</p>
        </div>
      )}
    </>
  );
}
