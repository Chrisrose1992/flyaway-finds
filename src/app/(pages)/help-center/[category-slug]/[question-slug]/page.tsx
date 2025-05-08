import db from '@/database/sequelize';

const { FaqAnswer } = db;

async function getFaqAnswer(slug) {
    try {
        const faqAnswer = await FaqAnswer.findOne({ where: { slug } });

        return faqAnswer;
    } catch (error) {
        console.error("Error fetching FAQ Answer:", error);
        return null;
    }
}

export default async function QuestionDetailPage({ params }) {
    const categorySlug = params?.['category-slug'];
    const questionSlug = params?.['question-slug'];

    const answer = await getFaqAnswer(questionSlug);

    if (!answer) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-red-500">Answer Not Found</h1>
                <p className="text-gray-600 mt-4">We couldn't find an answer for this question.</p>
                <a href="/help-center" className="text-blue-600 hover:underline mt-6 block">Back to Help Center</a>
            </div>
        );
    }

    const bulletPoints = Array.isArray(answer.bulletPoints)
        ? answer.bulletPoints
        : JSON.parse(answer.bulletPoints || '[]');

    const relatedQuestions = Array.isArray(answer.relatedQuestions)
        ? answer.relatedQuestions
        : JSON.parse(answer.relatedQuestions || '[]');

    return (
        <div className="w-full  mx-auto px-6 py-12">
            <div className="w-full xl:container mx-auto px-4">
                <nav className="text-sm text-gray-500 mb-6 flex items-center space-x-2">
                    <a href="/help-center" className="hover:text-gray-800 font-medium">Help Center</a>
                    <span> / </span>
                    <a href={`/help-center/${categorySlug}`} className="hover:text-gray-800 font-medium capitalize">{categorySlug.replace(/-/g, ' ')}</a>
                    <span> / </span>
                    <span className="text-gray-800 font-semibold capitalize">{questionSlug.replace(/-/g, ' ')}</span>
                </nav>

                <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">{answer.title}</h1>

                <div className="rounded-lg overflow-hidden shadow-md mb-8">
                    <img
                        src="https://placehold.co/800x400"
                        alt={answer.title}
                        className="w-full h-auto object-cover"

                    />
                </div>

                <div className="text-gray-800 text-lg leading-relaxed">
                    {answer.intro && <p className="text-gray-600 mb-4">{answer.intro}</p>}
                    <p>{answer.text}</p>
                </div>

                {bulletPoints.length > 0 && (
                    <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Points</h2>
                        <ul className="list-disc list-inside space-y-2">
                            {bulletPoints.map((point, index) => (
                                <li key={index} className="text-gray-700">{point}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {relatedQuestions.length > 0 && (
                    <div className="mt-8 p-6 bg-white shadow-md rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">Related Questions</h2>
                        <ul className="space-y-3">
                            {relatedQuestions.map((related, index) => {
                                // Ensure related object has a slug
                                if (!related || !related.slug) return null;

                                return (
                                    <li key={index} className="flex items-center space-x-3">
                                        <span className="text-orange-500">➜</span>
                                        <a
                                            href={`/help-center/${categorySlug}/${related.slug}`}
                                            className="text-blue-600 hover:underline font-medium capitalize"
                                        >
                                            {related.title ? related.title : related.slug.replace(/-/g, " ")}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                <div className="mt-10 text-center">
                    <a href="/help-center" className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-700 transition duration-300">
                        ← Back to Help Center
                    </a>
                </div>
            </div>
        </div>
    );
}
