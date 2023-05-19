export const register = async (email, password) => {
    let body = { email, password }
    console.log('show me the body', body);

    const request = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })

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

    const resp = await request.json();
    if (resp === 201) {
        console.log('been here', resp)
        return resp;
    }
}


export const loginToServer = async (email, password) => {

    const request = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })



    console.log('show resp', request)

    if (!request.ok) {
        // raise an error
        throw alert('Invalid credentials');
    } else if (request.status === 400) {
        alert('Invalid credentials')
        throw new Error('Verify your credentials');
    }

    const resp = await request.json();

    console.log('show resp', resp)

    if (resp.token) {

        return resp;
    }
}


export default register;
