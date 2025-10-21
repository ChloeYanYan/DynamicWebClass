import { useEffect, useState } from "react";
import Canvas from "./Canvas";

export default function Editor({
  mode = "create",
  initial,
  onCreate,
  onUpdate,
  onCancel,
}) {
  // 统一的海报数据结构
  const [form, setForm] = useState({
    title: "Title",
    titleColor: "#000000",
    subtitle: "Subtitle",
    subtitleColor: "#333333",
    body: "Body text",
    bodyColor: "#555555",
    author: "Author",
    authorColor: "#777777",
    bgColor: "#f5f5f5",
    link: "",
    // 画布内容导出的 base64
    image: null,
    // 画布上各元素的位置信息（可被 Canvas 更新）
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
    // 图片位姿
    picture: { src: null, x: 200, y: 260, scale: 1 },
  });

  // 编辑态时装载初始数据
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
    <section className="bg-white rounded shadow p-4 mb-6">
      <h2 className="text-xl font-semibold mb-3">
        {mode === "edit" ? "Edit Poster" : "Create Poster"}
      </h2>

      {/* 文本与颜色设置 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            className="border p-2 w-full"
            value={form.title}
            onChange={(e) => update({ title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Title Color</label>
          <input
            type="color"
            className="border p-2 w-full"
            value={form.titleColor}
            onChange={(e) => update({ titleColor: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Subtitle</label>
          <input
            className="border p-2 w-full"
            value={form.subtitle}
            onChange={(e) => update({ subtitle: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Subtitle Color</label>
          <input
            type="color"
            className="border p-2 w-full"
            value={form.subtitleColor}
            onChange={(e) => update({ subtitleColor: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Body</label>
          <textarea
            rows={3}
            className="border p-2 w-full"
            value={form.body}
            onChange={(e) => update({ body: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Body Color</label>
          <input
            type="color"
            className="border p-2 w-full"
            value={form.bodyColor}
            onChange={(e) => update({ bodyColor: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Author</label>
          <input
            className="border p-2 w-full"
            value={form.author}
            onChange={(e) => update({ author: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Author Color</label>
          <input
            type="color"
            className="border p-2 w-full"
            value={form.authorColor}
            onChange={(e) => update({ authorColor: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Background</label>
          <input
            type="color"
            className="border p-2 w-full"
            value={form.bgColor}
            onChange={(e) => update({ bgColor: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Link (for Community Card)
          </label>
          <input
            className="border p-2 w-full"
            value={form.link}
            onChange={(e) => update({ link: e.target.value })}
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImgFile} />
          {form.picture?.src && (
            <button
              className="ml-2 text-sm text-red-600 underline"
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
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {mode === "edit" ? "Save Changes" : "Publish"}
        </button>
        {mode === "edit" && (
          <button onClick={onCancel} className="px-3 py-2 rounded border">
            Cancel
          </button>
        )}
        {form.image && (
          <a
            href={form.image}
            download={`poster-${Date.now()}.png`}
            className="ml-auto px-3 py-2 rounded border"
          >
            Download PNG
          </a>
        )}
      </div>
    </section>
  );
}
