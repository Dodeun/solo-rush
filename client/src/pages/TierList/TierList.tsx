import { useParams } from "react-router";
import styles from "./TierList.module.css";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { neonrank } from "../../api/instance";
import type { CompleteTierList } from "../../api/types/tierList";

function TierList() {
    const { tierList, setTierList } = useAppContext();
    const { tierListId } = useParams();
    const [optionValue, setOptionValue] = useState<string>("");

    const fetchTierList = async () => {
        try {
            const response = await neonrank.get<CompleteTierList>(
                `/tierlists/${tierListId}`
            );
            setTierList(response.data);
        } catch (err) {
            console.error("Error fetching tier list: ", err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOptionValue(e.target.value);
    };

    const handleAddItem = () => {
        setTierList((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                listItems: [...prev.listItems, { option_value: optionValue }],
            };
        });
    };

    const handleDeleteItem = (itemId: number) => {
        setTierList((prev) => {
            if (!prev) return prev;

            return {
                ...prev,
                listItems: prev.listItems.filter(
                    (item) => item.listitem_id !== itemId
                ),
            };
        });
    };

    useEffect(() => {
        fetchTierList();
    }, []);

    useEffect(() => {
        console.log(tierList);
    }, [tierList]);

    return (
        <div>
            <div>
                <div>Logo</div>
                <button>Home</button>
            </div>
            {tierList ? (
                <div>
                    <h1>{tierList.title}</h1>
                    <ol>
                        {tierList.listItems.map((item) => {
                            return (
                                <li key={item.listitem_id}>
                                    <div>{item.option_value}</div>
                                    <button
                                        onClick={() =>
                                            handleDeleteItem(item.listitem_id)
                                        }
                                        type="button"
                                    >
                                        DEL
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                    <div>
                        <input type="text" onChange={handleChange} />
                        <button
                            type="button"
                            onClick={() => optionValue && handleAddItem()}
                        >
                            ADD
                        </button>
                    </div>
                </div>
            ) : (
                <div>404</div>
            )}
        </div>
    );
}

export default TierList;
