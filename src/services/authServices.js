
export const register = async (email, password, addNotification) => {

    const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

    let body = { email, password }

    const request = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })



    if (request.status === 400) {
        console.log('been here')
        addNotification('Check the fields and try again!', 'danger')
    }else if(request.status === 401){
        addNotification('Email already exists! Please log in!', 'danger')
    }
    if (!request.ok) {
        const error = await request.json();
        alert(error.message)
        throw new Error(error.message);
    }


    if (request.status === 201) {
        addNotification('Registered successfully!', 'success')
    }
}


export const loginToServer = async (email, password) => {

    const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

    const request = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })


    if (!request.ok) {
        return false;
    } else if (request.status === 400) {
        return false
    }

    if (request.status === 200){
        const resp = await request.json();
        console.log('resp is ', resp);
        return resp;
    }

        
}


export default register;
