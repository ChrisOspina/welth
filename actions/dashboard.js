"use server";

import { revalidatePath } from "next/cache";
import { checkAuth } from "./check-auth";
import { db } from "@/lib/prisma";

const serializeTransaction = (obj) => {
    const serialized = { ...obj };
try{
 if (obj.balance) {
        serialized.balance = obj.balance.toNumber();
    }

    if (obj.amount) {
        serialized.balance = obj.balance.toNumber();
    }
}
catch(error){
    console.error("An error occured",error.message);
}
}

export async function createAccount(data) {
    try {
        //call checkAuth to get the user
        const user = await checkAuth();

        //convert balance to float before saving to db
        const balanceFloat = parseFloat(data.balance);
        if (isNaN(balanceFloat)) {
            throw new Error("Invalid balance amount");
        }

        const existingAccount = await db.account.findMany({
            where: { userId: user.id, },
        });


        const shouldbeDefault = existingAccount.length === 0 ? true : data.isDefault;

        if (shouldbeDefault) {
            await db.account.updateMany({
                where: { userId: user.id, isDefault: true },
                data: { isDefault: false, },
            });
        }
        const newAccount = await db.account.create({
            data: {
                ...data,
                balance: balanceFloat,
                userId: user.id,
                isDefault: shouldbeDefault,
            }
        });

        const serializedAccount = serializeTransaction(newAccount);
        revalidatePath("/dashboard");
        return serializedAccount;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

export async function getUserAccounts(){
    const user = await checkAuth();

    const account = db.account.findMany({
        where:{userId:user.id},
        orderBy:{createdAt: "desc"},
        include:{
            _count:{
                select:{
                    transations:true,
                }
            }
        }
    });
    const serializedAccount = serializeTransaction(account);
    return serializedAccount;

}