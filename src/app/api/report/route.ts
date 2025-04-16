import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/config/mongodb';
import Report from '../../models/reportsSchema';

export async function POST(request: NextRequest) {
  try {
    await connectMongoDB();

    const body = await request.json();
    const { userId, ticker, description, logoURL, notes } = body;

    if (!userId || !ticker || !description || !logoURL || !notes) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newReport = await Report.create({
      userId,
      ticker,
      description,
      logoURL,
      notes,
    });

    return NextResponse.json(newReport, { status: 201 });
  } catch (error) {
    console.error('Error saving report:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
    try {
      await connectMongoDB();
      const { searchParams } = new URL(request.url);
      const userId = searchParams.get('userId');
  
      if (!userId) {
        return NextResponse.json({ message: 'Missing userId' }, { status: 400 });
      }
  
      const reports = await Report.find({ userId });
      return NextResponse.json(reports, { status: 200 });
    } catch (error) {
      console.error('Error fetching reports:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
  }
  
