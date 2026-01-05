import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
function initializeFirebaseAdmin() {
  if (getApps().length === 0) {
    // For development, use environment variables
    // For production, use service account
    const projectId = process.env.FIREBASE_PROJECT_ID || "fgck44-a89a0";
    
    initializeApp({
      projectId,
      // If you have service account credentials, add them here:
      // credential: cert({
      //   projectId: process.env.FIREBASE_PROJECT_ID,
      //   clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      //   privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      // }),
    });
  }
  return getFirestore();
}

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
    
    const db = initializeFirebaseAdmin();
    const pageVisitsRef = db.collection("pageVisits");
    
    // Check for duplicate visit within 5 minutes
    const fiveMinutesAgo = timestamp - (5 * 60 * 1000);
    const duplicateQuery = await pageVisitsRef
      .where("visitorId", "==", visitorId)
      .where("page", "==", page)
      .where("timestamp", ">=", fiveMinutesAgo)
      .limit(1)
      .get();
    
    if (!duplicateQuery.empty) {
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
    
    await pageVisitsRef.add(visitData);
    
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
