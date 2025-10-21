import { useState, useEffect } from "react";
import io from "socket.io-client";
import Editor from "./components/Editor";
import Community from "./components/Community";

const socket = io("http://localhost:4000");

function App() {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    socket.on("initPosters", (data) => {
      setPosters(data);
    });

    socket.on("newPoster", (data) => {
      setPosters((prev) => [...prev, data]);
    });

    return () => {
      socket.off("initPosters");
      socket.off("newPoster");
    };
  }, []);

  const handlePublish = (posterData) => {
    socket.emit("newPoster", posterData);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mt-6 mb-4">🎨 Poster Generator</h1>
      <Editor onPublish={handlePublish} />
      <Community posters={posters} />
    </div>
  );
}

export default App;
