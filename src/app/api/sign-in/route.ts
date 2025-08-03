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

   
    const tokenPayload = {  // we are passing id here in payload so that we can use it to link the User's id to the Link's userId and get all the links associated with a specific user
      id: user.id,
      email: user.email,
    };
// generating a cookie to check at everypoint so that unauthorised users cannot access dashboard 
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const token = await new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1d')
      .sign(secret);

    const response = Response.json(
      { success: true, message: 'Login successful' },
      { status: 200 }
    );
// setting cookies in the headers
    response.headers.set(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; Max-Age=86400`       // path / means the cookie will be sent with every path request on the page 
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