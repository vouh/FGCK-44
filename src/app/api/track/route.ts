import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/features/firebase/firebaseConfig";

// Validate page value
function isValidPage(page: unknown): page is "home" | "blog" | "sermons" {
  return page === "home" || page === "blog" || page === "sermons";
}

// POST /api/track
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { visitorId, page, screenWidth, timestamp } = body;
    
    // Validate required fields
    if (!visitorId || typeof visitorId !== "string") {
      return NextResponse.json(
        { error: "Invalid visitorId" },
        { status: 400 }
      );
    }
    
    if (!isValidPage(page)) {
      return NextResponse.json(
        { error: "Invalid page. Must be 'home', 'blog', or 'sermons'" },
        { status: 400 }
      );
    }
    
    if (typeof screenWidth !== "number" || screenWidth < 0) {
      return NextResponse.json(
        { error: "Invalid screenWidth" },
        { status: 400 }
      );
    }
    
    if (typeof timestamp !== "number" || timestamp < 0) {
      return NextResponse.json(
        { error: "Invalid timestamp" },
        { status: 400 }
      );
    }
    
    const pageVisitsRef = collection(db, "pageVisits");
    
    // Check for duplicate visit within 5 minutes
    const fiveMinutesAgo = timestamp - (5 * 60 * 1000);
    const duplicateQuery = query(
      pageVisitsRef,
      where("visitorId", "==", visitorId),
      where("page", "==", page),
      where("timestamp", ">=", fiveMinutesAgo)
    );
    
    const duplicateSnapshot = await getDocs(duplicateQuery);
    
    if (!duplicateSnapshot.empty) {
      return NextResponse.json(
        { message: "Duplicate visit ignored" },
        { status: 200 }
      );
    }
    
    // Save the visit
    const visitData = {
      visitorId,
      page,
      screenWidth,
      timestamp,
    };
    
    await addDoc(pageVisitsRef, visitData);
    
    return NextResponse.json(
      { message: "Visit tracked successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[API /track] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// OPTIONS for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
