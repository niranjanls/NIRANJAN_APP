import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(`/api/movies/${id}`);
      const data = await res.json();
      setMovie(data);
    }
    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  const localizedDate = new Date(movie.release_date).toLocaleDateString();

  return (
    <div style={{ padding: "20px" }}>
      <h1>{movie.title}</h1>
      <p><strong>Tagline:</strong> {movie.tagline || "N/A"}</p>
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Release Date:</strong> {localizedDate}</p>
      <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
      <p><strong>Vote Average:</strong> {movie.vote_average} / 10</p>
      <p><strong>Status:</strong> {movie.status}</p>
      <p><strong>Vote Count:</strong> {movie.vote_count}</p>
      <br />
      <Link to="/">← Back to movie list</Link>
    </div>
  );
}

export default MovieDetail;
