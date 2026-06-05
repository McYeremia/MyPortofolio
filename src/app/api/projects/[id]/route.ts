import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, SESSION_COOKIE } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const project = await prisma.project.update({
    where: { id: parseInt(id) },
    data: {
      title: body.title,
      category: body.category,
      year: body.year,
      description: body.description ?? null,
      githubUrl: body.githubUrl ?? null,
      liveUrl: body.liveUrl ?? null,
      thumbnailUrl: body.thumbnailUrl ?? null,
      layout: body.layout ?? "plain",
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(project);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.project.delete({ where: { id: parseInt(id) } });

  return NextResponse.json({ success: true });
}
