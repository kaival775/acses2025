from flask import Blueprint, jsonify, request
from datetime import datetime

seed_bp = Blueprint('seed', __name__, url_prefix='/seed')

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

@seed_bp.route('/run', methods=['POST'])
def seed_database():
    from flask import current_app
    
    # Simple security check
    secret = request.json.get('secret') if request.json else None
    if secret != 'acses2025seed':
        return jsonify({"error": "Unauthorized"}), 401
    
    try:
        member_model = current_app.member_model
        
        # Clear existing members
        member_model.collection.delete_many({})
        
        total = 0
        
        # Insert Faculty
        for member in faculty:
            member_model.create(
                member["name"], member["imageUrl"], member["role"], 
                "faculty", None, None, None, None
            )
            total += 1
        
        # Insert Super Core
        for member in super_core:
            member_model.create(
                member["name"], member["imageUrl"], member["role"],
                "super-core", None, None, None, None
            )
            total += 1
        
        # Insert Core Team
        for department, members in core_team.items():
            for member in members:
                member_model.create(
                    member["name"], member["imageUrl"], department,
                    "core", department, None, None, None
                )
                total += 1
        
        return jsonify({
            "success": True,
            "message": "Database seeded successfully",
            "total_members": total
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
