import { useEffect, useState } from "react";

export default function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/books`)
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <div>
      <h1>Books</h1>
      {books.map((b: any) => (
        <p key={b.id}>{b.name}</p>
      ))}
    </div>
  );
}
