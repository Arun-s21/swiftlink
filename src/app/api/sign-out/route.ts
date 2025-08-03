import { NextResponse } from "next/server";         //NextResponse contains powerful features like modifying cookies and redirecting the user 
//NextRequest is used when we have to read the url or specific parts of url 

export async function GET(){        //GET only receives the request like request:NextRequest so we cant pass response:NextResponse inside it

    try{

        //we have to define the response object 

        const response = NextResponse.json({
            success:true,message:'Logout successful'
        },
    {status:200});

        response.cookies.set('token','',{
            httpOnly:true,
            path:'/',
            expires: new Date(0)

        });

        return response;

        



    }

    catch(_error){
        return NextResponse.json({
            success:false,message:'Error occurred while signing out'
        },
    {status:500});
    }


}
