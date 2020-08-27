from django.db import models

# Create your models here.


class Post(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    author = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s by %s' % (self.title, self.author)
