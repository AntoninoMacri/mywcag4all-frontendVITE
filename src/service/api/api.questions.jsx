import client from "../client";

// Funzione per ottenere tutte le domande
export const getQuestions = async () => {
  try {
    const res = await client.get("questions");
    console.log("API response questions:", res); // Log della risposta dell'API
    return res.data;
  } catch (err) {
    console.error("Error fetching questions:", err);
    throw err;
  }
};

// Funzione per ottenere una domanda specifica per ID
export const getQuestionById = async (id) => {
  try {
    const res = await client.get(`questions/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Funzione per creare una nuova domanda
export const createQuestion = async (questionData) => {
  try {
    const res = await client.post(`questions`, questionData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Funzione per aggiornare una domanda esistente
export const updateQuestion = async (id, questionData) => {
  try {
    const res = await client.patch(`questions/${id}`, questionData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// Funzione per eliminare una domanda
export const deleteQuestion = async (id) => {
  try {
    const res = await client.delete(`questions/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
