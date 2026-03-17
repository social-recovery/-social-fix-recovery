import { NextResponse } from 'next/server';
import getDatabase from '@/lib/mongodb';

const collectionName = 'submissions';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    let db;
    try {
      db = await getDatabase();
    } catch (dbError) {
      console.error('MongoDB connection error:', dbError);
      return NextResponse.json({ 
        success: false, 
        message: 'Database connection failed. Please try again later.',
        error: 'Database unavailable'
      }, { status: 503 });
    }
    
    const collection = db.collection(collectionName);
    
    const submission: Record<string, unknown> = {
      createdAt: new Date(),
    };

    for (const [key, value] of formData.entries()) {
      if (key === 'platforms') {
        submission[key] = JSON.parse(value as string);
      } else if (value instanceof File) {
        const bytes = await value.arrayBuffer();
        const buffer = Buffer.from(bytes);
        submission[key] = {
          name: value.name,
          type: value.type,
          data: buffer.toString('base64'),
        };
      } else {
        submission[key] = value;
      }
    }
    
    const result = await collection.insertOne(submission);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Form submitted successfully',
      id: result.insertedId 
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error saving to MongoDB:', errorMessage);
    return NextResponse.json({ 
      success: false, 
      message: 'Error submitting form',
      error: errorMessage
    }, { status: 500 });
  }
}
