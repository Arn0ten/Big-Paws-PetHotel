import {LoginFormDTO} from "@/types/loginFormDTO";

export const apiDomain = process.env.REACT_APP_DOMAIN ?? "https://api.bigpawspethotel.me";

export class LoginError extends Error {
    constructor(message: string, public response?: any) {
        super(message);
        this.name = 'LoginError';
    }
}

export async function loginWithEmail(
    email: string,
    password: string
): Promise<string> {
    const url = `${apiDomain}/api/v1/pet-owner/login/email`;

    const payload: LoginFormDTO = {
        email,
        phoneNumber: "",
        password,
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new LoginError('Login failed', errorData);
    }

    const result = await response.json();
    return result.data; // Adjust as per your API response
}


export async function loginWithPhoneNumber(
    phoneNumber: string,
    password: string
): Promise<string> {
    const url = `${apiDomain}/api/v1/pet-owner/login/phoneNumber`;

    const payload: LoginFormDTO = {
        email: "",
        phoneNumber,
        password,
    };

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new LoginError('Login failed', errorData);
    }

    const result = await response.json();
    return result.data; // Adjust as per your API response
}
