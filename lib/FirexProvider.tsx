/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
	getAuth,
	Auth,
	signInWithPopup,
	onAuthStateChanged,
	AuthProvider as FirebaseAuthProvider,
} from "firebase/auth";
import { User as FirebaseUser } from "firebase/auth";
import { FirebaseApp, FirebaseOptions, initializeApp } from "firebase/app";
import {
	Firestore,
	QuerySnapshot,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	updateDoc,
} from "firebase/firestore";
import { CollectionReference } from "firebase/firestore";
import { FirexContext } from "./FirexContext";
import { DEFAULT_CONTEXT_VALUE, PROVIDERS, ProvidersType } from "./const";

/**
 * Firex provider
 */

export interface FirexProviderProps {
	children: JSX.Element;
	config: FirebaseOptions;
}

export const FirexProvider: FC<FirexProviderProps> = ({
	children,
	config,
}): JSX.Element => {
	const [app] = useState<FirebaseApp>(initializeApp(config));
	const [db] = useState<Firestore>(getFirestore(app));
	const [auth] = useState<Auth>(getAuth(app));
	const [loading, setLoading] = useState<boolean>(DEFAULT_CONTEXT_VALUE.loading);
	const [user, setUser] = useState<FirebaseUser | null>(
		DEFAULT_CONTEXT_VALUE.user
	);

	// Sign in
	const signIn = useCallback(
		(str: ProvidersType): Promise<void> =>
			new Promise((resolve, reject) => {
				if (auth) {
					let provider: FirebaseAuthProvider | undefined;
					if (PROVIDERS[str]) provider = PROVIDERS[str];
					if (provider) {
						setLoading(true);
						signInWithPopup(auth, provider)
							.then(() => {
								setLoading(false);
								resolve();
							})
							.catch((err) => reject(err));
					} else reject("Provider not recognized.");
				} else reject("Firebase not set up.");
			}),
		[auth]
	);

	// Signs user out
	const signOut = useCallback(
		(): Promise<void> =>
			new Promise((resolve, reject) => {
				if (auth) {
					setLoading(true);
					auth
						.signOut()
						.catch(reject)
						.finally(() => {
							setLoading(false);
							resolve();
						});
				} else reject("Firebase not set up.");
			}),
		[auth]
	);

	// Listen for auth changes
	useEffect(() => {
		if (auth) {
			const unSubscribe = onAuthStateChanged(auth, (user) => {
				if (user) setUser(user);
				else setUser(null);
				setLoading(false);
			});
			return () => unSubscribe();
		} else console.error("Firebase not set up.");
	}, [auth]);

	// Create new document
	const createDocument = useCallback(
		(
			collectionName: string,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			data: any
		): Promise<void> =>
			new Promise((resolve, reject) => {
				setLoading(true);
				delete data.id;
				const collectionRef: CollectionReference = collection(db, collectionName);
				addDoc(collectionRef, data)
					.then((docRef) => {
						return getDoc(docRef);
					})
					.then((snapshot) => {
						if (snapshot.exists())
							resolve({
								...snapshot.data(),
								id: snapshot.id,
							});
						else resolve();
					})
					.catch(reject)
					.finally(() => setLoading(false));
			}),
		[db]
	);

	// Get all documents from a collection
	const getDocuments = useCallback(
		(collectionName: string): Promise<Record<string, unknown>[]> =>
			new Promise((resolve, reject) => {
				setLoading(true);
				const collectionRef: CollectionReference = collection(db, collectionName);
				getDocs(collectionRef)
					.then((snapshot: QuerySnapshot) =>
						resolve(
							snapshot.docs.map((item) => ({
								...item.data(),
								id: item.id,
							}))
						)
					)
					.catch(reject)
					.finally(() => setLoading(false));
			}),
		[db]
	);

	// Get document by its id
	const getDocument = useCallback(
		(
			collectionName: string,
			id: string
		): Promise<Record<string, unknown> | void> =>
			new Promise((resolve, reject) => {
				setLoading(true);
				const docRef = doc(db, collectionName, id);
				getDoc(docRef)
					.then((snapshot) => {
						if (snapshot.exists())
							resolve({
								...snapshot.data(),
								id: snapshot.id,
							});
						else resolve();
					})
					.catch(reject)
					.finally(() => setLoading(false));
			}),
		[db]
	);

	// Get document by its id
	const updateDocument = useCallback(
		(
			collectionName: string,
			id: string,
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			newData: any
		): Promise<void> =>
			new Promise((resolve, reject) => {
				setLoading(true);
				const docRef = doc(db, collectionName, id);
				updateDoc(docRef, newData)
					.then(() => resolve())
					.catch(reject)
					.finally(() => setLoading(false));
			}),
		[db]
	);

	// Remove document with the specidied id
	const removeDocument = useCallback(
		(collectionName: string, id: string): Promise<void> =>
			new Promise((resolve, reject) => {
				setLoading(true);
				const docRef = doc(db, collectionName, id);
				deleteDoc(docRef)
					.then(() => resolve())
					.catch(reject)
					.finally(() => setLoading(false));
			}),
		[db]
	);

	const values = useMemo(() => {
		return {
			db,
			auth,
			loading,
			user,
			signIn,
			signOut,
			getDocuments,
			getDocument,
			updateDocument,
			removeDocument,
			createDocument,
		};
	}, [
		db,
		auth,
		loading,
		user,
		signIn,
		signOut,
		getDocuments,
		getDocument,
		updateDocument,
		removeDocument,
		createDocument,
	]);

	return (
		<FirexContext.Provider value={values}>{children}</FirexContext.Provider>
	);
};
