from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password, check_password
from django.utils import timezone  # ✅ import timezone
from .models import User, Meeting  # ✅ Use your custom models directly

@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            user = User.objects.filter(email=email).first()

            if user and user.password and check_password(password, user.password):
                return JsonResponse({
                    "success": True,
                    "message": "Login successful",
                    "user": {
                        "id": user.id,
                        "firstName": user.first_name,
                        "lastName": user.last_name,
                        "email": user.email
                    }
                }, status=200)
            
            return JsonResponse({"success": False, "message": "Invalid email or password"}, status=400)

        except json.JSONDecodeError:
            return JsonResponse({"success": False, "message": "Invalid JSON data"}, status=400)

    return JsonResponse({"success": False, "message": "Method not allowed"}, status=405)


@csrf_exempt
def register_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            
            first_name = data.get("firstName")
            last_name = data.get("lastName")
            email = data.get("email")
            password = data.get("password")

            if not first_name or not last_name or not email or not password:
                return JsonResponse({"success": False, "message": "All fields are required"}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({"success": False, "message": "Email already registered"}, status=400)

            User.objects.create(
                first_name=first_name,
                last_name=last_name,
                email=email,
                password=make_password(password)
            )

            return JsonResponse({"success": True, "message": "User registered successfully"}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({"success": False, "message": "Invalid JSON data"}, status=400)

    return JsonResponse({"success": False, "message": "Method not allowed"}, status=405)


@csrf_exempt
def add_meeting(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_id = data.get("user_id")
            mentor_name = data.get("mentor_name")
            mentee_email = data.get("mentee_email")
            meeting_time = data.get("meeting_time")  # ISO format string
            zoom_link = data.get("zoom_link")

            user = User.objects.filter(id=user_id).first()
            if not user:
                return JsonResponse({"success": False, "message": "User not found"}, status=404)

            Meeting.objects.create(
                user=user,
                mentor_name=mentor_name,
                mentee_email=mentee_email,
                meeting_time=meeting_time,
                zoom_link=zoom_link
            )

            return JsonResponse({"success": True, "message": "Meeting scheduled successfully"}, status=201)
        
        except json.JSONDecodeError:
            return JsonResponse({"success": False, "message": "Invalid JSON data"}, status=400)

    return JsonResponse({"success": False, "message": "Method not allowed"}, status=405)


@csrf_exempt
def get_meetings(request, user_id):
    if request.method == "GET":
        current_time = timezone.now()  # ✅ get current server time
        meetings = Meeting.objects.filter(user_id=user_id, meeting_time__gte=current_time).order_by('meeting_time').values()
        return JsonResponse(list(meetings), safe=False, status=200)

    return JsonResponse({"success": False, "message": "Method not allowed"}, status=405)
