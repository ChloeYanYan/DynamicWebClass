export default function PosterCard({ poster, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded shadow p-3">
      {poster.link ? (
        <a href={poster.link} target="_blank" rel="noreferrer">
          <img
            src={poster.image}
            alt={poster.title || "Poster"}
            className="w-full h-48 object-cover rounded"
          />
        </a>
      ) : (
        <img
          src={poster.image}
          alt={poster.title || "Poster"}
          className="w-full h-48 object-cover rounded"
        />
      )}

      <div className="mt-2">
        <h3
          className="font-semibold"
          style={{ color: poster.titleColor || "#111" }}
        >
          {poster.title || "Untitled"}
        </h3>
        {poster.subtitle && (
          <p
            className="text-sm"
            style={{ color: poster.subtitleColor || "#444" }}
          >
            {poster.subtitle}
          </p>
        )}
      </div>

      <div className="flex gap-2 mt-3">
        <button
          className="px-3 py-1 rounded border"
          onClick={() => onEdit?.(poster)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 rounded border text-red-600"
          onClick={() => onDelete?.(poster.id)}
        >
          Delete
        </button>
        {poster.link && (
          <a
            className="ml-auto px-3 py-1 rounded border"
            href={poster.link}
            target="_blank"
            rel="noreferrer"
          >
            Open Link
          </a>
        )}
      </div>
    </div>
  );
}
