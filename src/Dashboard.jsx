import { useState } from "react";
import axios from "axios";

export const Dashboard = () => {
  const [boardName, setBoardName] = useState("");
  const [listName, setListName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [boardId, setBoardId] = useState("");
  const [listId, setListId] = useState("");

  const createBoard = async () => {
    const response = await axios.post("http://localhost:5000/trello/board", {
      name: boardName,
    });
    setBoardId(response.data.id);
  };

  const createList = async () => {
    const response = await axios.post("http://localhost:5000/trello/list", {
      name: listName,
      boardId,
    });
    setListId(response.data.id);
  };

  const createTask = async () => {
    await axios.post("http://localhost:5000/trello/card", {
      name: taskName,
      listId,
    });
  };

  return (
    <div className="form-container">
      <h1>Trello Dashboard</h1>
      <div>
        <input
          type="text"
          placeholder="Board Name"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          className="input-field"
        />
        <button onClick={createBoard} className="submit-button">
          Create Board
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="List Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          className="input-field"
        />
        <button onClick={createList} className="submit-button">
          Create List
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="input-field"
        />
        <button onClick={createTask} className="submit-button">
          Create Task
        </button>
      </div>
    </div>
  );
};
