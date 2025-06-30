import { useAuth } from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  AssignUserTaskAPI,
  getAssignUserTaskAPI,
  getTask,
  getUser,
  TaskAPI,
} from "./api/api";

function App() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [checkedAuth, setCheckedAuth] = useState(false);
  const taskRef = useRef(null);
  const assignRef = useRef(null);
  const queryClient = useQueryClient();
  const [taskModal, setTaskModal] = useState(false);
  const [assignModal, setAssignModal] = useState(false);
  const { data: taskList } = useQuery({ queryKey: ["task"], queryFn: getTask });
  const { data: userList } = useQuery({ queryKey: ["user"], queryFn: getUser });
  const { data: assignUsers } = useQuery({queryKey: ["assignuser"], queryFn: getAssignUserTaskAPI});

  console.log("USERS", assignUsers);

  // const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setCheckedAuth(true);
    }
  }, []);

  // if (!checkedAuth) {
  //   return null; // Optionally show loader here
  // }

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/login");
  };

  const { mutate: task } = useMutation({
    mutationFn: TaskAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["addtask"]);
    },
  });
  const taskSubmt = (e) => {
    e.preventDefault();
    const taskData = new FormData(taskRef.current);
    task(taskData);
    taskRef.current.reset();
    setTaskModal(true);
    console.log("Success");
  };

  const { mutate: assign } = useMutation({
    mutationFn: AssignUserTaskAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["assignuser"]);
    },
  });

  const assignSubmit = (e) => {
    e.preventDefault();
    const assignData = new FormData(assignRef.current);
    assign(assignData);
    setAssignModal(true);
    console.log("Success");
  };

  return (
    <main className="w-screen h-screen flex">
      {/* sidebar */}
      <section className="flex flex-col max-w-[250px] text-white bg-slate-950">
        <div className="bg-white">
          <img
            src="https://southerncalibration.com/image/logo.png"
            alt="logo"
          />
        </div>

        <div className="flex flex-col flex-1 gap-2 p-6 overflow-y-auto">
          <a href="">Dashbord</a>
          <a href="">Dashbord</a>
          <a href="">Dashbord</a>
        </div>

        <div className="p-6">
          <div className="flex h-[20px] border-t-1">
            <a className="pt-1" href="#" onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>
      </section>

      {/* main content */}
      <section className="flex flex-1">
        <section>
          {/* adding task */}
          <form
            ref={taskRef}
            className="flex flex-col bg-blue-300 mx-auto gap-4"
            onSubmit={taskSubmt}
          >
            <label>Task Name</label>
            <input name="name" className="border-1" type="text" />

            <label>Description</label>
            <input name="description" className="border-1" type="text" />

            <input className="bg-green-500" value="Submit" type="submit" />
          </form>

          {/* assigning task */}
          <form
            ref={assignRef}
            className="flex flex-col bg-blue-300 mx-auto gap-4"
            onSubmit={assignSubmit}
          >
            <label>Tasks</label>
            <div className="relative">
              <select
                name="task"
                className="block appearance-none w-full rounded-sm border border-gray-400 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                {taskList?.map((tasks) => {
                  return (
                    <option key={tasks.id} value={tasks.id}>
                      {tasks.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <label>User</label>
            <div className="relative">
              <select
                name="user"
                className="block appearance-none w-full rounded-sm border border-gray-400 text-gray-700 py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                {userList?.map((user) => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.username}
                    </option>
                  );
                })}
              </select>
            </div>

            <input className="bg-green-500" value="Submit" type="submit" />
          </form>
        </section>

        <section>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Task
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {taskList?.map((task) => (
                <tr key={task.id} className="even:bg-gray-50 hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {task.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {task.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Task
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Description
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  User
                </th>
               
              </tr>
            </thead>
            <tbody>
              {assignUsers?.map((assign) => (
                <tr
                  key={assign.id}
                  className="even:bg-gray-50 hover:bg-gray-100"
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {assign.task?.name || "No task"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {assign.task?.description || "No description"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {assign.user?.username || "No user"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* {userList?.map((user) => {
                  return (
                    <td className="flex flex-col" key={user.id}>{user.username}</td>
                  );
                })} */}
      </section>

      {taskModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <p>Adding Task Successful!</p>
            <div className=" flex flex-row-reverse">
              <button
                className="bg-red-500 p-2 rounded mt-4"
                onClick={() => setTaskModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {assignModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <p>Assign Task to User Successful!</p>
            <div className=" flex flex-row-reverse">
              <button
                className="bg-red-500 p-2 rounded mt-4"
                onClick={() => setAssignModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
