import client from "../client";

export const getTools = async () => {
  try {
    const res = await client.get("tools");
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getToolsClasses = async () => {
  try {
    const res = await client.get("tool-classes");
    return res.data;
  } catch (err) {
    throw err;
  }
};