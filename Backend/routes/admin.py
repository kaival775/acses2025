from flask import Blueprint, render_template, request, redirect, url_for, flash, current_app
from services.auth_service import AuthService, admin_required
from datetime import datetime

admin_bp = Blueprint('admin', __name__, url_prefix='/admin')

@admin_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if AuthService.login(username, password, current_app.config):
            flash('Login successful', 'success')
            return redirect(url_for('admin.dashboard'))
        flash('Invalid credentials', 'error')
    return render_template('admin/login.html')

@admin_bp.route('/logout')
def logout():
    AuthService.logout()
    flash('Logged out successfully', 'success')
    return redirect(url_for('admin.login'))

@admin_bp.route('/')
@admin_required
def dashboard():
    return render_template('admin/dashboard.html')

# MEMBERS MANAGEMENT
@admin_bp.route('/members')
@admin_required
def members():
    member_model = current_app.member_model
    all_members = member_model.get_all()
    return render_template('admin/members.html', members=all_members)

@admin_bp.route('/members/add', methods=['GET', 'POST'])
@admin_required
def add_member():
    if request.method == 'POST':
        name = request.form.get('name')
        role = request.form.get('role')
        member_type = request.form.get('member_type')
        department = request.form.get('department') if member_type == 'core' else None
        image_url = request.form.get('image_url')
        linkedin = request.form.get('linkedin')
        github = request.form.get('github')
        email = request.form.get('email')
        
        validator = current_app.image_validator
        is_valid, msg = validator.validate_url(image_url, 'members')
        if not is_valid:
            flash(f'Invalid image URL: {msg}', 'error')
            return render_template('admin/member_form.html')
        
        member_model = current_app.member_model
        member_model.create(name, image_url, role, member_type, department, linkedin, github, email)
        flash('Member added successfully', 'success')
        return redirect(url_for('admin.members'))
    
    return render_template('admin/member_form.html')

@admin_bp.route('/members/edit/<member_id>', methods=['GET', 'POST'])
@admin_required
def edit_member(member_id):
    member_model = current_app.member_model
    member = member_model.get_by_id(member_id)
    
    if request.method == 'POST':
        member_type = request.form.get('member_type')
        updates = {
            'name': request.form.get('name'),
            'role': request.form.get('role'),
            'memberType': member_type,
            'department': request.form.get('department') if member_type == 'core' else None,
            'linkedin': request.form.get('linkedin'),
            'github': request.form.get('github'),
            'email': request.form.get('email')
        }
        
        image_url = request.form.get('image_url')
        if image_url != member.get('imageUrl'):
            validator = current_app.image_validator
            is_valid, msg = validator.validate_url(image_url, 'members')
            if not is_valid:
                flash(f'Invalid image URL: {msg}', 'error')
                return render_template('admin/member_form.html', member=member, edit=True)
            updates['imageUrl'] = image_url
        
        member_model.update(member_id, **updates)
        flash('Member updated successfully', 'success')
        return redirect(url_for('admin.members'))
    
    return render_template('admin/member_form.html', member=member, edit=True)

@admin_bp.route('/members/delete/<member_id>', methods=['POST'])
@admin_required
def delete_member(member_id):
    member_model = current_app.member_model
    member_model.delete(member_id)
    flash('Member deleted successfully', 'success')
    return redirect(url_for('admin.members'))

# EVENTS MANAGEMENT
@admin_bp.route('/events')
@admin_required
def events():
    event_model = current_app.event_model
    all_events = event_model.get_all()
    return render_template('admin/events.html', events=all_events)

@admin_bp.route('/events/add', methods=['GET', 'POST'])
@admin_required
def add_event():
    if request.method == 'POST':
        title = request.form.get('title')
        description = request.form.get('description')
        date_str = request.form.get('date')
        event_type = request.form.get('event_type', 'general')
        cover_image = request.form.get('cover_image')
        
        validator = current_app.image_validator
        validation_type = 'codex' if event_type == 'codex' else 'events'
        is_valid, msg = validator.validate_url(cover_image, validation_type)
        if not is_valid:
            flash(f'Invalid cover image URL: {msg}', 'error')
            return render_template('admin/event_form.html')
        
        date = datetime.fromisoformat(date_str)
        codex_categories = None
        event_photos = []
        winners = []
        
        # Handle event photos for all events
        photo_count = int(request.form.get('photo_count', 0))
        for i in range(photo_count):
            photo_url = request.form.get(f'event_photo_{i}')
            if photo_url:
                is_valid, msg = validator.validate_url(photo_url, validation_type)
                if not is_valid:
                    flash(f'Invalid event photo URL: {msg}', 'error')
                    return render_template('admin/event_form.html')
                event_photos.append(photo_url)
        
        # Handle winners for all events
        winner_count = int(request.form.get('winner_count', 0))
        for i in range(winner_count):
            winner_name = request.form.get(f'winner_{i}_name')
            winner_photo = request.form.get(f'winner_{i}_photo')
            winner_position = request.form.get(f'winner_{i}_position', f'{i+1}')
            if winner_name and winner_photo:
                is_valid, msg = validator.validate_url(winner_photo, validation_type)
                if not is_valid:
                    flash(f'Invalid winner photo URL: {msg}', 'error')
                    return render_template('admin/event_form.html')
                winners.append({'name': winner_name, 'photo_url': winner_photo, 'position': winner_position})
        
        if event_type == 'codex':
            codex_categories = []
            for i in range(3):  # 3 categories
                category_name = request.form.get(f'category_{i}_name')
                if category_name:
                    cat_winners = []
                    for j in range(3):  # 3 winners per category
                        winner_name = request.form.get(f'category_{i}_winner_{j}_name')
                        winner_photo = request.form.get(f'category_{i}_winner_{j}_photo')
                        if winner_name and winner_photo:
                            is_valid, msg = validator.validate_url(winner_photo, 'codex')
                            if not is_valid:
                                flash(f'Invalid winner photo URL: {msg}', 'error')
                                return render_template('admin/event_form.html')
                            cat_winners.append({'name': winner_name, 'photo_url': winner_photo, 'rank': j+1})
                    codex_categories.append({'category_name': category_name, 'winners': cat_winners})
        
        event_model = current_app.event_model
        event_model.create(title, description, date, event_type, cover_image, None, codex_categories, event_photos, winners)
        flash('Event added successfully', 'success')
        return redirect(url_for('admin.events'))
    
    return render_template('admin/event_form.html')

