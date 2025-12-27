import React, { useEffect, useState } from "react";
import { AuthContext } from "context";
import type { User } from "types";
import { auth } from "../firebase";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	onAuthStateChanged,
} from "firebase/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	console.log(auth);
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			if (firebaseUser) {
				const mappedUser: User = {
					id: firebaseUser.uid,
					isAnonymous: firebaseUser.isAnonymous ?? false,
				};
				setUser(mappedUser);
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const login = async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password);
	};

	const logout = async () => {
		await signOut(auth);
	};

	const forgotPassword = async (email: string) => {
		await sendPasswordResetEmail(auth, email);
	};

	const signup = async (email: string, password: string) => {
		await createUserWithEmailAndPassword(auth, email, password);
	};

	return (
		<AuthContext.Provider
			value={{ user, loading, login, logout, forgotPassword, signup }}
		>
			{children}
		</AuthContext.Provider>
	);
};
