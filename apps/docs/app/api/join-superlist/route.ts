import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        //parser
        const data = await req.json();
        // to check email already exist
        const isExist = await fetch(`https://api.notion.com/v1/databases/${data.parent.database_id}/query`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${process.env.NOTION_DB_KEY}`,
                "Notion-Version": "2022-06-28",
            },
            body: JSON.stringify({
                "filter": {
                    "property": "Email",
                    "email": {
                        "contains": data.properties.Email.email
                    }
                }
            })
        })
        const isExistJSON = await isExist.json();
        if (isExistJSON.results.length) {
            return NextResponse.json({ exist: true }, { status: 200 });
        }
        // POST if it does'nt exist
        const notionRes = await fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${process.env.NOTION_DB_KEY}`,
                "Notion-Version": "2022-06-28",
            },
            body: JSON.stringify(data)
        });
        //parser
        const jsonres = await notionRes.json();
        return NextResponse.json({ res: jsonres }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }

}