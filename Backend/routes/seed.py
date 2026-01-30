from flask import Blueprint, jsonify, request
from datetime import datetime

seed_bp = Blueprint('seed', __name__, url_prefix='/seed')

# Founder
founder = {"name": "Founder Name", "role": "Founder", "imageUrl": "https://acsespicscloud.vercel.app/members/founder.png"}

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

# Sample Events
events = [
    {
        "title": "Tech Workshop 2024",
        "description": "Annual technical workshop covering latest technologies",
        "date": datetime(2024, 3, 15),
        "event_type": "general",
        "cover_image": "https://acsespicscloud.vercel.app/events/test/cover.jpg",
        "event_photos": [],
        "winners": []
    },
    {
        "title": "CodeX October 2024",
        "description": "Monthly coding competition",
        "date": datetime(2024, 10, 20),
        "event_type": "codex",
        "cover_image": "https://acsespicscloud.vercel.app/codex/oct/cover.jpg",
        "codex_categories": [
            {"category_name": "Web Development", "winners": []},
            {"category_name": "Data Structures", "winners": []}
        ],
        "event_photos": [],
        "winners": []
    },
    {
        "title": "CodeX November 2024",
        "description": "Monthly coding competition",
        "date": datetime(2024, 11, 20),
        "event_type": "codex",
        "cover_image": "https://acsespicscloud.vercel.app/codex/nov/cover.jpg",
        "codex_categories": [
            {"category_name": "Algorithms", "winners": []},
            {"category_name": "Problem Solving", "winners": []}
        ],
        "event_photos": [],
        "winners": []
    }
]

@seed_bp.route('/run', methods=['POST'])
def seed_database():
    from flask import current_app
    
    # Simple security check
    secret = request.json.get('secret') if request.json else None
    if secret != 'acses2025seed':
        return jsonify({"error": "Unauthorized"}), 401
    
    try:
        member_model = current_app.member_model
        event_model = current_app.event_model
        
        # Clear existing data
        member_model.collection.delete_many({})
        event_model.collection.delete_many({})
        
        total_members = 0
        
        # Insert Founder
        member_model.create(
            founder["name"], founder["imageUrl"], founder["role"],
            "founder", None, None, None, None
        )
        total_members += 1
        
        # Insert Faculty
        for member in faculty:
            member_model.create(
                member["name"], member["imageUrl"], member["role"], 
                "faculty", None, None, None, None
            )
            total_members += 1
        
        # Insert Super Core
        for member in super_core:
            member_model.create(
                member["name"], member["imageUrl"], member["role"],
                "super-core", None, None, None, None
            )
            total_members += 1
        
        # Insert Core Team
        for department, members in core_team.items():
            for member in members:
                member_model.create(
                    member["name"], member["imageUrl"], department,
                    "core", department, None, None, None
                )
                total_members += 1
        
        # Insert Events
        total_events = 0
        for event in events:
            event_model.create(
                event["title"],
                event["description"],
                event["date"],
                event["event_type"],
                event["cover_image"],
                None,
                event.get("codex_categories"),
                event.get("event_photos", []),
                event.get("winners", [])
            )
            total_events += 1
        
        return jsonify({
            "success": True,
            "message": "Database seeded successfully",
            "total_members": total_members,
            "total_events": total_events
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
