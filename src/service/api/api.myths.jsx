import client from "../client";

export const getMyths = async () => {
  try {
    const res = await client.get("myths");
    //console.log("API response:", res); // Log della risposta dell'API
    return res.data;
  } catch (err) {
    console.error("Error fetching myths:", err);
    throw err;
  }
};
