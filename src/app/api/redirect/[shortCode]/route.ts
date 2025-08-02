import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from 'next/server'; 
const prisma = new PrismaClient();

export async function GET(request:NextRequest, {params}:{params:{shortCode:string}}){

    try{

        const {shortCode} = await params;  // or const shortCode=params.shortCode params is an object which contains shortCode like params:{shortCode:asda123s}
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