import React, { useEffect, useState } from "react";
import { AuthContext } from "context";
import type { User } from "types";
import { auth, db } from "../firebase";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
	onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			if (firebaseUser) {
				// Create basic user object first
				const basicUser: User = {
					id: firebaseUser.uid,
					email: firebaseUser.email,
					emailVerified: firebaseUser.emailVerified,
					isAnonymous: firebaseUser.isAnonymous ?? false,
					createdAt: firebaseUser.metadata.creationTime ?? null,
					lastLoginAt: firebaseUser.metadata.lastSignInTime ?? null,
					displayName: firebaseUser.displayName || null,
					phoneNumber: null,
				};

				try {
					// Try to get additional user profile data from Firestore
					const userDocRef = doc(db, "users", firebaseUser.uid);
					const userDoc = await getDoc(userDocRef);
					
					if (userDoc.exists()) {
						const userData = userDoc.data();
						basicUser.displayName = userData?.displayName || basicUser.displayName;
						basicUser.phoneNumber = userData?.phoneNumber || null;
					}
				} catch (error) {
					console.warn("Could not fetch user profile from Firestore:", error);
					console.warn("Using basic auth data only. Please check Firestore security rules.");
					// Continue with basic user data
				}

				setUser(basicUser);
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

	const signup = async (email: string, password: string, displayName: string, phoneNumber?: string) => {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		
		try {
			// Create user profile in Firestore
			await setDoc(doc(db, "users", userCredential.user.uid), {
				displayName,
				phoneNumber: phoneNumber || null,
				email,
				createdAt: new Date().toISOString(),
			});
		} catch (error) {
			console.error("Error creating user profile in Firestore:", error);
			console.warn("User authenticated but profile not saved. Please check if Firestore is blocked by ad blockers.");
			// Don't throw - user is still authenticated even if profile creation fails
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, loading, login, logout, forgotPassword, signup }}
		>
			{children}
		</AuthContext.Provider>
	);
};
