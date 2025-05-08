import db from '@/database/sequelize';
import { LifeBuoy } from 'lucide-react';

const { Faq } = db;

interface FaqItem {
    category: string;
    categorySlug: string;
    question: string;
    slug: string;
}

interface GroupedFAQ {
    title: string;
    slug: string;
    questions: { question: string; slug: string }[];
}

async function getFaq(): Promise<GroupedFAQ[]> {
    try {
        const faqs: FaqItem[] = await Faq.findAll({
            attributes: ['category', 'categorySlug', 'question', 'slug'],
            order: [['category', 'ASC']],
        });

        const groupedFAQs: Record<string, GroupedFAQ> = faqs.reduce((acc, faq) => {
            if (!acc[faq.categorySlug]) {
                acc[faq.categorySlug] = {
                    title: faq.category,
                    slug: faq.categorySlug,
                    questions: [],
                };
            }
            acc[faq.categorySlug].questions.push({
                question: faq.question,
                slug: faq.slug,
            });
            return acc;
        }, {} as Record<string, GroupedFAQ>);

        return Object.values(groupedFAQs);
    } catch (error) {
        console.error("Error Fetching FAQs:", error);
        return [];
    }
}

export default async function HelpCenterPage() {
    const HelpCategories: GroupedFAQ[] = await getFaq();

    return (
        <div className="bg-white pb-24">
            {/* Hero */}
            <section className="container m-auto bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16 rounded-2xl mb-12">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Help Center</h1>
                    <p className="text-slate-600 text-lg max-w-xl mx-auto">
                        Have a question? Search our FAQs or browse categories below.
                    </p>

                    {/* Search bar */}
                    <div className="mt-8 max-w-xl mx-auto">
                        <form action="">
                            <input
                                type="text"
                                placeholder="Search help topics..."
                                className="w-full px-5 py-3 border border-slate-300 rounded-full shadow-sm backdrop-blur-md bg-white/70 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                            />
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ Categories */}
            <section className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {HelpCategories.map((category) => (
                    <div
                        key={category.title}
                        className="relative bg-white border border-slate-200 rounded-2xl shadow-sm p-6 hover:shadow-md hover:border-orange-400 transition duration-300"
                    >
                        <div className="absolute -top-5 left-5 bg-orange-100 text-orange-600 p-3 rounded-full shadow-sm">
                            <LifeBuoy size={20} />
                        </div>
                        <h2 className="text-lg font-semibold mt-6 mb-3 text-slate-800">{category.title}</h2>
                        <ul className="list-disc space-y-2 text-m text-slate-600">
                            {category.questions.map((q) => (
                                <li key={q.slug}>
                                    <a
                                        href={`/help-center/${category.slug}/${q.slug}`}
                                        className="hover:text-orange-500 hover:underline transition"
                                    >
                                        {q.question}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            {/* CTA */}
            <section className="mt-24 text-center">
                <div className="container m-auto bg-slate-50 py-16 rounded-2xl mb-12">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Still need help?</h3>
                    <p className="text-slate-700 mb-4">Our team is ready to assist you with anything you need.</p>
                    <a
                        href="/contact"
                        className="inline-block bg-orange-600 text-white font-medium px-6 py-3 rounded-full hover:bg-orange-700 transition"
                    >
                        Contact Support
                    </a>
                </div>
            </section>
        </div>
    );
}
