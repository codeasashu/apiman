from rest_framework import serializers


class RequestSerilizer(serializers.Serializer):
    path = serializers.CharField(min_length=3)
