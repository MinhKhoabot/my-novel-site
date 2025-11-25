import { useParams } from "react-router-dom";
import { API } from "../api";
import { useEffect, useState } from "react";

export default function Chapter() {
  const { slug, number } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/stories/${slug}/chapters/${number}`).then((res) =>
      setData(res.data)
    );
  }, [slug, number]);

  if (!data) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{data.chapter.title}</h1>
      <div className="whitespace-pre-wrap leading-8 text-lg">
        {data.chapter.content}
      </div>
    </div>
  );
}
