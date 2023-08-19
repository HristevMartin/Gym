export const getGymItems = async () => {

    const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

    const request = await fetch(`${BASE_URL}/all-gym-items`);
    const response = await request.json();

    console.log('show me if response is duplicated', response)

    return response
}

export const getSingleItemDashboard = async (itemId) => {
    const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

    const request = await fetch(`${BASE_URL}/single-gym-item/${itemId}`, {
        method: 'GET',
    })
    if (request.ok){
        const response = await request.json();
        return response
    }
}

// export { getSingleItemDashboard, getGymItems };


// export default getGymItems;

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
  

