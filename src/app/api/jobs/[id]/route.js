import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const db = await getDb();
    const collection = db.collection("jobs");
    
    // In Next.js App Router (especially newer versions), params should be awaited.
    const resolvedParams = await params;
    const { id } = resolvedParams;

    let query = {};
    try {
      query = { _id: new ObjectId(id) };
    } catch (e) {
      return NextResponse.json({ error: "Invalid Job ID format" }, { status: 400 });
    }

    const job = await collection.findOne(query);

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    // Map _id to id string
    const formattedJob = {
      ...job,
      id: job._id.toString(),
      _id: undefined
    };

    // Fetch related jobs in the same category (excluding the current job)
    const relatedJobs = await collection
      .find({
        category: job.category,
        _id: { $ne: job._id }
      })
      .limit(3)
      .toArray();

    const formattedRelated = relatedJobs.map(r => ({
      ...r,
      id: r._id.toString(),
      _id: undefined
    }));

    return NextResponse.json({
      job: formattedJob,
      relatedJobs: formattedRelated
    });
  } catch (error) {
    console.error("Error in GET /api/jobs/[id]:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
