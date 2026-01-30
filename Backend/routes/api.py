from flask import Blueprint, jsonify, current_app, request
from bson import ObjectId

api_bp = Blueprint('api', __name__, url_prefix='/api')

def serialize_doc(doc):
    """Convert MongoDB document to JSON-serializable dict"""
    if doc is None:
        return None
    doc['_id'] = str(doc['_id'])
    if 'date' in doc:
        doc['date'] = doc['date'].isoformat()
    if 'created_at' in doc:
        doc['created_at'] = doc['created_at'].isoformat()
    if 'updated_at' in doc:
        doc['updated_at'] = doc['updated_at'].isoformat()
    return doc

@api_bp.route('/members', methods=['GET'])
def get_members():
    """Get all members, optionally filtered by memberType or department"""
    member_model = current_app.member_model
    member_type = request.args.get('memberType')
    department = request.args.get('department')
    members = member_model.get_all(member_type=member_type, department=department)
    
    # Sort super-core by role priority
    if member_type == 'super-core':
        role_order = {
            'Chairperson': 1,
            'Vice Chairperson': 2,
            'Secretary': 3,
            'Joint Secretary': 4,
            'Finance Head': 5,
            'Tech Head': 6
        }
        members.sort(key=lambda m: role_order.get(m.get('role', ''), 99))
    
    return jsonify([serialize_doc(m) for m in members])

@api_bp.route('/members/by-department', methods=['GET'])
def get_members_by_department():
    """Get core members grouped by department"""
    member_model = current_app.member_model
    grouped = member_model.get_by_department()
    result = []
    for group in grouped:
        result.append({
            "department": group["_id"],
            "members": [serialize_doc(m) for m in group["members"]]
        })
    return jsonify(result)

@api_bp.route('/events', methods=['GET'])
def get_events():
    """Get all general events"""
    event_model = current_app.event_model
    events = event_model.get_all(event_type='general')
    return jsonify([serialize_doc(e) for e in events])

@api_bp.route('/events/<event_id>', methods=['GET'])
def get_event(event_id):
    """Get single event with full details"""
    event_model = current_app.event_model
    event = event_model.get_by_id(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    return jsonify(serialize_doc(event))

@api_bp.route('/codex/latest', methods=['GET'])
def get_latest_codex():
    """Get most recent CodeX event"""
    event_model = current_app.event_model
    events = event_model.get_all(event_type='codex')
    if not events:
        return jsonify({"error": "No CodeX events found"}), 404
    return jsonify(serialize_doc(events[0]))

@api_bp.route('/codex/<month>', methods=['GET'])
def get_codex_by_month(month):
    """Get CodeX event for specific month"""
    event_model = current_app.event_model
    events = event_model.get_all(event_type='codex')
    for event in events:
        event_month = event['date'].strftime('%Y-%m') if hasattr(event['date'], 'strftime') else event['date'][:7]
        if event_month == month or event['title'].lower().endswith(month.lower()):
            return jsonify(serialize_doc(event))
    return jsonify({"error": "CodeX event not found"}), 404

@api_bp.route('/codex/all', methods=['GET'])
def get_all_codex():
    """Get all CodeX events"""
    event_model = current_app.event_model
    events = event_model.get_all(event_type='codex')
    for event in events:
        event['month'] = event['date'].strftime('%Y-%m') if hasattr(event['date'], 'strftime') else event['date'][:7]
    return jsonify([serialize_doc(e) for e in events])
