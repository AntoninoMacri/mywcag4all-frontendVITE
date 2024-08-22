import client from "../client";

export const getWebsites = async (userId) => {
  try {
    const res = await client.get(`websites/user/${userId}`);
    console.log("getWebsites", res)
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getWebsite = async (websiteId) => {
  try {
    const res = await client.get(`websites/${websiteId}`)
    return res.data[0];
  } catch (err) {
    throw err;
  }
};

export const postUpdateWebsite = async (websiteId, website) => {
  try {
    const res = await client.patch(`websites/${websiteId}`, website)
    return res.data;
  } catch (err) {
    throw err;
  }
}

export const postUpdateWebsiteTests = async (websiteId, tests) => {
  try {
    await client.put(`websites/${websiteId}/tests`, tests)
    const results = await client.get(`websites/${websiteId}/results`)
    return results.data;
  } catch (err) {
    throw err;
  }
}

export const postUpdateWebsiteSections = async (websiteId, sections) => {
  try {
    await client.put(`websites/${websiteId}/sections`, sections)
    const results = await client.get(`websites/${websiteId}/results`)
    return results.data;
  } catch (err) {
    throw err;
  }
}

export const postCreateWebsite = async (website) => {
  try {
    const res = await client.post(`websites`, website)
    return res.data;
  } catch (err) {
    throw err;
  }
}

export const postDeleteWebsite = async (websiteId) => {
  try {
    const res = await client.delete(`websites/${websiteId}`)
    return res.data;
  } catch (err) {
    throw err;
  }
}

export const getWebsiteResults = async (websiteId) => {
  try {
    const res = await client.get(`websites/${websiteId}/results`)
    return res.data;
  } catch (err) {
    throw err;
  }
}

export const postUpdateSectionsFromTests = async (websiteId) => {
  try {
    const res = await client.put(`websites/${websiteId}/sections`)
    return res.data;
  } catch (err) {
    throw err;
  }
}