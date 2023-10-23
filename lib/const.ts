import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { FirexContextType } from "./FirexContext";

/**
 * Stores constants
 */

// Context default value
export const DEFAULT_CONTEXT_VALUE: FirexContextType = {
	loading: true,
	user: null,
	signIn: () => new Promise((resolve) => resolve()),
	signOut: () => new Promise((resolve) => resolve()),
	getDocuments: () => new Promise((resolve) => resolve([])),
	getDocument: () => new Promise((resolve) => resolve()),
	updateDocument: () => new Promise((resolve) => resolve()),
	removeDocument: () => new Promise((resolve) => resolve()),
	createDocument: () => new Promise((resolve) => resolve()),
};

export type ProvidersType = "google" | "github";

interface ProvidersObjectType {
	google: GoogleAuthProvider;
	github: GithubAuthProvider;
}

// Available providers
export const PROVIDERS: ProvidersObjectType = {
	google: new GoogleAuthProvider(),
	github: new GithubAuthProvider(),
};
