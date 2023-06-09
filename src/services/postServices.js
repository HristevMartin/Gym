

export const PostService = async (data, token) => {

    const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";
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
        return alert('Please verify the image field')
        
    }
}

export default PostService;

