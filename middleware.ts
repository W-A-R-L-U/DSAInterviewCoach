import { NextResponse} from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value || "";

    const authPages = ["/user/login", "/user/signup", "/user/verifyemail"];
    const isAuthPage = authPages.includes(path);
    const isProtectedPage = path === "/user/profile";
    
    if (isAuthPage && token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (isProtectedPage && !token) {
        return NextResponse.redirect(new URL("/user/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/user/login", "/user/signup", "/user/verifyemail", "/user/profile"],
};