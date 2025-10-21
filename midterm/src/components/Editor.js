import { useEffect, useState } from "react";
import Canvas from "./Canvas";

export default function Editor({
  mode = "create",
  initial,
  onCreate,
  onUpdate,
  onCancel,
}) {
  // poster basic info
  const [form, setForm] = useState({
    title: "Title",
    titleColor: "#0EC0FF",
    subtitle: "Subtitle",
    subtitleColor: "#EE00E5",
    body: "Body text - This is a poster",
    bodyColor: "#00878B",
    author: "Author",
    authorColor: "#2300EE",
    bgColor: "#ACEE00",
    link: "",
    image: null,
    // Can be changed by Cnavas.js
    elements: {
      title: { x: 200, y: 80, font: "bold 48px Arial" },
      subtitle: { x: 200, y: 130, font: "28px Arial" },
      body: {
        x: 200,
        y: 350,
        font: "18px Arial",
        maxWidth: 320,
        lineHeight: 24,
      },
      author: { x: 200, y: 460, font: "16px Arial" },
    },
    // picture's position
    picture: { src: null, x: 200, y: 260, scale: 1 },
  });

  useEffect(() => {
    if (mode === "edit" && initial) {
      setForm((f) => ({
        ...f,
        ...initial,
        elements: initial.elements || f.elements,
        picture: initial.picture || f.picture,
      }));
    }
  }, [mode, initial]);

  const update = (patch) => setForm((f) => ({ ...f, ...patch }));

  const handleImgFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      update({ picture: { ...form.picture, src: reader.result } });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!form.image) {
      alert("Please draw the poster first!");
      return;
    }
    if (mode === "edit") {
      onUpdate?.({ ...form, id: initial.id });
    } else {
      onCreate?.(form);
    }
  };

  return (
    <section className="bg-white rounded shadow p-12 mb-6">
      <h2 className="text-xl font-semibold mb-3">
        {mode === "edit" ? "Edit Poster" : "Create Poster"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            className="border p-1 w-full border-sky-400 text-gray-400 text-sm"
            value={form.title}
            onChange={(e) => update({ title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Title Color</label>
          <input
            type="color"
            className="w-8 h-8 p-0 border rounded cursor-pointer"
            value={form.titleColor}
            onChange={(e) => update({ titleColor: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Subtitle</label>
          <input
            className="border p-1 w-full  border-sky-400 text-gray-400 text-sm"
            value={form.subtitle}
            onChange={(e) => update({ subtitle: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Subtitle Color</label>
          <input
            type="color"
            className="w-8 h-8 p-0 border rounded cursor-pointer"
            value={form.subtitleColor}
            onChange={(e) => update({ subtitleColor: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Body</label>
          <textarea
            rows={3}
            className="border p-1  border-sky-400 w-full text-gray-400 text-sm"
            value={form.body}
            onChange={(e) => update({ body: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Body Color</label>
          <input
            type="color"
            className="w-8 h-8 p-0 border rounded cursor-pointer"
            value={form.bodyColor}
            onChange={(e) => update({ bodyColor: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Author</label>
          <input
            className="border p-1 border-sky-400 w-full text-gray-400 text-sm"
            value={form.author}
            onChange={(e) => update({ author: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Author Color</label>
          <input
            type="color"
            className="w-8 h-8 p-0 border rounded cursor-pointer"
            value={form.authorColor}
            onChange={(e) => update({ authorColor: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Link (for Community Card)
          </label>
          <input
            className="border p-1  border-sky-400 w-full text-gray-400 text-sm"
            value={form.link}
            onChange={(e) => update({ link: e.target.value })}
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Poster Background Color
          </label>
          <input
            type="color"
            className="w-20 h-8 p-0 border rounded cursor-pointer"
            value={form.bgColor}
            onChange={(e) => update({ bgColor: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImgFile} />
          {form.picture?.src && (
            <button
              className="ml-2 text-sm text-red-600 underline "
              onClick={() =>
                update({ picture: { ...form.picture, src: null } })
              }
              type="button"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {/* 画布：可拖拽文本/图片、滚轮缩放图片、回传 base64 输出与位姿 */}
      <Canvas
        width={400}
        height={500}
        data={form}
        onChange={(patch) => update(patch)}
        onRender={(base64) => update({ image: base64 })}
      />

      <div className="flex gap-2 mt-4">
        <button
          onClick={handleSubmit}
          className=" bg-black text-white px-4 py-2 rounded-3xl"
        >
          {mode === "edit" ? "Save Changes" : "Publish"}
        </button>
        {mode === "edit" && (
          <button
            onClick={onCancel}
            className=" bg-sky-400 text-white px-3 py-2 rounded-3xl border"
          >
            Cancel
          </button>
        )}
        {form.image && (
          <a
            href={form.image}
            download={`poster-${Date.now()}.png`}
            className="ml-auto px-3 py-2 rounded-3xl border border-black"
          >
            Download PNG
          </a>
        )}
      </div>
    </section>
  );
}
