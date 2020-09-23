from django.urls import path
from . import views

# API / todo
urlpatterns = [
    # Add a new url path for a new view
    path('', views.apiOverview, name='api-overview'),
    path('forum/', views.forum),
    path('post-detail/<str:pk>/', views.postDetail, name='post-detail'),
    path('post-create/', views.postCreate, name='post-create'),
    path('post-update/<str:pk>', views.postUpdate, name='post-update'),
    path('post-delete/<str:pk>', views.postDelete, name='post-delete'),
    path('database-view/', views.databaseView, name='database-view'),
    path('get-books/', views.getBooks, name='get-books'),
    path('get-people/', views.getPeople, name='get-people'),
    path('insert-post/', views.insertPost, name='insert-post'),
    path('insert-json/', views.insertJSON, name='insert-json'),
]
