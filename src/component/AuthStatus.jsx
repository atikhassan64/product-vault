"use client";

import { useSession } from "next-auth/react";

export default function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <div className="loading loading-spinner loading-xs"></div>
        <span>Loading...</span>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span>Signed in as {session.user.name || session.user.email}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
      <span>Not signed in</span>
    </div>
  );
}