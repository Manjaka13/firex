import { FC } from "react";
import { FIREBASE_CONFIG } from "./const";
import { FirexProvider, useFirex } from "../lib";
import styles from "./styles.module.css";
import google from "./google.png";
import github from "./github.png";
import Spinner from "./Spinner";

/**
 * Testing firex auth
 */

const AuthConsumer: FC = (): JSX.Element => {
	const { signIn, signOut, loading, user } = useFirex();

	return (
		<div className={styles["firex-auth"]}>
			<div className={styles["firex-auth__head"]}>
				<h1 className={styles["firex-auth__title"]}>FireX Auth</h1>
				{user && (
					<p className={styles["firex-auth__head"]}>
						<img
							className={styles["firex-auth__avatar"]}
							src={user.photoURL || ""}
							alt="Avatar"
						/>
						<span className={styles["firex-auth__name"]}>{user.displayName}</span>
					</p>
				)}
			</div>
			<div className={styles["firex-auth__divider"]}></div>
			<p className={styles["firex-auth__description"]}>
				FireX is a wrapper around firebase. This demo represents logging into your
				app using the firex auth module. Get started by clicking the button bellow:
			</p>
			{!loading && !user && (
				<>
					<p>
						<button
							className={styles["firex-auth__button-google"]}
							onClick={() => signIn("google")}
						>
							<img
								className={styles["firex-auth__google"]}
								src={google}
								alt="Google"
							/>
							Sign in with Google
						</button>
					</p>
					<p>
						<button
							className={styles["firex-auth__button-github"]}
							onClick={() => signIn("github")}
						>
							<img
								className={styles["firex-auth__github"]}
								src={github}
								alt="Github"
							/>
							Sign in with Github
						</button>
					</p>
				</>
			)}
			{!loading && user && (
				<p>
					<button
						className={styles["firex-auth__button--logout"]}
						onClick={() => signOut()}
					>
						Sign out
					</button>
				</p>
			)}
			{loading && <Spinner />}
		</div>
	);
};

export const Auth: FC = (): JSX.Element => (
	<FirexProvider config={FIREBASE_CONFIG}>
		<AuthConsumer />
	</FirexProvider>
);
