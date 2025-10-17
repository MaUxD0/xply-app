import { useState } from "react";
import BottomNav from "../components/BottomNav";
import PopularGames from "../components/PopularGames";
import PostCard from "../components/PostCard";


import postsData from "../data/posts.json";

export default function Feed() {
  
  const [posts] = useState(postsData);

  const handleNavigate = (page: string) => {
    if (page === "home") {
      window.location.href = "/feed";
    } else if (page === "camera") {
      window.location.href = "/create";
    } else if (page === "profile") {
      window.location.href = "/profile";
    }
  };

  const handlePostClick = (id: number) => {
    window.location.href = `/post/${id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#090619] to-[#702A4C] text-white font-sans">
      {/* HEADER */}
      <header className="px-6 pt-6">
        <h1 className="font-['Anurati'] text-2xl tracking-widest mb-6">
          XPLY
        </h1>

        {/* POPULAR GAMES */}
        <section className="mt-4 mb-8">
          <PopularGames />
        </section>
      </header>

      {/* POSTS */}
      <main className="mt-8 space-y-10 px-4 pb-24">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            username={post.username}
            avatar={post.avatar}
            caption={post.caption}
            likes={post.likes}
            images={post.images}
            onPostClick={handlePostClick}
          />
        ))}
      </main>

      <BottomNav onNavigate={handleNavigate} />
    </div>
  );
}
