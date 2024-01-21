"use server";

import { revalidatePath } from "next/cache";

import { followUser, unfollowUser } from "@/lib/follow-service";

// This is a server action
// Server Actions are asynchronous functions that are executed on the server and can be used on both client and server side
export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id);

    // revalidatePath allows you to purge cached data on-demand for a specific path.
    revalidatePath("/");

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`);
    }

    return followedUser;
  } catch (error) {
    throw new Error("Interal Error");
  }
};

export const onUnfollow = async (id: string) => {
  try {
    const unfollowedUser = await unfollowUser(id);

    revalidatePath("/");

    if (unfollowedUser) {
      revalidatePath(`/${unfollowedUser.following.username}`);
    }

    return unfollowedUser;
  } catch (error) {
    throw new Error("Internal Error");
  }
};
