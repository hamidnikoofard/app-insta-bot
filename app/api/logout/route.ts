import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  (await cookies()).delete('accessToken');
  (await cookies()).delete('refreshToken');
  return NextResponse.json({
    success: true,
    message: 'خروج با موفقیت انجام شد',
  });
}
