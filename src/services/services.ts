import { API_BASE_URL } from "./constant";

/** POST UPLOAD IMAGE api/uploadImage */
export const postUploadImage = async (data :FormData) => {
  try {
    const res = await fetch(`${API_BASE_URL}/uploadFile`, {
      method: 'POST',
      body: data,
      // headers: { 'Content-Type': 'application/json' },
       headers: { },
    })
    return { res: res, err: null }
  } catch (error) {
    return { err: error, res: null }
  }
}
/** POST REGISTER NEW USER api/user/signup */
export const registerNewUser = async (data :any) => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
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

//  GET ALL USER api/user
export const getAllUser = async () => {
  try {
      const res = await fetch(`${API_BASE_URL}/user/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    return { res: res, err: null }
  } catch (error) {
        return { err: error, res: null }

    }

}
// GET USER BY ID 
export const getUserById = async (id :any) => {
  try {
      const res = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    return { res: res, err: null }
  } catch (error) {
        return { err: error, res: null }

    }

}
 
//  POST SENDING POST TO THE DATABASE api/post/
export const sendingPost = async (data :any) => {
  try {
    const res = await fetch(`${API_BASE_URL}/post/`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    })
    return { res: res, err: null }
  } catch (error) {
    return { err: error, res: null }
  }
}

// UPDATE USER DETAILS OF THAT USER
export const updateUserDetails = async (inputData :any , id : any) => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(inputData),
      headers: { 'Content-Type': 'application/json' },
    })
    return { res: res, err: null }
  } catch (error) {
    return { err: error, res: null }
  }
}
// PUT REQUEST TO FOLLOW THE USER 
export const putFollowTheUser = async (inputData :any , id : any) => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/${id}/follow`, {
      method: 'PUT',
      body: JSON.stringify(inputData),
      headers: { 'Content-Type': 'application/json' },
    })
    return { res: res, err: null }
  } catch (error) {
    return { err: error, res: null }
  }
}
// PUT REQUEST TO UNFOLLOW THE USER 
export const putUnFollowTheUser = async (inputData :any , id : any) => {
  try {
    const res = await fetch(`${API_BASE_URL}/user/${id}/unfollow`, {
      method: 'PUT',
      body: JSON.stringify(inputData),
      headers: { 'Content-Type': 'application/json' },
    })
    return { res: res, err: null }
  } catch (error) {
    return { err: error, res: null }
  }
}
// PUT REQUEST TO LIKE THE POST 
export const putLikeThePost = async (inputData :any , id : any) => {
  try {
    const res = await fetch(`${API_BASE_URL}/post/${id}`, {
      method: 'PUT',
      body: JSON.stringify(inputData),
      headers: { 'Content-Type': 'application/json' },
    })
    return { res: res, err: null }
  } catch (error) {
    return { err: error, res: null }
  }
}
// PUT REQUEST TO Save THE POST 

export const putSavedThePost = async (inputData :any , id : any) => {
  try {
    const res = await fetch(`${API_BASE_URL}/post/bookmark/${id}`, {
      method: 'PUT',
      body: JSON.stringify(inputData),
      headers: { 'Content-Type': 'application/json' },
    })
    return { res: res, err: null }
  } catch (error) {
    return { err: error, res: null }
  }
}
// PUT REQUEST TO Un Save THE POST 

export const putUnSavedThePost = async (inputData :any , id : any) => {
  try {
    const res = await fetch(`${API_BASE_URL}/post/removebookmark/${id}`, {
      method: 'PUT',
      body: JSON.stringify(inputData),
      headers: { 'Content-Type': 'application/json' },
    })
    return { res: res, err: null }
  } catch (error) {
    return { err: error, res: null }
  }
}
