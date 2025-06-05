import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import type { TierList } from "../../api/types/tierList";
import { neonrank } from "../../api/instance";
import { Link, useNavigate } from "react-router";

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

    const deleteTierList = async (tierlistId: number) => {
        try {
            const response = await neonrank.delete(`/tierlists/${tierlistId}`);
        } catch (err) {
            console.error("Error deleting tier list: ", err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleCLick = () => {
        createTierList();
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
        <div>
            <h1>Logo</h1>
            {tierLists &&
                tierLists.map((tierlist) => {
                    return (
                        <div key={tierlist.tierlist_id}>
                            <Link to={`/${tierlist.tierlist_id}`}>
                                <h2>{tierlist.title}</h2>
                                <p>
                                    <span>{tierlist.creation_date}</span>
                                </p>
                            </Link>
                            <button
                                type="button"
                                onClick={() =>
                                    handleDelete(tierlist.tierlist_id)
                                }
                            >
                                DEL
                            </button>
                        </div>
                    );
                })}
            <div>
                <input
                    type="text"
                    placeholder="40 characters maximum"
                    value={title}
                    onChange={handleChange}
                />
                <button type="button" onClick={handleCLick}>
                    CREATE
                </button>
            </div>
        </div>
    );
}

export default Home;
