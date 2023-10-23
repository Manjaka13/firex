import { createContext } from "react";
import { Auth } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import { User as FirebaseUser } from "firebase/auth";
import { DEFAULT_CONTEXT_VALUE, ProvidersType } from "./const";

/**
 * Firex context
 */

export interface FirexContextType {
	auth?: Auth;
	db?: Firestore;
	loading: boolean;
	user: FirebaseUser | null;
	signIn: (str: ProvidersType) => Promise<void>;
	signOut: () => Promise<void>;
	getDocuments: (collectionName: string) => Promise<Record<string, unknown>[]>;
	getDocument: (
		collectionName: string,
		id: string
	) => Promise<Record<string, unknown> | void>;
	updateDocument: (
		collectionName: string,
		id: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		newData: any
	) => Promise<void>;
	removeDocument: (collectionName: string, id: string) => Promise<void>;
	createDocument: (
		collectionName: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data: any
	) => Promise<void>;
}

export const FirexContext = createContext<FirexContextType>(
	DEFAULT_CONTEXT_VALUE
);
