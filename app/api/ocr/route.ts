import { NextResponse } from "next/server";
import { createWorker } from "tesseract.js";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const image = formData.get("image") as File | null;

    if (!image) {
      return NextResponse.json({ error: "No image" }, { status: 400 });
    }

    const buffer = Buffer.from(await image.arrayBuffer());

    // Load worker dengan bahasa Inggris DAN Indonesia
    const worker = await createWorker(['eng', 'ind']); 

    const {
      data: { text },
    } = await worker.recognize(buffer);

    await worker.terminate();

    return NextResponse.json({ text });
  } catch (err: any) {
    console.error("OCR ERROR:", err);
    return NextResponse.json(
      { error: err.message || "OCR failed" },
      { status: 500 }
    );
  }
}