import { User } from '..';

export interface AuthLoginRequest {
	email: string;
	password: string;
}
export interface AuthRegisterRequest {
	username: string;
	fullname: string;
	email: string;
	password: string;
}
export interface AuthResponse extends Token {
	user: User;
}

export interface Token {
	accessToken: string;
	refreshToken: string;
}
