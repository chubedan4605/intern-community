import React from "react";
import { Clock, Eye, Share } from "lucide-react";
import Image from "next/image";
import { db } from "@/lib/db";

// const topTen = [
//   {
//     id: 1,
//     rank: "1st",
//     name: "Lorem Ipsum",
//     role: "Lorem",
//     badge: "Contributor",
//     avatar: "https://i.pravatar.cc/150?img=11",
//   },
//   {
//     id: 2,
//     rank: "2nd",
//     name: "Lorem Ipsum",
//     role: "Lorem",
//     badge: "Contributor",
//     avatar: "https://i.pravatar.cc/150?img=32",
//   },
//   {
//     id: 3,
//     rank: "3rd",
//     name: "Lorem Ipsum",
//     role: "Lorem",
//     badge: "Contributor",
//     avatar: "https://i.pravatar.cc/150?img=68",
//   },
// ];

// Find top 10 contributors based on number of module submissions approved.
const topTen = await db.miniApp
  .groupBy({
    by: ["authorId"],
    where: { status: "APPROVED" },
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: 10,
  })
  .then((groups) => {
    // Fetch user details for each top contributor
    return Promise.all(
      groups.map(async (group, index) => {
        const user = await db.user.findUnique({
          where: { id: group.authorId },
        });
        return {
          id: group.authorId,
          rank: `${index + 1}${index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"}`,
          name: user?.name || "Unknown",
          role: "Contributor",
          badge: "Contributor",
          avatar:
            user?.image ||
            `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`,
        };
      }),
    );
  });

//   const topTen = await db.$queryRaw`
//   SELECT u.id, u.name, u.image as avatar, COUNT(m.id) as contributions
//     FROM User u
//     JOIN MiniApp m ON m.authorId = u.id 
//     WHERE m.status = 'APPROVED'
//     GROUP BY u.id
//     ORDER BY contributions DESC
//     LIMIT 10
// `;


const otherContributors = [
  {
    id: 4,
    percent: "48%",
    name: "Lorem Ipsum",
    role: "Lorem",
    contributions: "413 contribution",
    avatar: "https://i.pravatar.cc/150?img=53",
  },
  {
    id: 5,
    percent: "48%",
    name: "Lorem Ipsum",
    role: "Lorem",
    contributions: "413 contribution",
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 6,
    percent: "48%",
    name: "Lorem Ipsum",
    role: "Lorem",
    contributions: "413 contribution",
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 7,
    percent: "48%",
    name: "Lorem Ipsum",
    role: "Lorem",
    contributions: "413 contribution",
    avatar: "https://i.pravatar.cc/150?img=33",
  },
];

export default function Leaderboard() {

console.log("Rendering leaderboard with topTen:", topTen);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-center text-gray-900 mb-12">
          Top Contributors
        </h1>

        {/* Top 10 Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {topTen.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col items-center pt-8"
            >
              {/* Avatar & Rank Badge */}
              <div className="relative mb-4">
                <Image
                  width={96}
                  height={96}
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-sm"
                />
                <div className="absolute bottom-0 -right-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-white">
                  {user.rank}
                </div>
              </div>

              {/* User Info */}
              <h3 className="text-lg font-medium text-gray-800">{user.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{user.role}</p>

              <span className="bg-[#eef8f9] text-[#4db6ac] px-6 py-1.5 rounded-full text-sm font-medium mb-6">
                {user.badge}
              </span>

              {/* Bottom Stats */}
              <div className="w-full grid grid-cols-3 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-center gap-2 py-4 border-r border-gray-100">
                  <Clock className="w-4 h-4 text-slate-700" />
                  <span className="font-bold text-slate-800 text-sm">120</span>
                </div>
                <div className="flex items-center justify-center gap-2 py-4 border-r border-gray-100">
                  <Eye className="w-4 h-4 text-slate-700" />
                  <span className="font-bold text-slate-800 text-sm">307</span>
                </div>
                <div className="flex items-center justify-center gap-2 py-4">
                  <Share className="w-4 h-4 text-slate-700" />
                  <span className="font-bold text-slate-800 text-sm">138</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* List Section */}
        <div className="flex flex-col gap-3">
          {otherContributors.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                {/* Percentage */}
                <span className="text-gray-500 font-medium w-12 text-right">
                  {user.percent}
                </span>

                {/* Avatar & Name */}
                <div className="flex items-center gap-4">
                  <Image
                    width={96}
                    height={96}
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-base font-medium text-gray-800">
                      {user.name}
                    </h4>
                    <p className="text-sm text-gray-400">{user.role}</p>
                  </div>
                </div>
              </div>

              {/* Right Badge */}
              <span className="bg-[#eef8f9] text-[#4db6ac] px-6 py-2 rounded-full text-sm font-medium">
                {user.contributions}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
