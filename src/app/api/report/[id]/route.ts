import { NextRequest, NextResponse } from 'next/server';
import connectMongoDB from '@/config/mongodb';
import Report from '../../../models/reportsSchema';

export async function PUT(request: NextRequest) {
  try {
    await connectMongoDB();

    const id = request.nextUrl.pathname.split('/').pop(); 

    if (!id) {
      return NextResponse.json({ message: 'Missing report ID in URL' }, { status: 400 });
    }

    const { logoURL, notes } = await request.json();

    const updatedReport = await Report.findByIdAndUpdate(
      id,
      { logoURL, notes },
      { new: true }
    );

    if (!updatedReport) {
      return NextResponse.json({ message: 'Report not found' }, { status: 404 });
    }

    return NextResponse.json(updatedReport, { status: 200 });
  } catch (error) {
    console.error('Error updating report:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
    try {
      await connectMongoDB();
  
      const id = request.nextUrl.pathname.split('/').pop(); // extract the [id]
  
      if (!id) {
        return NextResponse.json({ message: 'Missing report ID' }, { status: 400 });
      }
  
      const report = await Report.findById(id);
  
      if (!report) {
        return NextResponse.json({ message: 'Report not found' }, { status: 404 });
      }
  
      return NextResponse.json(report, { status: 200 });
    } catch (error) {
      console.error('Error fetching report:', error);
      return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
  }
