function Community({ posters }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {posters.map((poster, i) => (
        <div key={i} className="bg-white p-4 shadow-md rounded">
          {poster.image && (
            <img
              src={poster.image}
              alt="Poster"
              className="w-full h-40 object-cover mb-2"
            />
          )}
          <h2 style={{ color: poster.color }}>{poster.title}</h2>
        </div>
      ))}
    </div>
  );
}

export default Community;
