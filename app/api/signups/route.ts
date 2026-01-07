import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// POST: Add a new signup
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'university', 'course', 'year', 'willingToPay'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('signups')
      .insert([{
        name: body.name,
        email: body.email,
        phone: body.phone,
        university: body.university,
        course: body.course,
        year: body.year,
        willing_to_pay: body.willingToPay
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save signup' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Signup saved successfully', data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving signup:', error);
    return NextResponse.json(
      { error: 'Failed to save signup' },
      { status: 500 }
    );
  }
}

// GET: Retrieve all signups
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('signups')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch signups' },
        { status: 500 }
      );
    }

    // Transform data to match existing format (snake_case to camelCase)
    const formattedData = data.map(signup => ({
      id: signup.id,
      name: signup.name,
      email: signup.email,
      phone: signup.phone,
      university: signup.university,
      course: signup.course,
      year: signup.year,
      willingToPay: signup.willing_to_pay,
      timestamp: signup.created_at
    }));

    return NextResponse.json({ success: true, data: formattedData });
  } catch (error) {
    console.error('Error fetching signups:', error);
    return NextResponse.json(
      { error: 'Failed to fetch signups' },
      { status: 500 }
    );
  }
}
