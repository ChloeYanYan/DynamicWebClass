const PosterCard = ({ poster, onEdit, onDelete }) => {
  return (
    <div className="bg-blue-600 p-3 rounded shadow">
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
        {poster.subtitle && <p className="text-sm">{poster.subtitle}</p>}
      </div>

      <div className="flex gap-2 mt-3">
        <button
          className="px-3 py-1 rounded border"
          onClick={() => onDelete?.(poster.id)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 rounded border text-red-500"
          onClick={() => onDelet?.(poster.id)}
        >
          Delete
        </button>
        {poster.link && (
          <a
            className="ml-auto px-3 py-1 rounded border"
            gref={poster.link}
            target="_blank"
            rel="nonreferrer"
          >
            Open Link
          </a>
        )}
      </div>
    </div>
  );
};

export default PosterCard;
