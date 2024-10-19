import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3333',
});

async function doGet(url: string, token?: string) {
  try {
    const response = await apiClient.get(url, { headers: { Authorization: token } });

    return response.data;
  } catch (error) {
    console.log(error);
    return { success: false, msg: 'Erro do get' };
  }
}

async function doPost(url: string, token?: string, data) {
  try {
    const response = await apiClient.post(url, data, { headers: { Authorization: token } });

    return response.data;
  } catch (error) {
    console.log(error);
    return { success: false, msg: 'Erro do post' };
  }
}

async function doPut(url: string, token?: string, data) {
  try {
    const response = await apiClient.put(url, data, { headers: { Authorization: token } });

    return response.data;
  } catch (error) {
    console.log(error);
    return { success: false, msg: 'Erro do put' };
  }
}

export { doGet, doPost, doPut };
