import { RowDataPacket } from "mysql2";
import { ListItem, NewListItem } from "./listItem";

export interface TierList extends RowDataPacket {
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

export interface RowTierList extends TierList {
	listitem_id: number;
	option_value: string;
}

export interface NewTierList {
	title: string;
	listItems: NewListItem[];
}

export interface PartialCompleteTierList {
	tierlist_id: number;
	title: string;
	creation_date: string;
	listItems: ListItem[] | NewListItem[];
}
