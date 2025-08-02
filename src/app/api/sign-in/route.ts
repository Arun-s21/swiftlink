import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';

const prisma = new PrismaClient();

export async function POST(request:Request){
        try{

            const{email, password} = await request.json();

            const user = prisma.user.findUnique({
                where:{
                    email:email
                }
            });

            if(!user){
                return Response.json({
                    success:false,message:'Invalid credentials'   
                },
            {status:401});

            }

            const isPassCorrect = bcrypt.compare(password,user.password);  //we didnt hash the pass here ? hashing is done internally here

            if(!isPassCorrect){
                return Response.json({
                    success:false,message:'Invalid credentials'   
                },
            {status:401});

            }

            //both email and pass is correct so we make a jwt to give to the user as cookie and let them access forbidden paths


            const tokenPayload = {
                id:user._id,
                email:email

            };

            const secret=new TextEncoder().encode(process.env.JWT_SECRET!);

            const token = await new SignJWT(tokenPayload).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('1d').sign(secret);
            //necessary to define algo everytime? yes
            //expiration date here is checked by the backend using jwtVerify it protects the server from older tokens
            //token is sent to browser as cookie which the browser stores and sends to the backend with every request it makes
            //backend checks the token using jwtVerify and if it is under the time frame then it allows the user to proceed further with the requests

            const response = Response.json({
                success:true,message:'Login successful'
            },
        {
            status:200
        });

        response.headers.set('Set-Cookie',`token=${token};HttpOnly;Path=/;Max-Age=86400 `); //what is path? tells where to send this cookie
        //in this case / means the root so with every api request this cookie will be sent by the browser
        //max age tells after how much time the browser can delete the cookie
        //cookie is checked by the browser

        return response;


        }

        catch(error){
            console.error('Error during sign-in:', error);
            return Response.json({
                success:false,message:'Error during sign-in'
            },
        {status:500});
        }



}