import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";
const prisma = new PrismaClient();

export async function POST(request:NextRequest){

    const {originalUrl} = await request.json();

    try{

        if(!originalUrl){
            return Response.json({
                success:false,message:'URL is required'
            },
        {status:400});
        }
        //add new variables so that signed in users can shorten their URLs and see them on their dashboard

        let userId:string | null=null;

        const token = request.cookies.get('token')?.value || '';

        if(token){
            try{
                const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
                const {payload} =await jwtVerify(token,secret);

                userId = payload.id as string;


            }
            catch(error){
                console.log('Invalid token found, proceeding anonymously');
            }
        }




        const shortCode = nanoid(7);  //generates a random short code of 7 length

        const newLink = await prisma.link.create({
            data:{
            originalUrl,
            shortCode,
            ...(userId && {userId:userId}),
            },

        });

        return Response.json({
            success:true,message:'Link shortened successfully',shortCode:newLink.shortCode
        },
    {status:201});



    }

    catch(error){
        console.error('Error shortening URL:', error);
    return Response.json(
      { success: false, message: 'Something went wrong' },
      { status: 500 }
    );
    }

}