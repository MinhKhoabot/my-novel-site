import { useState } from "react";
import { API } from "../api";

export default function Admin() {
  const [story, setStory] = useState({
    title: "",
    slug: "",
    description: "",
    tags: "",
  });

  const [chapter, setChapter] = useState({
    storyId: "",
    number: "",
    title: "",
    content: "",
  });

  const ADMIN_SECRET = "123456"; // phải trùng .env backend

  async function handleCreateStory() {
    try {
      const res = await API.post(
        "/admin/stories",
        {
          ...story,
          tags: story.tags.split(",").map((t) => t.trim()),
        },
        {
          headers: { "x-admin-secret": ADMIN_SECRET },
        }
      );
      alert("Tạo truyện thành công!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Lỗi tạo truyện!");
    }
  }

  async function handleCreateChapter() {
    try {
      const res = await API.post(
        `/admin/stories/${chapter.storyId}/chapters`,
        {
          number: Number(chapter.number),
          title: chapter.title,
          content: chapter.content,
        },
        {
          headers: { "x-admin-secret": ADMIN_SECRET },
        }
      );
      alert("Tạo chương thành công!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Lỗi tạo chương!");
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      {/* FORM TẠO TRUYỆN */}
      <div className="border p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-bold mb-3">Tạo truyện mới</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="Tên truyện"
          onChange={(e) => setStory({ ...story, title: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Slug (vd: co-vo-be-nho)"
          onChange={(e) => setStory({ ...story, slug: e.target.value })}
        />

        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Mô tả truyện"
          onChange={(e) =>
            setStory({ ...story, description: e.target.value })
          }
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Tags (vd: ngôn tình, hiện đại)"
          onChange={(e) => setStory({ ...story, tags: e.target.value })}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleCreateStory}
        >
          Tạo truyện
        </button>
      </div>

      {/* FORM TẠO CHƯƠNG */}
      <div className="border p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-3">Thêm chương</h2>

        <input
          className="border p-2 w-full mb-2"
          placeholder="ID truyện"
          onChange={(e) =>
            setChapter({ ...chapter, storyId: e.target.value })
          }
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Số chương"
          onChange={(e) => setChapter({ ...chapter, number: e.target.value })}
        />

        <input
          className="border p-2 w-full mb-2"
          placeholder="Tên chương"
          onChange={(e) => setChapter({ ...chapter, title: e.target.value })}
        />

        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Nội dung chương"
          rows={8}
          onChange={(e) =>
            setChapter({ ...chapter, content: e.target.value })
          }
        />

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleCreateChapter}
        >
          Tạo chương
        </button>
      </div>
    </div>
  );
}
