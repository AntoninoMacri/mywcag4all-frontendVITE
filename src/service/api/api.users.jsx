import client from "../client";

export const deleteUser = async (id) => {
  try {
    const res = await client.delete("user", id);
    return res;
  } catch (err) {
    throw err;
  }
};