import db from "../../Firebase/Firebase-admin";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ 
      error: "Method Not Allowed",
      message: "This endpoint only accepts POST requests" 
    });
  }

  try {
    const { id: pid, browserId } = req.body;

    // Validate required data
    if (!pid) {
      return res.status(400).json({ 
        error: "Bad Request",
        message: "Post ID is required" 
      });
    }

    if (!browserId) {
      return res.status(400).json({ 
        error: "Bad Request",
        message: "Browser ID is required" 
      });
    }

    console.log('Processing like for post:', pid, 'from browser:', browserId);

    const likeRef = db.collection("posts").doc(pid).collection("likes");
    
    // Check if this browser has already liked the post
    const existingLike = await likeRef.where("browserId", "==", browserId).get();
    
    if (existingLike.empty) {
      // Browser hasn't liked yet - add like
      await likeRef.add({ 
        browserId: browserId,
        createdAt: new Date().toISOString(),
        userAgent: req.headers['user-agent'] || 'unknown'
      });
      
      console.log('Like added for post:', pid, 'by browser:', browserId);
      
      res.status(200).json({ 
        message: "Like added successfully",
        action: "liked"
      });
    } else {
      // Browser has already liked - remove like
      const docId = existingLike.docs[0].id;
      await likeRef.doc(docId).delete();
      
      console.log('Like removed for post:', pid, 'by browser:', browserId);
      
      res.status(200).json({ 
        message: "Like removed successfully",
        action: "unliked"
      });
    }

  } catch (error) {
    console.error('Error in like-blog API:', error);
    
    res.status(500).json({ 
      error: "Internal Server Error",
      message: "An error occurred while processing your request",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}