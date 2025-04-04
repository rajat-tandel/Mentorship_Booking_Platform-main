from django.urls import path
from .views import login_view, register_view, add_meeting, get_meetings  # added meeting views

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', register_view, name='register'),
    path('add-meeting/', add_meeting, name='add_meeting'),  # add meeting endpoint
    path('get-meetings/<int:user_id>/', get_meetings, name='get_meetings'),  # get meetings endpoint
]
