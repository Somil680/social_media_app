import { API_BASE_URL } from "./constant";

/** POST REGISTER NEW USER api/user/signup */
export const registerNewUser = async (data :any) => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
    return { res: res, err: null }
  } catch (error) {
    return { err: error, res: null }
  }
}


// GET ALL POST OF ALL USER api/post/
export const getAllPost = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/post/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    return { res: res, err: null }
  } catch (error) {
    return { err: error, res: null }
  }
}