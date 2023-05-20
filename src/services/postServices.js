

export const PostService = async (data, token) => {

    const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

    let requst = await fetch(`${BASE_URL}/gym-items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    if (requst.status === 201){
        return true;
    }
}

export default PostService;

