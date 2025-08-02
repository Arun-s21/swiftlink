import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from 'next/server'; 
const prisma = new PrismaClient();

type ContextType = {
  params: {
    shortCode: string;
  };
};

export async function GET(request:NextRequest, { params }: ContextType){

    try{

        const shortCode = params.shortCode;  //we named the folder[shortCode] so nextjs knows anything after /redirect is shortCode and creates a params object which stores this shortCode variable
 // or const shortCode=context.shortCode params is an object which contains shortCode like context:{shortCode:asda123s}
        const link = await prisma.link.findUnique({
            where:{shortCode}
        });

        if(!link){
            return NextResponse.json({
                success:false,message:'Link not found'
            },
        {status:404});
        }

        prisma.link.update({
            where:{id:link.id},
            data:{clicks:{increment:1}}
        });

        return NextResponse.json({
            success:true,originalUrl:link.originalUrl
        },
    {status:200});


    }

    catch(error){
        console.error('Error fetching the link:',error);
        return NextResponse.json({
            success:false,message:'Error fetching the link'
        },
    {status:500});

    }


}