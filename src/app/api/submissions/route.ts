import { NextResponse } from 'next/server';
import getDatabase from '@/lib/mongodb';

const collectionName = 'submissions';

export async function GET() {
  try {
    let db;
    try {
      db = await getDatabase();
    } catch (dbError) {
      console.error('MongoDB connection error:', dbError);
      return NextResponse.json({ 
        success: false, 
        message: 'Database connection failed',
        error: dbError instanceof Error ? dbError.message : 'Unknown error'
      }, { status: 503 });
    }
    
    const collection = db.collection(collectionName);
    
    const submissions = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();
    
    return NextResponse.json({ 
      success: true, 
      count: submissions.length,
      data: submissions
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching from MongoDB:', errorMessage);
    return NextResponse.json({ 
      success: false, 
      message: 'Error fetching submissions',
      error: errorMessage
    }, { status: 500 });
  }
}
