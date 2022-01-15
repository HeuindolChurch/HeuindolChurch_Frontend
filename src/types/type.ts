import React from "react";

export type Account = {
    id: number;
    reason: string;
    price: number;
    income?: number;
    outcome?: number;
    balance: number;
    note?: string;
    date: Date;
}

export interface AccountInfo {
    id?: number;
    reason?: string;
    price?: number;
    note?: string;
    date?: Date;
}