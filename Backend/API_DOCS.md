# API Documentation for Frontend Developers

Base URL: `http://your-server:5000/api`

All endpoints return JSON. No authentication required for public APIs.

---

## Members API

### Get All Active Members
```http
GET /api/members
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "position": "President",
    "role_priority": 1,
    "photo_url": "https://accesspicturescloud.vercel.app/members/john.jpg",
    "is_active": true,
    "updated_at": "2024-01-15T10:30:00Z"
  }
]
```

**Notes:**
- Returns only active members
- Sorted by `role_priority` (ascending)
- Lower priority number = higher importance

---

## Events API

### Get All Events
```http
GET /api/events
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Tech Fest 2024",
    "description": "Annual technology festival",
    "date": "2024-03-15T00:00:00Z",
    "event_type": "general",
    "cover_image": "https://accesspicturescloud.vercel.app/events/tech-fest/cover.jpg",
    "gallery": [
      {
        "image_url": "https://accesspicturescloud.vercel.app/events/tech-fest/img1.jpg",
        "caption": "Opening ceremony"
      }
    ],
    "created_at": "2024-01-10T08:00:00Z"
  }
]
```

**Notes:**
- Returns only `event_type: "general"` events
- Sorted by date (descending - newest first)
- Gallery array may be empty

### Get Single Event
```http
GET /api/events/<event_id>
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "Tech Fest 2024",
  "description": "Annual technology festival",
  "date": "2024-03-15T00:00:00Z",
  "event_type": "general",
  "cover_image": "https://accesspicturescloud.vercel.app/events/tech-fest/cover.jpg",
  "gallery": [
    {
      "image_url": "https://accesspicturescloud.vercel.app/events/tech-fest/img1.jpg",
      "caption": "Opening ceremony"
    },
    {
      "image_url": "https://accesspicturescloud.vercel.app/events/tech-fest/img2.jpg",
      "caption": "Keynote speaker"
    }
  ],
  "created_at": "2024-01-10T08:00:00Z"
}
```

**Error Response (404):**
```json
{
  "error": "Event not found"
}
```

---

## CodeX API

### Get Latest CodeX Event
```http
GET /api/codex/latest
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "month": "2024-01",
  "categories": [
    {
      "category_name": "Web Development",
      "winners": [
        {
          "name": "Alice Smith",
          "rank": 1,
          "photo_url": "https://accesspicturescloud.vercel.app/codex/2024-01/web/alice.jpg"
        },
        {
          "name": "Bob Johnson",
          "rank": 2,
          "photo_url": "https://accesspicturescloud.vercel.app/codex/2024-01/web/bob.jpg"
        }
      ]
    },
    {
      "category_name": "Mobile Development",
      "winners": [...]
    }
  ],
  "created_at": "2024-01-05T12:00:00Z"
}
```

**Error Response (404):**
```json
{
  "error": "No CodeX events found"
}
```

### Get CodeX by Month
```http
GET /api/codex/<month>
```

**Example:**
```http
GET /api/codex/2024-01
```

**Response:** Same as latest CodeX

**Error Response (404):**
```json
{
  "error": "CodeX event not found"
}
```

### Get All CodeX Events
```http
GET /api/codex/all
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439013",
    "month": "2024-01",
    "categories": [...],
    "created_at": "2024-01-05T12:00:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439014",
    "month": "2023-12",
    "categories": [...],
    "created_at": "2023-12-05T12:00:00Z"
  }
]
```

**Notes:**
- Sorted by month (descending - newest first)

---

## Frontend Integration Examples

### React Example

```jsx
import { useState, useEffect } from 'react';

function Members() {
  const [members, setMembers] = useState([]);
  
  useEffect(() => {
    fetch('http://your-server:5000/api/members')
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(err => console.error(err));
  }, []);
  
  return (
    <div>
      {members.map(member => (
        <div key={member._id}>
          <img src={member.photo_url} alt={member.name} />
          <h3>{member.name}</h3>
          <p>{member.position}</p>
        </div>
      ))}
    </div>
  );
}
```

### Vanilla JavaScript Example

```javascript
// Fetch members
async function loadMembers() {
  try {
    const response = await fetch('http://your-server:5000/api/members');
    const members = await response.json();
    
    const container = document.getElementById('members-container');
    members.forEach(member => {
      const div = document.createElement('div');
      div.innerHTML = `
        <img src="${member.photo_url}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p>${member.position}</p>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error('Error loading members:', error);
  }
}

loadMembers();
```

### Next.js Example (Server-Side)

```jsx
export async function getServerSideProps() {
  const res = await fetch('http://your-server:5000/api/members');
  const members = await res.json();
  
  return {
    props: { members }
  };
}

export default function MembersPage({ members }) {
  return (
    <div>
      {members.map(member => (
        <div key={member._id}>
          <img src={member.photo_url} alt={member.name} />
          <h3>{member.name}</h3>
          <p>{member.position}</p>
        </div>
      ))}
    </div>
  );
}
```

---

## CORS Configuration

If your frontend is on a different domain, you may need to enable CORS.

Add to `app.py`:

```python
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    # ... rest of setup
```

Install CORS package:
```bash
pip install flask-cors
```

---

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200 OK` - Success
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

Always check response status in your frontend:

```javascript
fetch('/api/members')
  .then(res => {
    if (!res.ok) throw new Error('Failed to fetch');
    return res.json();
  })
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

## Data Types

### Date Fields
All date fields are ISO 8601 strings:
```
"2024-01-15T10:30:00Z"
```

Parse in JavaScript:
```javascript
const date = new Date(event.date);
```

### ObjectId Fields
MongoDB `_id` fields are strings in API responses:
```
"507f1f77bcf86cd799439011"
```

---

## Best Practices

1. **Cache responses** when appropriate (members don't change frequently)
2. **Handle loading states** in your UI
3. **Handle errors gracefully** with user-friendly messages
4. **Lazy load images** for better performance
5. **Use environment variables** for API base URL

```javascript
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

---

## Testing APIs

Use curl or Postman to test:

```bash
# Get members
curl http://localhost:5000/api/members

# Get events
curl http://localhost:5000/api/events

# Get latest CodeX
curl http://localhost:5000/api/codex/latest
```

---

## Questions?

Contact backend team or refer to README.md for more details.
