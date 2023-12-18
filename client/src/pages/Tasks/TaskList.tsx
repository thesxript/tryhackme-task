import { useEffect, useState } from "react";
import { env } from "../../config/env";
import { toast } from "sonner";
import * as Dialog from "@radix-ui/react-dialog";
import TaskCreate from "./TaskCreate";

type Task = {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [paginate, setPaginate] = useState({
    limit: 10,
    skip: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchTasks();
  }, [paginate, showModal]);

  const handleClose = (): void => setShowModal(false);
  const handleShow = (): void => setShowModal(true);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    handleShow();
  };

  const handleDelete = async (taskId: string) => {
    try {
      const response = await fetch(`${env.BASE_URL}/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` || "",
        },
      });

      if (response.ok) {
        setTasks((prevTasks) =>
          prevTasks.filter((task: Task) => task._id !== taskId)
        );
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error("Error deleting task");
      console.error("Error deleting task:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `${env.BASE_URL}/api/tasks?skip=${paginate.skip}&limit=${paginate.limit}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` || "",
          },
        }
      );
      const result = await response.json();
      if (response.ok) {
        setTasks(result.tasks);
      } else {
        toast.error(result.errorMessage);
      }
    } catch (error) {
      toast.error("Error fetching task");

      console.error("Error fetching tasks:", error);
    }
  };

  const handlePrevPaginate = () => {
    if (currentPage === 1) return null;
    setPaginate({
      skip: paginate.skip - paginate.limit,
      limit: paginate.limit,
    });
    setCurrentPage((oldCount) => oldCount - 1);
  };

  const handleNextPaginate = () => {
    if (tasks.length < paginate.limit) return null;
    setPaginate({
      skip: paginate.skip + paginate.limit,
      limit: paginate.limit,
    });
    setCurrentPage((oldCount) => oldCount + 1);
  };

  return (
    <section className="py-10">
      <div className="py-3 pl-4">
        <h2 className="text-2xl font-medium">Task List</h2>
      </div>

      <div className="overflow-x-auto">
        {tasks.length > 0 ? (
          <>
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    No
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Title
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Description
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Priority
                  </th>
                  <th className="px-1 py-2"></th>
                  <th className="px-1 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tasks.map((task: Task, index) => (
                  <tr key={Number(task._id)}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {index + paginate.skip}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      {task.title}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {task.description}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {task.status}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {task.priority}
                    </td>
                    <td className="whitespace-nowrap px-1 py-2">
                      <button
                        onClick={() => handleEdit(task)}
                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-1 py-2">
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <div className="py-10 w-full text-center">
            <div className="flex justify-center">
              <span className="text-2xl">No tasks found</span>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center py-20">
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={handlePrevPaginate}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 "
          >
            Prev
          </button>
          <button
            onClick={handleNextPaginate}
            className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 "
          >
            Next
          </button>
        </div>
      </div>
      <Dialog.Root open={showModal} onOpenChange={setShowModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/10 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <div className="mt-[25px] flex justify-end">
              <TaskCreate
                task={editingTask}
                isEditing={true}
                onClose={handleClose}
              />
            </div>
            <Dialog.Close asChild>
              <button
                className="text-black hover:bg-gray-500 focus:shadow-gray-300 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                X
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
