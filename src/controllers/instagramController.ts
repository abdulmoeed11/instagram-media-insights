import { Request, Response } from "express";
import axios from "axios";

interface InstagramMedia {
  id: string;
  like_count: number;
  comments_count: number;
  timestamp: string;
}

interface InstagramMediaListResponse {
  data: Array<{
    id: string;
  }>;
}

export const fetchInstagramMedia = async (req: Request, res: Response) => {
  try {
    const { user_id, token } = req.body;

    // Validate required fields
    if (!user_id || !token) {
      return res.status(400).json({
        success: false,
        message: "user_id and token are required",
      });
    }

    // Step 1: Get all media IDs from the user
    const mediaListUrl = `https://graph.instagram.com/v23.0/${user_id}/media?access_token=${token}`;

    const mediaListResponse = await axios.get<InstagramMediaListResponse>(
      mediaListUrl
    );
    const mediaIds = mediaListResponse.data.data.map(
      (media: { id: string }) => media.id
    );

    if (mediaIds.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        count: 0,
        message: "No media found for this user",
      });
    }

    // Step 2: Get details for the last 5 media items (or less if fewer exist)
    const mediaToFetch = mediaIds.slice(-5);
    const mediaDetails: InstagramMedia[] = [];

    // Fetch details for each media item
    for (const mediaId of mediaToFetch) {
      try {
        const mediaUrl = `https://graph.instagram.com/v23.0/${mediaId}?fields=like_count,comments_count,timestamp&access_token=${token}`;
        const mediaResponse = await axios.get<InstagramMedia>(mediaUrl);

        // console.log(mediaResponse);
        const mediaData = mediaResponse.data;
        console.log(mediaData);
        if (mediaData) {
          mediaDetails.push({
            id: mediaData.id,
            like_count: mediaData.like_count || 0,
            comments_count: mediaData.comments_count || 0,
            timestamp: mediaData.timestamp,
          });
        }
      } catch (mediaError) {
        console.error(`Error fetching media ${mediaId}:`, mediaError);
        // Continue with other media items even if one fails
      }
    }

    res.status(200).json({
      success: true,
      data: mediaDetails,
      count: mediaDetails.length,
      total_media_found: mediaIds.length,
      message: `Successfully fetched ${mediaDetails.length} media items`,
    });
  } catch (error: unknown) {
    console.error("Instagram API Error:", error);

    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 400) {
        return res.status(400).json({
          success: false,
          message: "Invalid user_id or token",
          error: "Instagram API returned 400 Bad Request",
        });
      } else if (error.response.status === 401) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired access token",
          error: "Instagram API returned 401 Unauthorized",
        });
      } else if (error.response.status === 403) {
        return res.status(403).json({
          success: false,
          message: "Access denied to Instagram API",
          error: "Instagram API returned 403 Forbidden",
        });
      }
    }

    res.status(500).json({
      success: false,
      message: "Error fetching Instagram media",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
