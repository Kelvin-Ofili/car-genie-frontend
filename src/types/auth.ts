export type User = {
	id: string;
	email: string | null;
	emailVerified: boolean;
	isAnonymous: boolean;
	createdAt: string | null;
	lastLoginAt: string | null;
	displayName: string | null;
	phoneNumber: string | null;
};
