import React, { useState } from "react";
import { X } from "lucide-react";
import { useEffect } from "react";
const App = () => {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [task, setTask] = useState(() => {
    const savedTasks = localStorage.getItem("notes");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(task));
  }, [task]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isBig, setIsBig] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Submit Handler");
    console.log(title, details);
    const copyTask = [...task];
    copyTask.push({
      title,
      details,
    });
    setTask(copyTask);
    console.log(copyTask);
    setTitle("");
    setDetails("");
  };

  return (
    <div
      className="h-screen text-white flex flex-col lg:flex-row justify-between backdrop-blur-7xl bg-[url('https://i.pinimg.com/736x/ed/4b/be/ed4bbe5478b740c71c271b4182491b8d.jpg')]
    "
    >
      <form
        className="flex flex-col lg:w-1/2 gap-4 p-10  "
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <input
          className="px-5 py-2 border-2 rounded bg-gray-900 text-white"
          type="text"
          placeholder="Enter Notes Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          className="px-5 py-2 border-2 rounded bg-gray-900 "
          type="text"
          placeholder="Enter Detailed notes"
          value={details}
          onChange={(e) => {
            setDetails(e.target.value);
          }}
        />
        <button
          className="text-black px-5 py-2 border-2 rounded  active:bg-gray-300
           bg-amber-50 font-bold"
          type="submit"
        >
          Add Note
        </button>
      </form>
      <div className="flex flex-wrap p-10 items-start  lg:w-full lg:h-full gap-5 bg-gray-900 ">
        <h1 className="text-2xl font-bold">Recent Notes</h1>
        <div className="flex flex-wrap gap-5 mt-5 overflow-auto h-full">
          <div className="flex flex-wrap gap-5 mt-5">
            {task.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  setExpandedIndex(expandedIndex === index ? null : index)
                }
                className={`
        rounded-2xl bg-cover cursor-pointer
        transition-all duration-300 ease-in-out
        bg-[url('https://static.vecteezy.com/system/resources/previews/011/286/963/non_2x/white-note-book-paper-png.png')]
        ${expandedIndex === index ? "h-80 w-72 scale-105 z-10" : "h-52 w-45"}
      `}
              >
                <button
                  className={`text-lg font-bold px-37 py-4 active:scale-90 ${isBig ? "scale-90" : ""}`}
                  onClick={(e) => {
                    const copyTask = [...task];
                    copyTask.splice(index, 1);
                    setTask(copyTask);
                    e.stopPropagation();
                    setIsBig(true);
                  }}
                >
                  <X className="bg-amber-300 rounded-b-full text-black" />
                </button>

                <h2 className="text-lg font-bold text-black px-2">
                  {item.title}
                </h2>

                <p
                  className={`text-sm text-black px-2 py-1 ${
                    expandedIndex === index
                      ? "overflow-y-auto max-h-40"
                      : "line-clamp-3"
                  }`}
                >
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
