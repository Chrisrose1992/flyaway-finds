import { NextResponse } from 'next/server';
import { v4 as uuidV4 } from 'uuid';
import desination from '@/data/destinations.json';
import db from '@/database/sequelize';

const { Destination } = db;

export async function GET(): Promise<NextResponse> {
    try {
        const formattedData = desination.map((item) => ({
            id: uuidV4(),
            title: item.title,
            description: item.description,
            letter: item.letter,
            slug: item.slug,
            country: item.country,
            holidayType: item.holidayType,
            attractions: item.attractions,
            whenToGo: item.whenToGo,
            image: item.image || null,
            latitude: null,
            longitude: null,
        }));

        await Destination.bulkCreate(formattedData, {
            ignoreDuplicates: true,
        });

        return NextResponse.json(
            { message: `Uploaded ${formattedData.length} destinations successfully.` },
            { status: 200 }
        );
    } catch (error) {
        console.error('Destination Upload Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
