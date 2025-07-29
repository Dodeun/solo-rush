import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import type { TierList } from "../../api/types/tierList";
import { neonrank } from "../../api/instance";
import { Link, useNavigate } from "react-router";
import { CloseIcon } from "../../components/icons/Icons";

function Home() {
	const [tierLists, setTierLists] = useState<TierList[] | null>(null);
	const [title, setTitle] = useState<string>("");
	const [destination, setDestination] = useState<number | null>(null);
	const navigate = useNavigate();

	const fetchTierLists = async () => {
		try {
			const response = await neonrank.get<TierList[]>("/tierlists");
			setTierLists(response.data);
		} catch (err) {
			console.error("Error fetching tier lists: ", err);
		}
	};

	const createTierList = async () => {
		try {
			const response = await neonrank.post(`/tierlists`, {
				title: title,
				listItems: [
					{ option_value: "Exemple 1" },
					{ option_value: "Exemple 2" },
				],
			});
			setDestination(response.data.tierlist_id);
		} catch (err) {
			console.error("Error posting tier list: ", err);
		}
	};

	const formatDate = (fullDate: string): string => {
		const date = new Date(fullDate);

		const day = date.getDate();
		const month = date.toLocaleString("en-US", { month: "long" });
		const year = date.getFullYear();

		return `${day} - ${month} - ${year}`;
	};

	const deleteTierList = async (tierlistId: number) => {
		try {
			await neonrank.delete(`/tierlists/${tierlistId}`);
		} catch (err) {
			console.error("Error deleting tier list: ", err);
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (title && title.length <= 40) {
			createTierList();
		}
	};

	const handleDelete = (tierlistId: number) => {
		deleteTierList(tierlistId);
		setTierLists((prev) => {
			if (!prev) return prev;

			return prev.filter(
				(tierList) => tierList.tierlist_id !== tierlistId
			);
		});
	};

	useEffect(() => {
		fetchTierLists();
	}, []);

	useEffect(() => {
		destination && navigate(`/${destination}`);
	}, [destination]);

	return (
		<div className={styles.pageContainer}>
			<h1 className={styles.logo} data-testid="cypress-title">
				Neon Rank
			</h1>
			<div className={styles.tierListsContainer}>
				{tierLists &&
					tierLists.map((tierlist) => {
						return (
							<div
								key={tierlist.tierlist_id}
								className={styles.card}
								data-testid="cypress-card"
							>
								<Link
									to={`/${tierlist.tierlist_id}`}
									className={styles.info}
								>
									<h2 className={styles.title}>
										{tierlist.title}
									</h2>
									<p>
										<span className={styles.date}>
											{formatDate(tierlist.creation_date)}
										</span>
									</p>
								</Link>
								<button
									type="button"
									className={styles.buttonDel}
									onClick={() =>
										handleDelete(tierlist.tierlist_id)
									}
								>
									<CloseIcon className={styles.closeIcon} />
								</button>
							</div>
						);
					})}
			</div>
			<form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
				<input
					type="text"
					placeholder="40 characters maximum"
					className={styles.input}
					value={title}
					onChange={handleChange}
					data-testid="cypress-input"
				/>
				<button
					type="submit"
					className={styles.buttonCreate}
					data-testid="cypress-add-btn"
				>
					ADD
				</button>
			</form>
		</div>
	);
}

export default Home;
