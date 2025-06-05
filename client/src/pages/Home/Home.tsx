import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import type { TierList } from "../../api/types/tierList";
import { neonrank } from "../../api/instance";
import { Link } from "react-router";

function Home() {
    const [tierLists, setTierLists] = useState<TierList[] | null>(null);

    const fetchTierLists = async () => {
        try {
            const response = await neonrank.get<TierList[]>("/tierlists");
            setTierLists(response.data);
        } catch (err) {
            console.error("Error fetching tier lists: ", err);
        }
    };

    useEffect(() => {
        console.log("spam");
        fetchTierLists();
    }, []);

    return (
        <div>
            <h1>Logo</h1>
            {tierLists &&
                tierLists.map((tierlist) => {
                    return (
                        <div key={tierlist.tierlist_id}>
                            <Link to={`/tierlist/${tierlist.tierlist_id}`}>
                                <h2>{tierlist.title}</h2>
                                <p>
                                    <span>{tierlist.creation_date}</span>
                                </p>
                            </Link>
                        </div>
                    );
                })}
        </div>
    );
}

export default Home;
