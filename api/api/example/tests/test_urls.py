from django.urls import reverse, resolve


def test_update():
    assert reverse("example:home") == "/example/"
    assert resolve("/example/").view_name == "example:home"
