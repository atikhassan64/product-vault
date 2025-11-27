"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPage() {
  const params = useParams();
  const { id } = params;

  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/event/${id}`)
      .then(res => res.json())
      .then(data => setItem(data));
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div className="max-w-[800px] mx-auto py-10">
        Home page 
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
      <img src={item.thumbnailImage} alt={item.title} className="mb-4" />
      <p>{item.eventDescription}</p>
    </div>
  );
}
