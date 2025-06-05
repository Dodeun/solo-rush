import { Link, useParams } from "react-router";
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

    const updateTierList = async () => {
        try {
            const response = await neonrank.put(
                `/tierlists/${tierListId}`,
                tierList
            );
        } catch (err) {
            console.error("Error posting tier list: ", err);
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
                listItems: [
                    ...prev.listItems,
                    {
                        option_value: optionValue,
                        listitem_id: Date.now(),
                        tierlist_id: prev.tierlist_id,
                    },
                ],
            };
        });
        setOptionValue("");
    };

    const handleDeleteItem = (itemId: number) => {
        if (tierList.listItems.length <= 1) return;
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

    const handleSave = () => {
        updateTierList();
    };

    useEffect(() => {
        fetchTierList();
    }, []);

    return (
        <div>
            <div>
                <div>Logo</div>
                <div>
                    <Link to="/">Home</Link>
                    <button type="button" onClick={handleSave}>
                        SAVE
                    </button>
                </div>
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
                        <input
                            type="text"
                            placeholder="40 characters maximum"
                            value={optionValue}
                            onChange={handleChange}
                        />
                        <button
                            type="button"
                            onClick={() =>
                                optionValue &&
                                optionValue.length <= 40 &&
                                handleAddItem()
                            }
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
