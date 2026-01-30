from pymongo import MongoClient
from datetime import datetime
import os

# Connect to MongoDB
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/acses_db')
client = MongoClient(MONGO_URI)
db = client['acses_db']
events_collection = db.events

# Clear existing CodeX events
events_collection.delete_many({"event_type": "codex"})

codex_events = [
    {
        "title": "CODEX NOVEMBER",
        "description": "Competitive Programming Competition",
        "date": datetime(2024, 11, 1),
        "event_type": "codex",
        "cover_image": "https://acsespicscloud.vercel.app/codex/nov/cover.jpg",
        "gallery": [],
        "codex_categories": [
            {
                "category_name": "Category 1",
                "winners": [
                    {"name": "Lakshaya Jain", "photo_url": "https://acsespicscloud.vercel.app/codex/nov/c1aNov.jpg", "rank": 1},
                    {"name": "Ameya Deshpande", "photo_url": "https://acsespicscloud.vercel.app/codex/nov/c1bNov.jpg", "rank": 2},
                    {"name": "Darsh Upadhyay", "photo_url": "https://acsespicscloud.vercel.app/codex/nov/c1cNov.jpg", "rank": 3}
                ]
            },
            {
                "category_name": "Category 2",
                "winners": [
                    {"name": "Mayank Asutkar", "photo_url": "https://acsespicscloud.vercel.app/codex/nov/c2aNov.jpg", "rank": 1},
                    {"name": "Vrushabh", "photo_url": "https://acsespicscloud.vercel.app/codex/nov/c2bNov.jpg", "rank": 2},
                    {"name": "Ravitej Mulay", "photo_url": "https://acsespicscloud.vercel.app/codex/nov/c2cNov.jpg", "rank": 3}
                ]
            },
            {
                "category_name": "Category 3",
                "winners": [
                    {"name": "Hitesh Ghanchi", "photo_url": "https://acsespicscloud.vercel.app/codex/nov/c3aNov.jpg", "rank": 1},
                    {"name": "Aniruddh Saraf", "photo_url": "https://acsespicscloud.vercel.app/codex/nov/c3bNov.jpg", "rank": 2},
                    {"name": "Pranav Tanawade", "photo_url": "https://acsespicscloud.vercel.app/codex/nov/c3cNov.jpg", "rank": 3}
                ]
            }
        ],
        "event_photos": [
            "https://acsespicscloud.vercel.app/codex/nov/photo1.jpg",
            "https://acsespicscloud.vercel.app/codex/nov/photo2.jpg",
            "https://acsespicscloud.vercel.app/codex/nov/photo3.jpg"
        ],
        "created_at": datetime.utcnow()
    },
    {
        "title": "CODEX OCTOBER",
        "description": "Competitive Programming Competition",
        "date": datetime(2024, 10, 1),
        "event_type": "codex",
        "cover_image": "https://acsespicscloud.vercel.app/codex/oct/cover.jpg",
        "gallery": [],
        "codex_categories": [
            {
                "category_name": "Category 1",
                "winners": [
                    {"name": "Lakshaya Jain", "photo_url": "https://acsespicscloud.vercel.app/codex/oct/c1aOct.jpg", "rank": 1},
                    {"name": "Taksh Doshi", "photo_url": "https://acsespicscloud.vercel.app/codex/oct/c1bOct.jpg", "rank": 2},
                    {"name": "Ireesh Patil", "photo_url": "https://acsespicscloud.vercel.app/codex/oct/c1cOct.jpg", "rank": 3}
                ]
            },
            {
                "category_name": "Category 2",
                "winners": [
                    {"name": "Nitesh Semwal", "photo_url": "https://acsespicscloud.vercel.app/codex/oct/c2aOct.jpg", "rank": 1},
                    {"name": "Rugved Chavan", "photo_url": "https://acsespicscloud.vercel.app/codex/oct/c2bOct.jpg", "rank": 2},
                    {"name": "Pradyumna Acharyya", "photo_url": "https://acsespicscloud.vercel.app/codex/oct/c2cOct.jpg", "rank": 3}
                ]
            },
            {
                "category_name": "Category 3",
                "winners": [
                    {"name": "Aniruddh Saraf", "photo_url": "https://acsespicscloud.vercel.app/codex/oct/c3aOct.jpg", "rank": 1},
                    {"name": "Hitesh Ghanchi", "photo_url": "https://acsespicscloud.vercel.app/codex/oct/c3bOct.jpg", "rank": 2},
                    {"name": "Shiven Shukla", "photo_url": "https://acsespicscloud.vercel.app/codex/oct/c3cOct.jpg", "rank": 3}
                ]
            }
        ],
        "event_photos": [
            "https://acsespicscloud.vercel.app/codex/oct/photo1.jpg",
            "https://acsespicscloud.vercel.app/codex/oct/photo2.jpg",
            "https://acsespicscloud.vercel.app/codex/oct/photo3.jpg"
        ],
        "created_at": datetime.utcnow()
    }
]

# Insert CodeX events
result = events_collection.insert_many(codex_events)
print(f"Seeded {len(result.inserted_ids)} CodeX events")
print("  - CODEX NOVEMBER (9 winners across 3 categories)")
print("  - CODEX OCTOBER (9 winners across 3 categories)")
print("\nNote: Update image URLs in the admin panel once photos are uploaded to Vercel")

client.close()
