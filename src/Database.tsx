import { FC, useEffect } from "react";
import { FIREBASE_CONFIG } from "./const";
import { FirexProvider, useFirex } from "../lib";
import styles from "./styles.module.css";
import Spinner from "./Spinner";

/**
 * FireX database
 */

// interface ItemType {
// 	amount?: number;
// 	content: string;
// 	date: string;
// 	done: boolean;
// 	id: string;
// 	owner: string;
// }

const DatabaseConsumer: FC = (): JSX.Element => {
	const { user, loading } = useFirex();
	// const [items, setItems] = useState<ItemType[]>([]);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// const mappedItems: JSX.Element[] = useMemo(
	// 	() =>
	// 		items.map((item, key) => (
	// 			<li className={styles["firex-list__item"]} key={key}>
	// 				{item.content}
	// 			</li>
	// 		)),
	// 	[items]
	// );

	return (
		<div className={styles["firex-auth"]}>
			<div className={styles["firex-auth__head"]}>
				<h1 className={styles["firex-auth__title"]}>FireX database</h1>
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
				app using the firex auth module.
			</p>
			{loading && <Spinner />}
			{/* {!loading && <ul className={styles["firex-list"]}>{mappedItems}</ul>} */}
		</div>
	);
};

export const Database: FC = (): JSX.Element => (
	<FirexProvider config={FIREBASE_CONFIG}>
		<DatabaseConsumer />
	</FirexProvider>
);
