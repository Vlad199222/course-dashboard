"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonCard() {
  return (
    <div className="bg-slate-200 w-fit m-5 rounded-2xl p-4">
      <div className="rounded-2xl bg-white p-4 relative">
        <div className="flex items-center">
          <div className="relative rounded-xl  p-4">
            <Skeleton width={60} height={60} />
          </div>
          <div>
            <Skeleton width={100} height={20} />

            <Skeleton width={60} height={14} />
          </div>
        </div>
        <div className="flex flex-col justify-start">
          <Skeleton width={80} height={28} />

          <div className="flex items-center text-sm text-green-500">
            <Skeleton width={70} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
