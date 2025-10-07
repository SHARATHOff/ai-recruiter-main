
"use client";
import React from "react";
import dynamic from "next/dynamic";

const ParseResume = dynamic(
  () => import("./_components/ParseResume"),
  {
    ssr: false,
  }
);

const Page = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ATS Analyzer</h1>
      <ParseResume />
    </div>
  );
};

export default Page;
