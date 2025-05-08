import { NextResponse } from 'next/server';
import { v4 as uuidV4 } from "uuid";
import db from '@/database/sequelize';
import { faqCategories } from '@/data/faqs';
import { faqAnswers } from '@/data/faqs-answer';

const { Faq, FaqAnswer } = db;

export async function GET(req: Request) {
    try {

        // const userId = await getAuthCookie('authToken');
        // const user = await db.User.findOne({ where: { id: userId } });
        //
        // if (!user || user.role !== 'admin') {
        //     return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        // }

        console.log('Starting FAQ and Answer upload...');

        let createdFaqs = 0, skippedFaqs = 0, createdAnswers = 0, skippedAnswers = 0;

        for (const category of faqCategories) {
            for (const question of category.questions) {
                let faqEntry = await Faq.findOne({ where: { slug: question.slug } });

                if (!faqEntry) {
                    faqEntry = await Faq.create({
                        id: uuidV4(),
                        category: category.title,
                        categorySlug: category.slug,
                        question: question.question,
                        slug: question.slug,
                    });
                    createdFaqs++;
                } else {
                    skippedFaqs++;
                }

                const answerData = faqAnswers.find(ans => ans.slug === question.slug);

                if (answerData) {
                    const existingAnswer = await FaqAnswer.findOne({ where: { slug: answerData.slug } });

                    if (!existingAnswer) {
                        await FaqAnswer.create({
                            id: uuidV4(),
                            faqId: faqEntry.id,
                            title: answerData.title,
                            slug: answerData.slug,
                            headerImg: answerData.headerImg || null,
                            intro: answerData.intro || null,
                            text: answerData.text,
                            bulletPoints: JSON.stringify(answerData.bulletPoints) || null,
                            relatedQuestions: JSON.stringify(answerData.relatedQuestions) || null,
                            footerNote: answerData.footerNote || null,
                        });
                        createdAnswers++;
                    } else {
                        skippedAnswers++;
                    }
                }
            }
        }

        return NextResponse.json({
            success: true,
            message: `FAQ upload completed. ${createdFaqs} new FAQs added, ${skippedFaqs} skipped, ${createdAnswers} answers added, ${skippedAnswers} skipped.`,
        });

    } catch (error) {
        console.error("FAQ Upload Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}