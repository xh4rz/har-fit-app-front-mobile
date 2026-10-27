import { Gender } from './gender';

export interface User {
	id: string;
	username: string;
	fullname: string;
	email: string;
	isActive: boolean;
	roles: string[];
	description?: string | null;
	gender?: Gender | null;
	birthDate?: string | null;
	imageUrl?: string | null;
}

export interface UserRequest {
	username: string;
	fullname: string;
	email: string;
	description?: string | null;
	gender?: Gender | null;
	birthDate?: string | null;
}
