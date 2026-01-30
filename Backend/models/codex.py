from datetime import datetime
from bson import ObjectId

class CodeX:
    def __init__(self, db):
        self.collection = db.codex_events
        self._ensure_indexes()
    
    def _ensure_indexes(self):
        """Create indexes for performance"""
        self.collection.create_index([("month", -1)], unique=True)
    
    def create(self, month: str, categories: list) -> str:
        """Create new CodeX event for a month"""
        codex = {
            "month": month,  # Format: YYYY-MM
            "categories": categories,
            "created_at": datetime.utcnow()
        }
        result = self.collection.insert_one(codex)
        return str(result.inserted_id)
    
    def update(self, month: str, categories: list) -> bool:
        """Update CodeX event"""
        result = self.collection.update_one(
            {"month": month},
            {"$set": {"categories": categories}},
            upsert=True
        )
        return result.modified_count > 0 or result.upserted_id is not None
    
    def delete(self, month: str) -> bool:
        """Delete CodeX event"""
        result = self.collection.delete_one({"month": month})
        return result.deleted_count > 0
    
    def get_by_month(self, month: str):
        """Get CodeX event for specific month"""
        return self.collection.find_one({"month": month})
    
    def get_latest(self):
        """Get most recent CodeX event"""
        return self.collection.find_one(sort=[("month", -1)])
    
    def get_all(self):
        """Get all CodeX events"""
        return list(self.collection.find().sort("month", -1))
