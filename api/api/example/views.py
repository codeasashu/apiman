from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from api import error_codes
from .serializers import ExampleSerilizer


class HomeView(APIView):
    """
    An example drf api that returns JSON response.
    """
    def get(self, request):
        content = dict(message='This is an example API', data={})
        return Response(content)
    
    def post(self, request):
        serializer = ExampleSerilizer(data=request.data)
        if serializer.is_valid():
            return Response({"data": serializer.data})
        else:
            return Response({
                "errors": serializer.errors, 
                "code": error_codes.VALIDATION_ERROR
            }, status.HTTP_400_BAD_REQUEST)
