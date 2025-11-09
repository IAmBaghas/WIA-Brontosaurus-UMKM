"use client";

import dynamic from "next/dynamic";

// dynamically import the real map — only runs in the browser
const SafeUMKMMap = dynamic(() => import("./MapContent"), {
  ssr: false, 
  loading: () => (
    <div className="w-full max-w-5xl mx-auto my-10 h-[500px] flex items-center justify-center rounded-lg bg-gray-100 text-gray-500">
      Loading map...
    </div>
  ),
});

export default function UMKMMap() {
  return <SafeUMKMMap />;
}
