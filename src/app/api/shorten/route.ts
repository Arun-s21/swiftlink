import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export async function POST(request:Request){

    const {originalUrl} = await request.json();

    try{

        if(!originalUrl){
            return Response.json({
                success:false,message:'URL is required'
            },
        {status:400});
        }

        const shortCode = nanoid(7);  //generates a random short code of 7 length

        const newLink = await prisma.link.create({
            data:{
            originalUrl,
            shortCode
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