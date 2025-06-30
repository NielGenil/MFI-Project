import { useAuth } from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { TaskAPI } from "./api/api";

function App() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [checkedAuth, setCheckedAuth] = useState(false);
  const taskRef = useRef(null);
  const queryClient = useQueryClient();
  const [taskModal, setTaskModal] = useState(false);


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
        </section>
      </section>

      {taskModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded">
            <p>Adding Task Successful!</p>
            <div className=" flex flex-row-reverse">
            <button className="bg-red-500 p-2 rounded mt-4" onClick={() => setTaskModal(false)}>Close</button>
            </div>
          </div>

        </div>
      )}
    </main>
  );
}

export default App;
