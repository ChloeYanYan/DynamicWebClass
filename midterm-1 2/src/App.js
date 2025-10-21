import { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import Editor from "./components/Editor";
import Community from "./components/Community";

// 连接后端
const socket = io("http://localhost:4000", { transports: ["websocket"] });

// export default function App() {
//   const [posters, setPosters] = useState([]); // 社区海报列表（只读展示）
//   const [editing, setEditing] = useState(null); // 当前编辑中的 poster（null=新建）
//   const [userId, setUserId] = useState(null);

//   // 为前端本地生成 id（后端也可生成）
//   const genId = useMemo(
//     () => () =>
//       `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
//     []
//   );

//   useEffect(() => {
//     // 兼容你原先 server 的事件名
//     socket.on("welcome", ({ userId: id }) => setUserId(id));
//     socket.on("initPosters", (list) => setPosters(list || []));
//     socket.on("communityPosters", (list) => setPosters(list || []));

//     // 新增
//     socket.on("newPoster", (p) => setPosters((prev) => [...prev, p]));
//     socket.on("posterCreated", (p) => setPosters((prev) => [...prev, p]));

//     // 更新
//     socket.on("posterUpdated", (p) =>
//       setPosters((prev) => prev.map((x) => (x.id === p.id ? p : x)))
//     );

//     // 删除
//     socket.on("posterDeleted", ({ id }) =>
//       setPosters((prev) => prev.filter((x) => x.id !== id))
//     );

//     return () => {
//       socket.off("welcome");
//       socket.off("initPosters");
//       socket.off("communityPosters");
//       socket.off("newPoster");
//       socket.off("posterCreated");
//       socket.off("posterUpdated");
//       socket.off("posterDeleted");
//     };
//   }, []);

//   // 创建/发布
//   const handleCreate = (draft) => {
//     const poster = { ...draft, id: genId(), userId: userId ?? "local" };
//     // 本地先行
//     // setPosters((prev) => [...prev, poster]);
//     // 发给后端（兼容你旧的事件名）
//     socket.emit("publishPoster", {
//       userId: poster.userId,
//       image: poster.image,
//       link: poster.link ?? "#",
//     });
//     socket.emit("createPoster", poster);
//     // 退出编辑态
//     setEditing(null);
//   };

//   // 更新
//   const handleUpdate = (patch) => {
//     if (!patch?.id) return;
//     setPosters((prev) =>
//       prev.map((p) => (p.id === patch.id ? { ...p, ...patch } : p))
//     );
//     socket.emit("updatePoster", patch); // 需要你在 server 加此事件（可稍后）
//     setEditing(null);
//   };

//   // 删除
//   const handleDelete = (id) => {
//     setPosters((prev) => prev.filter((p) => p.id !== id));
//     socket.emit("deletePoster", { id }); // 需要你在 server 加此事件（可稍后）
//     // 如果删的是正在编辑的，就退出编辑
//     if (editing?.id === id) setEditing(null);
//   };

//   const handleEditStart = (poster) => setEditing(poster);
//   const handleCancelEdit = () => setEditing(null);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="text-center py-6">
//         <h1 className="text-3xl font-bold">Poster Generator</h1>
//       </header>

//       <main className="max-w-6xl mx-auto px-4">
//         <Editor
//           key={editing?.id || "new"}
//           mode={editing ? "edit" : "create"}
//           initial={editing || undefined}
//           onCancel={handleCancelEdit}
//           onCreate={handleCreate}
//           onUpdate={handleUpdate}
//         />

//         <Community
//           posters={posters}
//           onEdit={handleEditStart}
//           onDelete={handleDelete}
//         />
//       </main>
//     </div>
//   );
// }

const App = () => {
  const [posters, setPosters] = useState([]); // 社区海报列表（只读展示）
  const [editing, setEditing] = useState(null); // 当前编辑中的 poster（null=新建）
  const [userId, setUserId] = useState(null);

  // 为前端本地生成 id（后端也可生成）
  const genId = useMemo(
    () => () =>
      `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
    []
  );

  useEffect(() => {
    // 兼容你原先 server 的事件名
    socket.on("welcome", ({ userId: id }) => setUserId(id));
    socket.on("initPosters", (list) => setPosters(list || []));
    socket.on("communityPosters", (list) => setPosters(list || []));

    // 新增
    socket.on("newPoster", (p) => setPosters((prev) => [...prev, p]));
    socket.on("posterCreated", (p) => setPosters((prev) => [...prev, p]));

    // 更新
    socket.on("posterUpdated", (p) =>
      setPosters((prev) => prev.map((x) => (x.id === p.id ? p : x)))
    );

    // 删除
    socket.on("posterDeleted", ({ id }) =>
      setPosters((prev) => prev.filter((x) => x.id !== id))
    );

    return () => {
      socket.off("welcome");
      socket.off("initPosters");
      socket.off("communityPosters");
      socket.off("newPoster");
      socket.off("posterCreated");
      socket.off("posterUpdated");
      socket.off("posterDeleted");
    };
  }, []);

  // 创建/发布
  const handleCreate = (draft) => {
    const poster = { ...draft, id: genId(), userId: userId ?? "local" };
    // 本地先行
    // setPosters((prev) => [...prev, poster]);
    // 发给后端（兼容你旧的事件名）
    socket.emit("publishPoster", {
      userId: poster.userId,
      image: poster.image,
      link: poster.link ?? "#",
    });
    socket.emit("createPoster", poster);
    // 退出编辑态
    setEditing(null);
  };

  // 更新
  const handleUpdate = (patch) => {
    if (!patch?.id) return;
    setPosters((prev) =>
      prev.map((p) => (p.id === patch.id ? { ...p, ...patch } : p))
    );
    socket.emit("updatePoster", patch); // 需要你在 server 加此事件（可稍后）
    setEditing(null);
  };

  // 删除
  const handleDelete = (id) => {
    setPosters((prev) => prev.filter((p) => p.id !== id));
    socket.emit("deletePoster", { id }); // 需要你在 server 加此事件（可稍后）
    // 如果删的是正在编辑的，就退出编辑
    if (editing?.id === id) setEditing(null);
  };

  const handleEditStart = (poster) => setEditing(poster);
  const handleCancelEdit = () => setEditing(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="text-center py-6">
        <h1 className="text-3xl font-bold">Poster Generator</h1>
      </header>

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
          posters={posters}
          onEdit={handleEditStart}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
};

export default App;
