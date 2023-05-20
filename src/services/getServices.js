export const getGymItems = async () => {

    const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

    const request = await fetch(`${BASE_URL}/all-gym-items`);
    const response = await request.json();
    return response
}

export default getGymItems;

export const getSingleItem = async (token) => {

    const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

    const resp = await fetch(`${BASE_URL}/get-user-item`, {
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
  

