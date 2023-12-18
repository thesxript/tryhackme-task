import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { env } from "../../config/env";

type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
};

type TaskFormProps = {
  task?: Task | null;
  isEditing?: boolean;
  onClose?: () => void;
};

export default function TaskCreate({
  task,
  isEditing = false,
  onClose,
}: TaskFormProps) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("pending");
  const [priority, setPriority] = useState<string>("low");
  const navigate = useNavigate();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
      setPriority(task.priority);
    } else {
      setTitle("");
      setDescription("");
      setStatus("pending");
      setPriority("low");
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      status,
      priority,
    };

    const url = isEditing
      ? `${env.BASE_URL}/api/tasks/${task?._id}`
      : `${env.BASE_URL}/api/tasks`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}` || "",
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();
      if (response.ok) {
        if (isEditing) {
          console.log("Task updated successfully");
        } else {
          console.log("Task created successfully");
        }

        setTitle("");
        setDescription("");
        setStatus("pending");
        setPriority("low");
        onClose?.();
        navigate("/tasks");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error creating/updating task:", error);
    }
  };

  return (
    <div className="w-full px-10">
      <div className="py-10">
        <h2 className="text-2xl">{isEditing ? "Edit" : "Create"} Task</h2>
        <div className="py-10">
          <div className="">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title:
                </label>
                <input
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description:
                </label>
                <textarea
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Status:
                </label>
                <select
                  className="block w-full sm:w-40 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="mb-3">
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Priority:
                </label>
                <select
                  className="block w-full sm:w-40 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <button
                type="submit"
                className="py-3 w-full rounded-md disabled:bg-gray-400 bg-indigo-600 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {task ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
