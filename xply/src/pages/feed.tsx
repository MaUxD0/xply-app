
import { useState } from "react";
import BottomNav from "../components/BottomNav";
import PopularGames from "../components/PopularGames";
import PostCard from "../components/PostCard";

const postsData = [
  {
    id: 1,
    username: "IGN Entertainment",
    avatar: "https://i.pravatar.cc/100?img=5",
    caption:
      "HOLLOW KNIGHT: SILKSONG SHATTERS RECORDS WITH AN ESTIMATED 5 MILLION PLAYERS IN ITS FIRST 3 DAYS",
    likes: 1400,
    images: [
      "https://pbs.twimg.com/media/G0ZMO8RbgAUt2Jz.jpg:large",
      "https://sm.ign.com/t/ign_nordic/news/h/hollow-kni/hollow-knight-silksong-developer-responds-to-release-date-co_9trv.1200.jpg",
    ],
  },
  {
    id: 2,
    username: "James KJ.",
    avatar: "https://i.pravatar.cc/100?img=12",
    caption: "This play was amazing, comment what challen... more",
    likes: 12400,
    images: [
      "https://cdn.mos.cms.futurecdn.net/csQgknvLgV4P4ABbFSZdrE.jpg",
      "https://sm.ign.com/t/ign_za/video/f/fortnite-o/fortnite-official-fortnitemares-2025-cinematic-short-trailer_aed2.1280.jpg",
    ],
  },
  {
    id: 3,
    username: "RedeadPosting",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_O6cP5kd-KnFwJiY7RPh1cCq6z3LyKbAjlQ&s",
    caption: "The best game ever, Arthur you are a legend... more",
    likes: 9860,
    images: [
      "https://preview.redd.it/i-played-arthurs-last-mission-v0-hwygewohqhdd1.jpeg?auto=webp&s=0c3287619ba559cff1ac30d22d5dbf4bc2b2a364",
    ],
  },
];

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
