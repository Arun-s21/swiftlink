import { PrismaClient } from '@prisma/client';
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function GET(request:NextRequest){
    try{

        const token = request.cookies.get('token')?.value || '';

        if(!token){
            return NextResponse.json({
                success:false,message:'Unauthorized'
            },
        {status:401});
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

        const {payload} = await jwtVerify(token, secret);

        const userId = payload.id as string;

        const links = await prisma.link.findMany({      //we are finding the links in Link table because the actual links are stored in Link 
            //User links Link field doesnt actually exist in User table it is virtual field which tells prisma that there exists a relationship between User and Link
            where:{
                userId:userId               //userId is in the Link table which will tell which userId owns which links
            },                              //we will have to store userId also when we will add the shorten link functionaliy with user signed-in
            orderBy:{
                createdAt:'desc'            //links are ordered from most recent to oldest
            },
        });


        return NextResponse.json({
            success:true,links:links
        },
    {status:200});


    }

    catch(error){
        console.error('Error fetching the links:',error);
        return NextResponse.json({
            success:false,message:'Error fetching the links'
        },
    {status:500});
    }


        
}