import re
from typing import Literal

class ImageValidator:
    def __init__(self, config):
        self.patterns = config['IMAGE_URL_PATTERNS']
        self.domain = config['ALLOWED_IMAGE_DOMAIN']
    
    def validate_url(self, url: str, category: Literal['members', 'events', 'codex']) -> tuple[bool, str]:
        """Validate image URL against allowed patterns"""
        if not url or not isinstance(url, str):
            return False, "URL is required"
        
        if not url.startswith('https://'):
            return False, "URL must use HTTPS"
        
        if self.domain not in url:
            return False, f"URL must be hosted on {self.domain}"
        
        pattern = self.patterns.get(category)
        if not pattern or not re.match(pattern, url):
            return False, f"URL doesn't match required pattern for {category}"
        
        return True, "Valid"
