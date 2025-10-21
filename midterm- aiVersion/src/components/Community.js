import PosterCard from "./PosterCard";

const Community = ({ posters, onEdit, onDelete }) => {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Community Posters</h2>
      {posters.length === 0 ? (
        <p className="text-blue-600">No posters yet. Create one!</p>
      ) : (
        <div>
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
};

export default Community;