import { db } from "@/lib/db";

export const getRecommended = async () => {
  // For testing recommended skeleton
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};
