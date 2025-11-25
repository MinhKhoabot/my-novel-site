import { useEffect, useState } from "react";
import { API } from "../api";

export default function Home() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    API.get("/stories").then((res) => setStories(res.data));
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stories.map((story) => (
        <a
          key={story._id}
          href={`/story/${story.slug}`}
          className="border p-4 rounded-lg shadow hover:bg-gray-50"
        >
          <h2 className="font-bold text-lg">{story.title}</h2>
          <p className="text-sm text-gray-700 mt-1 line-clamp-2">
            {story.description}
          </p>
        </a>
      ))}
    </div>
  );
}
