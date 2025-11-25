import { useParams } from "react-router-dom";
import { API } from "../api";
import { useEffect, useState } from "react";

export default function Story() {
  const { slug } = useParams();
  const [story, setStory] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    API.get(`/stories/${slug}`).then((res) => setStory(res.data));
    API.get(`/stories/${slug}/chapters`).then((res) =>
      setChapters(res.data.chapters)
    );
  }, [slug]);

  if (!story) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{story.title}</h1>
      <p className="text-gray-700 mt-2">{story.description}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Chapters</h2>
      <ul className="space-y-1">
        {chapters.map((ch) => (
          <li key={ch._id}>
            <a
              href={`/story/${story.slug}/chapter/${ch.number}`}
              className="text-blue-600"
            >
              Chapter {ch.number}: {ch.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
