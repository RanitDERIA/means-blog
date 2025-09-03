import db from "../../../Firebase/Firebase-admin";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ 
      error: "Method Not Allowed",
      message: "This endpoint only accepts GET requests" 
    });
  }

  try {
    const { pid } = req.query;

    if (!pid) {
      return res.status(400).json({ 
        error: "Bad Request",
        message: "Post ID is required" 
      });
    }

    console.log('Fetching likes for post:', pid);

    let totalLikes = 0;
    
    const likeRef = db.collection("posts").doc(pid).collection("likes");
    const snapshot = await likeRef.get();

    totalLikes = snapshot.size;

    console.log(`Post ${pid} has ${totalLikes} likes`);

    res.status(200).json({ 
      totalLikes: totalLikes,
      postId: pid,
      // Note: hasUserLiked will be handled by the frontend using localStorage
      hasUserLiked: false 
    });

  } catch (error) {
    console.error('Error in likes API:', error);
    
    res.status(500).json({ 
      error: "Internal Server Error",
      message: "An error occurred while fetching likes",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      hasUserLiked: false,
      totalLikes: 0
    });
  }
}