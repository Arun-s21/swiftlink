import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request:NextRequest) {

    const path = request.nextUrl.pathname;  //only gives path i.e /dashboard or /sign-up

    const isProtectedPath=path.startsWith('/dashboard');

    const token = request.cookies.get('token')?.value || '';

    if(isProtectedPath){

        if(!token){
            return NextResponse.redirect(new URL('/sign-in',request.url));    // request.url gives the entire url
        }

        try{

            const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

            await jwtVerify(token,secret);

            return NextResponse.next();


        }
        catch(_error){ 
            // alert('Some error occurred while signing in... Please log in again'); cannot write like this since middleware is backend code not frontend
            return NextResponse.redirect(new URL('/sign-in',request.url));

        }

        



    }
    return NextResponse.next();
    
    
}


export const config = {
    matcher: ['/dashboard'],
};