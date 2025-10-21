import { useEffect, useRef } from "react";

export default function Canvas({
  width = 400,
  height = 500,
  data,
  onChange,
  onRender,
}) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ draggingKey: null, offsetX: 0, offsetY: 0 });

  // 渲染
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 背景
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = data.bgColor || "#fff";
    ctx.fillRect(0, 0, width, height);

    // 图片
    if (data.picture?.src) {
      const img = new Image();
      img.src = data.picture.src;
      img.onload = () => {
        drawAll(ctx, img);
      };
    } else {
      drawAll(ctx, null);
    }

    function drawAll(ctx, img) {
      // 先画图片
      if (img) {
        const w = img.width * (data.picture.scale ?? 1);
        const h = img.height * (data.picture.scale ?? 1);
        const x = (data.picture.x ?? width / 2) - w / 2;
        const y = (data.picture.y ?? height / 2) - h / 2;
        ctx.drawImage(img, x, y, w, h);
      }

      // 文本统一绘制
      const drawLineText = (text, x, y, font, color, align = "center") => {
        if (!text) return;
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.textAlign = align;
        ctx.textBaseline = "alphabetic";
        ctx.fillText(text, x, y);
      };

      const wrapAndDraw = (
        text,
        x,
        y,
        font,
        color,
        maxWidth = 320,
        lineHeight = 24
      ) => {
        if (!text) return;
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        const lines = wrapLines(ctx, text, maxWidth);
        lines.forEach((line, i) => ctx.fillText(line, x, y + i * lineHeight));
      };

      // 取位姿
      const el = data.elements || {};
      drawLineText(
        data.title,
        el.title?.x ?? 200,
        el.title?.y ?? 80,
        el.title?.font ?? "bold 48px Arial",
        data.titleColor || "#000"
      );
      drawLineText(
        data.subtitle,
        el.subtitle?.x ?? 200,
        el.subtitle?.y ?? 130,
        el.subtitle?.font ?? "28px Arial",
        data.subtitleColor || "#333"
      );
      wrapAndDraw(
        data.body,
        el.body?.x ?? 200,
        el.body?.y ?? 350,
        el.body?.font ?? "18px Arial",
        data.bodyColor || "#555",
        el.body?.maxWidth ?? 320,
        el.body?.lineHeight ?? 24
      );
      drawLineText(
        data.author,
        el.author?.x ?? 200,
        el.author?.y ?? 460,
        el.author?.font ?? "16px Arial",
        data.authorColor || "#777"
      );

      // 导出 base64
      onRender?.(canvas.toDataURL("image/png"));
    }
  }, [
    data.title,
    data.titleColor,
    data.subtitle,
    data.subtitleColor,
    data.body,
    data.bodyColor,
    data.author,
    data.authorColor,
    data.bgColor,
    data.elements,
    data.picture,
    onRender,
    width,
    height,
  ]);

  // 拖拽 & 滚轮缩放
  useEffect(() => {
    const canvas = canvasRef.current;

    const getMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const hitTest = (pt) => {
      // 依次检测文本（以文本包围盒）与图片
      const el = data.elements || {};
      const tests = [
        [
          "title",
          data.title,
          el.title?.font ?? "bold 48px Arial",
          el.title?.x ?? 200,
          el.title?.y ?? 80,
        ],
        [
          "subtitle",
          data.subtitle,
          el.subtitle?.font ?? "28px Arial",
          el.subtitle?.x ?? 200,
          el.subtitle?.y ?? 130,
        ],
        [
          "author",
          data.author,
          el.author?.font ?? "16px Arial",
          el.author?.x ?? 200,
          el.author?.y ?? 460,
        ],
      ];

      const ctx = canvas.getContext("2d");
      ctx.textAlign = "center";

      for (const [key, text, font, x, y] of tests) {
        if (!text) continue;
        ctx.font = font;
        const w = ctx.measureText(text).width;
        const h = parseInt(font, 10) || 20;
        if (
          pt.x >= x - w / 2 &&
          pt.x <= x + w / 2 &&
          pt.y >= y - h &&
          pt.y <= y
        ) {
          return { type: "text", key, x, y };
        }
      }

      // body（多行）
      if (data.body) {
        const bx = el.body?.x ?? 200;
        const by = el.body?.y ?? 350;
        const font = el.body?.font ?? "18px Arial";
        const maxWidth = el.body?.maxWidth ?? 320;
        const lineHeight = el.body?.lineHeight ?? 24;

        ctx.font = font;
        const lines = wrapLines(ctx, data.body, maxWidth);
        const totalH = lines.length * lineHeight;
        const maxW = Math.max(...lines.map((ln) => ctx.measureText(ln).width));
        if (
          pt.x >= bx - maxW / 2 &&
          pt.x <= bx + maxW / 2 &&
          pt.y >= by - lineHeight &&
          pt.y <= by + totalH - lineHeight
        ) {
          return { type: "text", key: "body", x: bx, y: by };
        }
      }

      // 图片
      if (data.picture?.src) {
        const imgW = 100 * (data.picture.scale ?? 1); // 用大致区域做命中（更快）
        const imgH = 100 * (data.picture.scale ?? 1);
        const cx = data.picture.x ?? width / 2;
        const cy = data.picture.y ?? height / 2;
        if (
          pt.x >= cx - imgW / 2 &&
          pt.x <= cx + imgW / 2 &&
          pt.y >= cy - imgH / 2 &&
          pt.y <= cy + imgH / 2
        ) {
          return { type: "image", key: "picture", x: cx, y: cy };
        }
      }

      return null;
    };

    const onMouseDown = (e) => {
      const pt = getMouse(e);
      const pick = hitTest(pt);
      if (pick) {
        stateRef.current.draggingKey = pick.key;
        stateRef.current.offsetX =
          pick.key === "picture"
            ? pt.x - (data.picture.x ?? width / 2)
            : pt.x - (data.elements?.[pick.key]?.x ?? pick.x);
        stateRef.current.offsetY =
          pick.key === "picture"
            ? pt.y - (data.picture.y ?? height / 2)
            : pt.y - (data.elements?.[pick.key]?.y ?? pick.y);
        e.preventDefault();
      }
    };

    const onMouseMove = (e) => {
      const dragging = stateRef.current.draggingKey;
      if (!dragging) return;
      const pt = getMouse(e);

      if (dragging === "picture") {
        onChange?.({
          picture: {
            ...data.picture,
            x: pt.x - stateRef.current.offsetX,
            y: pt.y - stateRef.current.offsetY,
          },
        });
      } else {
        onChange?.({
          elements: {
            ...data.elements,
            [dragging]: {
              ...(data.elements?.[dragging] || {}),
              x: pt.x - stateRef.current.offsetX,
              y: pt.y - stateRef.current.offsetY,
            },
          },
        });
      }
    };

    const onMouseUp = () => {
      stateRef.current.draggingKey = null;
    };

    const onWheel = (e) => {
      if (!data.picture?.src) return;
      const next = (data.picture.scale ?? 1) + e.deltaY * -0.001;
      const clamped = Math.max(0.1, Math.min(3, next));
      onChange?.({ picture: { ...data.picture, scale: clamped } });
      e.preventDefault();
    };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("wheel", onWheel);
    };
  }, [data, onChange, width, height]);

  return (
    <div className="flex justify-center mt-4">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border rounded shadow-md bg-white"
      />
    </div>
  );
}

// 文本自动换行
function wrapLines(ctx, text, maxWidth) {
  const raw = (text || "").split("\n");
  const out = [];
  for (const line of raw) {
    const words = line.split(" ");
    let cur = words[0] || "";
    for (let i = 1; i < words.length; i++) {
      const test = cur + " " + words[i];
      if (ctx.measureText(test).width > maxWidth) {
        out.push(cur);
        cur = words[i];
      } else {
        cur = test;
      }
    }
    out.push(cur);
  }
  return out;
}
