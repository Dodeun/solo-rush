import { RowDataPacket } from "mysql2";

export interface ListItem {
    listitem_id: number;
    option_value: string;
    tierlist_id: number;
}

export interface NewListItem {
    option_value: string;
}
