import { NextResponse } from 'next/server';
import db from '@/database/sequelize';
import { Op } from 'sequelize';

const { Destination } = db;

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userQuery = searchParams.get('query') ?? '';

        if (userQuery.length < 2) {
            return NextResponse.json([], { status: 200 });
        }

        const destinations = await Destination.findAll({
            where: {
                [Op.or]: [
                    { title:    { [Op.like]: `%${userQuery}%` } },
                    { country:  { [Op.like]: `%${userQuery}%` } },
                ],
            },
            attributes: ['title', 'country'],
        });

        return NextResponse.json(destinations, { status: 200 });
    } catch (error) {
        console.error('Fetch Destinations Error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
