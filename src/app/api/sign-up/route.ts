import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request:Request){
    try{

        const {email,password} = await request.json();

        const existingUser = await prisma.user.findUnique({
            where:{
                email:email
            },
        });

        if(existingUser){
            return Response.json({
                success:false,message:'User with this email already exists'
            },
        {status:400});
        }

        const hashedPass  = await bcrypt.hash(password,10);

        const newUser = await prisma.user.create({
            data:{
                email:email,
                password:hashedPass
            },



        });


        return Response.json({
            success:true,message:'User registered successfully'
        },
    {status:200});



    }


    catch(error){
        console.error('Error registering the user:', error);
        return Response.json({
            success:false,message:'Error registering the user'
        },
    {status:500});
    }
}

