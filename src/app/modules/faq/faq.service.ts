import { Faq } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createFaq = async (data: any): Promise<Faq> => {
    const result = await prisma.faq.create({ data })
    return result;
};

const getAllFaq = async () => {
    const result = await prisma.faq.findMany({ orderBy: { createdAt: 'desc' } });
    return {
        data: result,
    };
};

export const FaqService = {
    createFaq,
    getAllFaq
}