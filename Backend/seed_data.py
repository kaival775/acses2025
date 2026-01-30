"""
Seed script to populate database with team members
Run: python seed_data.py
"""

from pymongo import MongoClient
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/acses_db')

# Faculty Coordinators
faculty = [
    {"name": "Dr. Dhananjay Kalbande", "role": "Faculty Coordinator", "imageUrl": "https://acsespicscloud.vercel.app/members/Drk.jpg"},
    {"name": "Dr. Sujata Kulkarni", "role": "Faculty Coordinator", "imageUrl": "https://acsespicscloud.vercel.app/members/SujataKulkarni.jpg"}
]

# Super Core Team
super_core = [
    {"name": "Krishika Jalali", "role": "Chairperson", "imageUrl": "https://acsespicscloud.vercel.app/members/KrishikaJalali.png"},
    {"name": "Darshan Yadav", "role": "Vice Chairperson", "imageUrl": "https://acsespicscloud.vercel.app/members/DarshanYadav.png"},
    {"name": "Paras Sachdeva", "role": "Finance Head", "imageUrl": "https://acsespicscloud.vercel.app/members/ParasSachdeva.png"},
    {"name": "Apurva Khangal", "role": "Secretary", "imageUrl": "https://acsespicscloud.vercel.app/members/ApurvaKhangal.png"},
    {"name": "Suyog Nikam", "role": "Joint Secretary", "imageUrl": "https://acsespicscloud.vercel.app/members/SuyogNikam.png"},
    {"name": "Swaraj Panmand", "role": "Tech Head", "imageUrl": "https://acsespicscloud.vercel.app/members/SwarajPanmand.png"},
    {"name": "Aryan Ahuja", "role": "Tech Head", "imageUrl": "https://acsespicscloud.vercel.app/members/AryanAhuja.png"}
]

# Core Team by Department
core_team = {
    "Creatives": [
        {"name": "Aditya Chavan", "imageUrl": "https://acsespicscloud.vercel.app/members/AdityaChavan.png"},
        {"name": "Swanand Vidyasagar", "imageUrl": "https://acsespicscloud.vercel.app/members/SwanandVidyasagar.png"},
        {"name": "Wasifah Parkar", "imageUrl": "https://acsespicscloud.vercel.app/members/WasifahParkar.png"}
    ],
    "Events": [
        {"name": "Arjun Thakur", "imageUrl": "https://acsespicscloud.vercel.app/members/ArjunThakur.png"},
        {"name": "Shristi Tapse", "imageUrl": "https://acsespicscloud.vercel.app/members/ShristiTapse.png"},
        {"name": "Sahil Sawant", "imageUrl": "https://acsespicscloud.vercel.app/members/SahilSawant.png"}
    ],
    "Tech": [
        {"name": "Kaivalya Sonawane", "imageUrl": "https://acsespicscloud.vercel.app/members/KaivalyaSonawane.png"},
        {"name": "Harsh Patil", "imageUrl": "https://acsespicscloud.vercel.app/members/HarshPatil.png"}
    ],
    "Operations": [
        {"name": "Sai Khedekar", "imageUrl": "https://acsespicscloud.vercel.app/members/SaiKhedekar.png"},
        {"name": "Ankit Das", "imageUrl": "https://acsespicscloud.vercel.app/members/AnkitDas.png"},
        {"name": "Yasharth Poddar", "imageUrl": "https://acsespicscloud.vercel.app/members/YasharthPoddar.png"}
    ],
    "Public Relations": [
        {"name": "Faraz Shaikh", "imageUrl": "https://acsespicscloud.vercel.app/members/FarazShaikh.png"},
        {"name": "Mihir Pukale", "imageUrl": "https://acsespicscloud.vercel.app/members/MihirPukale.png"},
        {"name": "Rajat Raghatwan", "imageUrl": "https://acsespicscloud.vercel.app/members/RajatRaghatwan.png"}
    ],
    "Marketing": [
        {"name": "Swar Shah", "imageUrl": "https://acsespicscloud.vercel.app/members/SwarShah.png"},
        {"name": "Rutuja Kadam", "imageUrl": "https://acsespicscloud.vercel.app/members/RutujaKadam.png"},
        {"name": "Avanishkumar Yadav", "imageUrl": "https://acsespicscloud.vercel.app/members/AvanishkumarYadav.png"}
    ]
}

def seed_database():
    client = MongoClient(MONGO_URI)
    db = client.get_default_database()
    members_collection = db.members
    
    # Clear existing members
    members_collection.delete_many({})
    print("Cleared existing members")
    
    # Insert Faculty
    for member in faculty:
        doc = {
            "name": member["name"],
            "imageUrl": member["imageUrl"],
            "role": member["role"],
            "memberType": "faculty",
            "department": None,
            "linkedin": None,
            "github": None,
            "email": None,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
        members_collection.insert_one(doc)
    print(f"[OK] Inserted {len(faculty)} faculty coordinators")
    
    # Insert Super Core
    for member in super_core:
        doc = {
            "name": member["name"],
            "imageUrl": member["imageUrl"],
            "role": member["role"],
            "memberType": "super-core",
            "department": None,
            "linkedin": None,
            "github": None,
            "email": None,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
        members_collection.insert_one(doc)
    print(f"[OK] Inserted {len(super_core)} super core members")
    
    # Insert Core Team
    total_core = 0
    for department, members in core_team.items():
        for member in members:
            doc = {
                "name": member["name"],
                "imageUrl": member["imageUrl"],
                "role": department,
                "memberType": "core",
                "department": department,
                "linkedin": None,
                "github": None,
                "email": None,
                "createdAt": datetime.utcnow(),
                "updatedAt": datetime.utcnow()
            }
            members_collection.insert_one(doc)
            total_core += 1
    print(f"[OK] Inserted {total_core} core members across {len(core_team)} departments")
    
    print("\n[SUCCESS] Database seeded successfully!")
    print(f"Total members: {len(faculty) + len(super_core) + total_core}")
    
    client.close()

if __name__ == "__main__":
    print("=" * 50)
    print("ACSES Database Seeding")
    print("=" * 50)
    seed_database()
