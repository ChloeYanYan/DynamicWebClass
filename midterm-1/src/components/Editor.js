import { useState } from "react";
import Canvas from "./Canvas";

function Editor({ onPublish }) {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#000000");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    if (file) reader.readAsDataURL(file);
  };

  const handlePublishClick = () => {
    if (!preview) return alert("Please draw your poster first!");
    onPublish({ title, color, image: preview });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded w-2/3 mx-auto mb-6">
      <input
        className="border p-2 w-full mb-2"
        type="text"
        placeholder="Enter title text..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex items-center justify-between mb-2">
        <label>Choose Color:</label>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {/* 👇 引入 Canvas.js */}
      <Canvas title={title} color={color} image={image} onRender={setPreview} />

      <button
        onClick={handlePublishClick}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
      >
        Publish
      </button>
    </div>
  );
}

export default Editor;
