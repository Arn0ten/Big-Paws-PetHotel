export interface LoginFormDTO {
    phoneNumber: string;
    email: string;
    password: string;
}

export interface RegisterFormDTO {
    email: string;
    phoneNumber: string;
    fullName: string;
    streetAddress: string;
    cityAddress: string;
    stateAddress: string;
    emergencyPhoneNumber: string;

}

export interface LoginFormResponse extends BaseApiResponse {
    data: string;
}
