import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, SESSION_COOKIE } from "@/lib/auth";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const project = await prisma.project.create({
      data: {
        title: body.title,
        category: body.category,
        year: body.year,
        description: body.description ?? null,
        githubUrl: body.githubUrl ?? null,
        liveUrl: body.liveUrl ?? null,
        thumbnailUrl: body.thumbnailUrl ?? null,
        order: body.order ?? 0,
      },
    });
    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
