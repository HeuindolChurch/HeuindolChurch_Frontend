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