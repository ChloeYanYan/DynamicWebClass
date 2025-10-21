import PosterCard from "./PosterCard";

export default function Community({ posters, onEdit, onDelete }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-3">Community Posters</h2>
      {posters.length === 0 ? (
        <p className="text-gray-500">No posters yet. Create one above! 🎉</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posters.map((p) => (
            <PosterCard
              key={p.id || p.image}
              poster={p}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
