import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'signups.json');

// Ensure data directory exists
async function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
}

// Read existing signups
async function readSignups() {
  try {
    if (existsSync(DATA_FILE)) {
      const data = await readFile(DATA_FILE, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading signups:', error);
    return [];
  }
}

// Write signups to file
async function writeSignups(signups: any[]) {
  await ensureDataDir();
  await writeFile(DATA_FILE, JSON.stringify(signups, null, 2), 'utf-8');
}

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

    // Read existing signups
    const signups = await readSignups();

    // Add new signup with timestamp
    const newSignup = {
      ...body,
      timestamp: new Date().toISOString()
    };
    
    signups.push(newSignup);

    // Write back to file
    await writeSignups(signups);

    return NextResponse.json(
      { success: true, message: 'Signup saved successfully', data: newSignup },
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
    const signups = await readSignups();
    return NextResponse.json({ success: true, data: signups });
  } catch (error) {
    console.error('Error fetching signups:', error);
    return NextResponse.json(
      { error: 'Failed to fetch signups' },
      { status: 500 }
    );
  }
}