@admin_bp.route('/events/edit/<event_id>', methods=['GET', 'POST'])
@admin_required
def edit_event(event_id):
    event_model = current_app.event_model
    event = event_model.get_by_id(event_id)
    
    if request.method == 'POST':
        updates = {
            'title': request.form.get('title'),
            'description': request.form.get('description'),
            'date': datetime.fromisoformat(request.form.get('date')),
            'event_type': request.form.get('event_type', 'general')
        }
        
        cover_image = request.form.get('cover_image')
        validator = current_app.image_validator
        if cover_image != event['cover_image']:
            validation_type = 'codex' if updates['event_type'] == 'codex' else 'events'
            is_valid, msg = validator.validate_url(cover_image, validation_type)
            if not is_valid:
                flash(f'Invalid cover image URL: {msg}', 'error')
                return render_template('admin/event_form.html', event=event, edit=True)
            updates['cover_image'] = cover_image
        
        # Handle event photos for all events
        validation_type = 'codex' if updates['event_type'] == 'codex' else 'events'
        event_photos = []
        photo_count = int(request.form.get('photo_count', 0))
        for i in range(photo_count):
            photo_url = request.form.get(f'event_photo_{i}')
            if photo_url:
                is_valid, msg = validator.validate_url(photo_url, validation_type)
                if not is_valid:
                    flash(f'Invalid event photo URL: {msg}', 'error')
                    return render_template('admin/event_form.html', event=event, edit=True)
                event_photos.append(photo_url)
        updates['event_photos'] = event_photos
        
        # Handle winners for all events
        winners = []
        winner_count = int(request.form.get('winner_count', 0))
        for i in range(winner_count):
            winner_name = request.form.get(f'winner_{i}_name')
            winner_photo = request.form.get(f'winner_{i}_photo')
            winner_position = request.form.get(f'winner_{i}_position', f'{i+1}')
            if winner_name and winner_photo:
                is_valid, msg = validator.validate_url(winner_photo, validation_type)
                if not is_valid:
                    flash(f'Invalid winner photo URL: {msg}', 'error')
                    return render_template('admin/event_form.html', event=event, edit=True)
                winners.append({'name': winner_name, 'photo_url': winner_photo, 'position': winner_position})
        updates['winners'] = winners
        
        if updates['event_type'] == 'codex':
            codex_categories = []
            for i in range(3):
                category_name = request.form.get(f'category_{i}_name')
                if category_name:
                    cat_winners = []
                    for j in range(3):
                        winner_name = request.form.get(f'category_{i}_winner_{j}_name')
                        winner_photo = request.form.get(f'category_{i}_winner_{j}_photo')
                        if winner_name and winner_photo:
                            is_valid, msg = validator.validate_url(winner_photo, 'codex')
                            if not is_valid:
                                flash(f'Invalid winner photo URL: {msg}', 'error')
                                return render_template('admin/event_form.html', event=event, edit=True)
                            cat_winners.append({'name': winner_name, 'photo_url': winner_photo, 'rank': j+1})
                    codex_categories.append({'category_name': category_name, 'winners': cat_winners})
            updates['codex_categories'] = codex_categories
        
        event_model.update(event_id, **updates)
        flash('Event updated successfully', 'success')
        return redirect(url_for('admin.events'))
    
    return render_template('admin/event_form.html', event=event, edit=True)

@admin_bp.route('/events/<event_id>/gallery', methods=['GET', 'POST'])
@admin_required
def manage_gallery(event_id):
    event_model = current_app.event_model
    event = event_model.get_by_id(event_id)
    
    if request.method == 'POST':
        action = request.form.get('action')
        
        if action == 'add':
            image_url = request.form.get('image_url')
            caption = request.form.get('caption', '')
            
            validator = current_app.image_validator
            is_valid, msg = validator.validate_url(image_url, 'events')
            if not is_valid:
                flash(f'Invalid image URL: {msg}', 'error')
            else:
                event_model.add_gallery_image(event_id, image_url, caption)
                flash('Image added to gallery', 'success')
        
        elif action == 'remove':
            image_url = request.form.get('image_url')
            event_model.remove_gallery_image(event_id, image_url)
            flash('Image removed from gallery', 'success')
        
        return redirect(url_for('admin.manage_gallery', event_id=event_id))
    
    return render_template('admin/gallery.html', event=event)

@admin_bp.route('/events/delete/<event_id>', methods=['POST'])
@admin_required
def delete_event(event_id):
    event_model = current_app.event_model
    event_model.delete(event_id)
    flash('Event deleted successfully', 'success')
    return redirect(url_for('admin.events'))

# CODEX MANAGEMENT
@admin_bp.route('/codex')
@admin_required
def codex():
    event_model = current_app.event_model
    codex_events = event_model.get_by_type('codex')
    return render_template('admin/codex.html', events=codex_events)
