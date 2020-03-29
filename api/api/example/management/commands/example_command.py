from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    """
    https://docs.djangoproject.com/en/3.0/howto/custom-management-commands/
    """
    help = 'Example command to provide basic idea'

    def add_arguments(self, parser):
        parser.add_argument('name', type=str)

    def handle(self, *args, **options):
        name = options['name']
        if not name:
            raise CommandError("Name can't be none")

        self.stdout.write(self.style.SUCCESS('Hey %s!! Command successfully executed' % name))
