# 📊 Instagram Media Insights API

A simple API that takes your Instagram **User ID** and **Access Token** and returns insights about your recent media — including likes, comments, and timestamps.

---

## 🚀 Features
- Retrieve likes and comments counts for your Instagram posts.
- Includes the posting timestamp for each media item.
- Works with the **Instagram Graph API**.
- Lightweight and easy to integrate.

---

## 📦 Example Usage

```http
POST /api/insights
Content-Type: application/json

{
    "user_id": "your_instagram_user_id",
    "token": "your_instagram_access_token"
}

---
Response:
{
    "success": true,
    "data": [
        {
            "id": "17886733602306089",
            "like_count": 15,
            "comments_count": 1,
            "timestamp": "2025-07-03T19:35:59+0000"
        },
        {
            "id": "18079670068705624",
            "like_count": 16,
            "comments_count": 1,
            "timestamp": "2025-05-09T08:36:48+0000"
        },
        {
            "id": "18167803885336829",
            "like_count": 13,
            "comments_count": 1,
            "timestamp": "2025-04-11T12:58:53+0000"
        },
        {
            "id": "18124433020391578",
            "like_count": 9,
            "comments_count": 2,
            "timestamp": "2025-04-06T14:19:26+0000"
        },
        {
            "id": "17970420659276012",
            "like_count": 23,
            "comments_count": 3,
            "timestamp": "2023-03-07T08:38:43+0000"
        }
    ],
    "count": 5,
    "total_media_found": 5,
    "message": "Successfully fetched 5 media items"
}
