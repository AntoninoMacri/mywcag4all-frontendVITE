import client from "../client";

export const getLicenses= async () => {
  try {
    const res = await client.get("licenses");
    return res.data;
  } catch (err) {
    throw err;
  }
};