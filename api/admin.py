from django.contrib import admin

# Import classes to be registered
from .models import Task

# Register so that it shows on the admin panel
admin.site.register(Task)
