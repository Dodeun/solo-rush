export interface TierList {
    tierlist_id: number;
    title: string;
    creation_date: string;
}

export interface CompleteTierList {
    tierlist_id: number;
    title: string;
    creation_date: string;
    listItems: ListItem[];
}

export interface ListItem {
    listitem_id: number;
    option_value: string;
    tierlist_id: number;
}
