from django.urls import path
from api.example.views import HomeView

app_name = "example"

urlpatterns = [
    path("", view=HomeView.as_view(), name="home"),
]
