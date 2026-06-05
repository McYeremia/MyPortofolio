import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, SESSION_COOKIE } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sections = await prisma.projectSection.findMany({
      where: { projectId: parseInt(id) },
      orderBy: { order: "asc" },
    });
    return NextResponse.json(sections);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();
    const section = await prisma.projectSection.create({
      data: {
        projectId: parseInt(id),
        title: body.title ?? null,
        description: body.description,
        imageUrl: body.imageUrl ?? null,
        order: body.order ?? 0,
      },
    });
    return NextResponse.json(section, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
