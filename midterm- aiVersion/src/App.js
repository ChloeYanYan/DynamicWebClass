import { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import Editor from "./components/Editor";
import Community from "./components/Community";

const socket = io("http://localhost:4000", { transports: ["websocket"] }); //connect backend

const App = () => {
  const [poster, setPosters] = useState([]); //show posters in communiy
  const [editing, setEditing] = useState(null);
  const [userId, setUserId] = useState(null);

  //gengerate ID, cache function genId()
  const genId = useMemo(
    () => () =>
      `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    []
  );

  useEffect(() => {
    socket.on("welcome", ({ userId: id }) => setUserId(id));
    socket.on("initPosters", (list) => setPosters(list || []));
    socket.on("communityPosters", (list) => setPosters(list || []));

    //add poster
    socket.on("newPoster", (p) => setPosters((prev) => [...prev, p]));
    socket.on("posterCreated", (p) => setPosters((prev) => [...prev, p]));
    //update poster
    socket.on("posterUpdated", (p) =>
      setPosters((prev) => prev.map((x) => (x.id === p.id ? p : x)))
    );
    //delete
    socket.on("posterDeleted", ({ id }) =>
      setPosters((prev) => prev.filter((x) => x.id !== id))
    );

    //close
    return () => {
      socket.off("welcome");
      socket.off("");
    };
  }, []);

  //create, publish
  const handleUpdate = (draft) => {
    const poster = { ...draft, id: genId(), userId: userId ?? "local" };
    socket.emit("publishPoster", {
      userId: poster.userId,
      image: poster.image,
      link: poster.link ?? "#",
    });
    socket.emit("createPoster", poster);
    setEditing(null);
  };

  const handleDelete = (id) => {
    setPosters((prev) => prev.filter((p) => p.id !== id));
    socket.emit("deletePoster", { id });

    if (editing?.id === id) setEditing(null);
  };

  const handleEditStart = (poster) => setEditing(poster);
  const handleCancelEdit = () => setEditing(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <head className="text-center py-6">
        <h1 className="text-3xl font-bond">Poster Generator</h1>
      </head>

      <main className="max-w-6xl mx-auto px-4">
        <Editor
          key={editing?.id || "new"}
          mode={editing ? "edit" : "create"}
          initial={editing || undefined}
          onCancel={handleCancelEdit}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />

        <Community
          poster={posters}
          onEdit={handleEditStart}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
};

export default App;
