import { useEffect, useRef } from "react";

function Canvas({ title, color, image, onRender }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制背景色
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制图片（如果有上传）
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        // 保持比例缩放填充画布
        const scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = canvas.width / 2 - (img.width / 2) * scale;
        const y = canvas.height / 2 - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        drawText();
      };
    } else {
      drawText();
    }

    // 绘制文字函数
    function drawText() {
      ctx.fillStyle = color || "black";
      ctx.font = "bold 36px Arial";
      ctx.textAlign = "center";
      ctx.fillText(
        title || "Your Poster",
        canvas.width / 2,
        canvas.height - 60
      );

      // 导出 base64 图片并回传给父组件
      const dataURL = canvas.toDataURL("image/png");
      if (onRender) onRender(dataURL);
    }
  }, [title, color, image]); // 当任意输入变化时重新绘制

  return (
    <div className="flex justify-center mt-4">
      <canvas
        ref={canvasRef}
        width={400}
        height={500}
        className="border rounded shadow-md"
      />
    </div>
  );
}

export default Canvas;
