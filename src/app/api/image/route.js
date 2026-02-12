import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// export async function GET(){
//     const filpath = path.join(process.cwd(), "public", "images", "CENEX.png");
//     const imageBuffer = fs.readFileSync(filpath);
//     return new NextResponse(imageBuffer, {
//         headers: {
//             "Content-Type": "image/jpeg",
//         },
//     });
// }

export async function GET(req){
    const { searchParams } = new URL(req.url)
    const name = searchParams.get("name");

    if (!name){
        return NextResponse.json({error: "Name parameter is required"}, {status: 400})
    }
    const filepath = path.join(process.cwd(), "public", "images", name);
    if ( ! fs.existsSync(filepath)){
        return NextResponse.json({error: "Image not found"}, {status: 404})
    }
    const imageBuffer = fs.readFileSync(filepath);
    return new NextResponse(imageBuffer, {
        headers: {
            "Content-Type": "image/png",
        },
    });
}