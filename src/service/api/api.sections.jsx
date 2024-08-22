import client from "../client";

export const getSections= async () => {
  try {
    const res = await client.get("sections");
    return res.data;
  } catch (err) {
    throw err;
  }
};