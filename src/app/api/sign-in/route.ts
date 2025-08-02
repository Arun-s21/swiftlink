import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    //no user is found, the function exits here.
    if (!user) {
      return Response.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Because of the check above, TypeScript now knows that 'user' cannot be null.
    // It is now safe to access user.password.
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return Response.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // --- The rest of the logic remains the same ---
    const tokenPayload = {
      id: user.id,
      email: user.email,
    };

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const token = await new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(secret);

    const response = Response.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );

    response.headers.set(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; Max-Age=86400`
    );

    return response;

  } catch (error) {
    console.error('Error during sign-in:', error);
    return Response.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
  }
}