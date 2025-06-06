import { Link, useParams } from "react-router";
import styles from "./TierList.module.css";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import { neonrank } from "../../api/instance";
import type { CompleteTierList } from "../../api/types/tierList";
import { CloseIcon, HomeIcon, SaveIcon } from "../../components/icons/Icons";

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
            await neonrank.put(`/tierlists/${tierListId}`, tierList);
        } catch (err) {
            console.error("Error posting tier list: ", err);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOptionValue(e.target.value);
    };

    const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
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
        if (!tierList || tierList.listItems.length <= 1) return;
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

    const getHue = (index: number) => {
        if (!tierList) return;
        if (tierList.listItems.length === 1) return 0;
        return (index * 250) / (tierList.listItems.length - 1);
    };

    useEffect(() => {
        fetchTierList();
    }, []);

    return (
        <div className={styles.pageContainer}>
            <nav className={styles.navbar}>
                <div className={styles.logo}>NR</div>
                <div className={styles.navButtonContainer}>
                    <Link to="/" className={styles.buttonHome}>
                        <HomeIcon
                            style={{
                                width: "24px",
                                height: "24px",
                            }}
                            className={styles.icon}
                        />
                    </Link>
                    <button
                        type="button"
                        className={styles.buttonSave}
                        onClick={handleSave}
                    >
                        <SaveIcon
                            style={{
                                width: "24px",
                                height: "24px",
                            }}
                            className={styles.icon}
                        />
                    </button>
                </div>
            </nav>
            {tierList ? (
                <div className={styles.tierList}>
                    <h1 className={styles.title}>{tierList.title}</h1>
                    <ol className={styles.itemsList}>
                        {tierList.listItems.map((item, index) => {
                            const hue = getHue(index);
                            const hslColor = `hsl(${hue}, 100%, 50%)`;
                            const textShadows = `
                                0 0 1px white,
                                0 0 2px white,
                                0 0 2px ${hslColor},
                                0 0 3px ${hslColor},
                                0 0 4px ${hslColor},
                                0 0 6px ${hslColor},
                                0 0 9px ${hslColor}
                            `;
                            const boxShadows = `
                                0 0 1px white,
                                0 0 2px white,
                                0 0 3px ${hslColor},
                                0 0 6px ${hslColor},
                                inset 0 0 6px ${hslColor}
                            `;

                            return (
                                <li
                                    key={item.listitem_id}
                                    style={{ boxShadow: boxShadows }}
                                    className={styles.option}
                                >
                                    <div
                                        style={{ textShadow: textShadows }}
                                        className={styles.optionValue}
                                    >
                                        {item.option_value}
                                    </div>
                                    <button
                                        type="button"
                                        style={{ boxShadow: boxShadows }}
                                        className={styles.buttonDel}
                                        onClick={() =>
                                            handleDeleteItem(item.listitem_id)
                                        }
                                    >
                                        <CloseIcon
                                            className={styles.closeIcon}
                                        />
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                    <form
                        className={styles.form}
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (optionValue && optionValue.length <= 40) {
                                handleAddItem(e);
                            }
                        }}
                    >
                        <input
                            type="text"
                            placeholder="40 characters maximum"
                            className={styles.input}
                            value={optionValue}
                            onChange={handleChange}
                        />
                        <button type="submit" className={styles.buttonAdd}>
                            ADD
                        </button>
                    </form>
                </div>
            ) : (
                <div className={styles.notfound}>404</div>
            )}
        </div>
    );
}

export default TierList;
