

export const PostService = async (data, token) => {


    let requst = await fetch('http://127.0.0.1:5000/gym-items', {
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

