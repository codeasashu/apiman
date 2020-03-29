from django.apps import AppConfig


class ExampleConfig(AppConfig):
    name = "api.example"
    verbose_name = "Example"

    def ready(self):
        try:
            import api.example.signals  # noqa F401
        except ImportError:
            pass
