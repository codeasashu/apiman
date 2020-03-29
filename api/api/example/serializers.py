from rest_framework import serializers


class ExampleSerilizer(serializers.Serializer):

    name = serializers.CharField(min_length=3)
