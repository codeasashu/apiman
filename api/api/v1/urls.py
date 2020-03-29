from django.urls import path
from api.v1.views import HomeView

app_name = "v1"

urlpatterns = [
    path("", view=HomeView.as_view(), name="home"),
]
