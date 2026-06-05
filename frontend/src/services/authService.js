import API from "./api"
export let loginUser = async (email, password) => {

    let response = await API.post(
        "/auth/login",
        {
            email,
            password,
        }
    );

    return response.data;
};

export let registerUser = async (
    name,
    email,
    password
) => {

    let response = await API.post(
        "/auth/register",
        {
            name,
            email,
            password,
        }
    );

    return response.data;
};