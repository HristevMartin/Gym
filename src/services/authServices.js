export const register = async (email, password) => {

    const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

    let body = { email, password }


    console.log('BASE URL for register is ', BASE_URL)

    const request = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })

    console.log('show resp', request)

    if (request.status === 400) {
        alert('Email already exists!')
        throw new Error('Email already exists!, Please try again logging in.');
    }
    if (!request.ok) {
        // raise an error
        const error = await request.json();
        alert(error.message)
        throw new Error(error.message);
    }


    if (request.status === 201) {
        console.log('been here')

    }
}



export const loginToServer = async (email, password) => {

    const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://gym-pro-website.herokuapp.com";

    console.log('show me the base url', BASE_URL)

    const request = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })



    console.log('show resp', request)

    if (!request.ok) {
        alert('Invalid credentials')
        return false;
    } else if (request.status === 400) {
        alert('Invalid credentials')
        return false
        
    }

    if (request.status === 200){
        const resp = await request.json();
        console.log('show me the resp', resp)
        return resp;
    }

        
}


export default register;
