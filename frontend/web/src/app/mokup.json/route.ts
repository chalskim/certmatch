import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // mokup.json을 frontend/data 폴더에서 읽어와서 그대로 반환
    const filePath = path.resolve(process.cwd(), '../data/mokup.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return new Response(data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: 'Failed to load mokup.json',
        message: error?.message ?? String(error),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}