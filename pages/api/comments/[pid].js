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

    console.log('Fetching comments for post:', pid);

    const commentsRef = db.collection("posts").doc(pid).collection("comments");
    const snapshot = await commentsRef.orderBy("date", "desc").get();
    
    const comments = [];
    
    snapshot.forEach((doc) => {
      const docData = doc.data();
      
      // Ensure date exists and handle it properly
      let formattedDate = 'Unknown date';
      if (docData.date && typeof docData.date.toDate === 'function') {
        formattedDate = docData.date.toDate().toDateString();
      } else if (docData.date) {
        // Handle if date is already a string or different format
        formattedDate = new Date(docData.date).toDateString();
      }

      // Helper function to get the best available image URL
      const getUserImage = (data) => {
        // Try different possible image fields
        const imageFields = [
          data.userImage,
          data.photoURL,
          data.picture,
          data.avatar_url,
          data.profilePicture,
          data.originalPhotoURL
        ];

        for (const field of imageFields) {
          if (field && typeof field === 'string' && field.trim() !== '') {
            // Validate that it's a proper URL
            try {
              new URL(field);
              return field;
            } catch (e) {
              continue;
            }
          }
        }

        // Generate fallback avatar based on user name
        const userName = data.userName || 'User';
        return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=6366f1&color=fff&size=128`;
      };

      const data = {
        id: doc.id,
        comment: docData.comment || '',
        userName: docData.userName || 'Anonymous',
        userImage: getUserImage(docData),
        date: formattedDate,
        userId: docData.userId || '',
        // Include original data for debugging
        originalPhotoURL: docData.originalPhotoURL || null,
        originalUserImage: docData.userImage || null,
      };
      
      comments.push(data);
    });

    console.log(`Found ${comments.length} comments for post ${pid}`);

    // Log image URLs for debugging
    if (process.env.NODE_ENV === 'development') {
      comments.forEach(comment => {
        console.log(`Comment ${comment.id}: Image URL = ${comment.userImage}`);
      });
    }

    res.status(200).json({ 
      comments: comments,
      total: comments.length,
      postId: pid
    });

  } catch (error) {
    console.error('Error fetching comments:', error);
    
    res.status(500).json({ 
      error: "Internal Server Error",
      message: "An error occurred while fetching comments",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      comments: []
    });
  }
}