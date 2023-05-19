export const getGymItems = async () => {
    const request = await fetch('http://127.0.0.1:5000/all-gym-items');
    const response = await request.json();
    return response
}

export default getGymItems;

export const getSingleItem = async (token) => {
    const resp = await fetch("http://127.0.0.1:5000/get-user-item", {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    if (resp.status === 200){
        const response = await resp.json();
        return response
    }else{
        return null
    }
}
  

