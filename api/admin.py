from django.contrib import admin

# Import classes to be registered
from .models import Post

# Register so that it shows on the admin panel
admin.site.register(Post)
