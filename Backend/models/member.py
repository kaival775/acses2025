from datetime import datetime
from bson import ObjectId

class Member:
    def __init__(self, db):
        self.collection = db.members
        self._ensure_indexes()
    
    def _ensure_indexes(self):
        """Create indexes for performance"""
        self.collection.create_index([("memberType", 1)])
        self.collection.create_index([("department", 1)])
    
    def create(self, name: str, image_url: str, role: str, member_type: str, department: str = None,
               linkedin: str = None, github: str = None, email: str = None) -> str:
        """Create new member"""
        member = {
            "name": name,
            "imageUrl": image_url,
            "role": role,
            "memberType": member_type,  # faculty, super-core, core
            "department": department,  # Only for core members
            "linkedin": linkedin,
            "github": github,
            "email": email,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
        result = self.collection.insert_one(member)
        return str(result.inserted_id)
    
    def update(self, member_id: str, **kwargs) -> bool:
        """Update member fields"""
        kwargs['updatedAt'] = datetime.utcnow()
        result = self.collection.update_one(
            {"_id": ObjectId(member_id)},
            {"$set": kwargs}
        )
        return result.modified_count > 0
    
    def delete(self, member_id: str) -> bool:
        """Delete member"""
        result = self.collection.delete_one({"_id": ObjectId(member_id)})
        return result.deleted_count > 0
    
    def get_all(self, member_type: str = None, department: str = None):
        """Get all members, optionally filtered by member_type or department"""
        query = {}
        if member_type:
            query["memberType"] = member_type
        if department:
            query["department"] = department
        return list(self.collection.find(query).sort("createdAt", -1))
    
    def get_by_id(self, member_id: str):
        """Get single member"""
        return self.collection.find_one({"_id": ObjectId(member_id)})
    
    def get_by_department(self):
        """Get core members grouped by department"""
        pipeline = [
            {"$match": {"memberType": "core"}},
            {"$group": {
                "_id": "$department",
                "members": {"$push": "$$ROOT"}
            }},
            {"$sort": {"_id": 1}}
        ]
        return list(self.collection.aggregate(pipeline))
