import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, SESSION_COOKIE } from "@/lib/auth";

export async function GET() {
  try {
    const about = await prisma.about.findFirst({ where: { id: 1 } });
    return NextResponse.json(about ?? null);
  } catch {
    return NextResponse.json(null);
  }
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const about = await prisma.about.upsert({
      where: { id: 1 },
      update: { bio: body.bio, skills: body.skills, stats: body.stats },
      create: { id: 1, bio: body.bio, skills: body.skills, stats: body.stats },
    });
    return NextResponse.json(about);
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
