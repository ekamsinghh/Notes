export const BASE_URL = "https://notes-production-e0fa.up.railway.app/api";

export const API_PATHS = {
    LOGIN: `${BASE_URL}/login`,
    REGISTER: `${BASE_URL}/register`,
    VERIFY_OTP: `${BASE_URL}/verify-otp`,
    CREATE_NOTE: `${BASE_URL}/notes/create`,
    UPDATE_NOTE: (id: string) => `${BASE_URL}/notes/${id}`,
    DELETE_NOTE: (id: string) => `${BASE_URL}/notes/${id}`,
    GET_NOTES_BY_USER: (userId: string) => `${BASE_URL}/notes/user/${userId}`,
    GET_USER: (id:string) =>`${BASE_URL}/auth/me/${id}`
}