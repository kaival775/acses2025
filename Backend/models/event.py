from datetime import datetime
from bson import ObjectId

class Event:
    def __init__(self, db):
        self.collection = db.events
        self._ensure_indexes()
    
    def _ensure_indexes(self):
        """Create indexes for performance"""
        self.collection.create_index([("date", -1)])
        self.collection.create_index([("event_type", 1)])
    
    def create(self, title: str, description: str, date: datetime, 
               event_type: str, cover_image: str, gallery: list = None, 
               codex_categories: list = None, event_photos: list = None, winners: list = None) -> str:
        """Create new event"""
        event = {
            "title": title,
            "description": description,
            "date": date,
            "event_type": event_type,
            "cover_image": cover_image,
            "gallery": gallery or [],
            "event_photos": event_photos or [],
            "winners": winners or [],
            "created_at": datetime.utcnow()
        }
        
        if event_type == 'codex':
            event['codex_categories'] = codex_categories or []
        
        result = self.collection.insert_one(event)
        return str(result.inserted_id)
    
    def update(self, event_id: str, **kwargs) -> bool:
        """Update event fields"""
        result = self.collection.update_one(
            {"_id": ObjectId(event_id)},
            {"$set": kwargs}
        )
        return result.modified_count > 0
    
    def add_gallery_image(self, event_id: str, image_url: str, caption: str = "") -> bool:
        """Add image to event gallery"""
        result = self.collection.update_one(
            {"_id": ObjectId(event_id)},
            {"$push": {"gallery": {"image_url": image_url, "caption": caption}}}
        )
        return result.modified_count > 0
    
    def remove_gallery_image(self, event_id: str, image_url: str) -> bool:
        """Remove image from gallery"""
        result = self.collection.update_one(
            {"_id": ObjectId(event_id)},
            {"$pull": {"gallery": {"image_url": image_url}}}
        )
        return result.modified_count > 0
    
    def delete(self, event_id: str) -> bool:
        """Delete event"""
        result = self.collection.delete_one({"_id": ObjectId(event_id)})
        return result.deleted_count > 0
    
    def get_all(self, event_type: str = None):
        """Get all events, optionally filtered by type"""
        query = {"event_type": event_type} if event_type else {}
        return list(self.collection.find(query).sort("date", -1))
    
    def get_by_id(self, event_id: str):
        """Get single event"""
        return self.collection.find_one({"_id": ObjectId(event_id)})
