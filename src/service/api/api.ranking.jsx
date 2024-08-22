import client from "../client";

export const getRanking = async () => {
  try {
    const res = await client.get("users/ranking");
    return res.data;
  } catch (err) {
    throw err;
  }
};