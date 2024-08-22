import client from "../client";

// Funzione per eseguire il login
export const postLogin = async (email, password) => {
  try {
    console.log("postLogin email", email); // Debugging
    const response = await client.post("/auth/login", { email, password });
    console.log("postLogin response", response); // Debugging
    return response.data;
  } catch (err) {
    console.error("Errore in api.auth (postLogin)", err);
    throw err;
  }
};

// Funzione per registrare un nuovo utente
export const postRegister = async (formData) => {
  try {
    console.log("postRegister formData", formData); // Debugging
    const response = await client.post("/auth/register", formData);
    console.log("postRegister response", response); // Debugging
    return response.data;
  } catch (err) {
    console.error("Errore in api.auth (postRegister)", err);
    throw err;
  }
};

// Funzione per cambiare la password
export const patchChangePassword = async (email, newPassword) => {
  try {
    console.log("patchChangePassword email", email); // Debugging
    console.log("patchChangePassword password", newPassword); // Debugging
    const response = await client.patch("/auth/change_password", { email, newPassword });
    console.log("patchChangePassword response", response); // Debugging
    return response.data;
  } catch (err) {
    console.error("Errore in api.auth (patchChangePassword)", err);
    throw err;
  }
};

// Funzione per eliminare l'account dell'utente
export const deleteAccount = async (email, password) => {
  try {
    console.log("deleteAccount email", email); // Debugging
    const response = await client.delete("/auth/delete_account", { data: { email, password } });
    console.log("deleteAccount response", response); // Debugging
    return response.data;
  } catch (err) {
    console.error("Errore in api.auth (deleteAccount)", err);
    throw err;
  }
};
