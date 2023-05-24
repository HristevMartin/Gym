

export const PostService = async (data, token) => {

    const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";
    console.log('show me the data in post service', data)
    let requst = await fetch(`${BASE_URL}/gym-items`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        body: data
    });
    if (requst.status === 201) {
        return true;
    }else{
        return false
    }
}

export default PostService;

