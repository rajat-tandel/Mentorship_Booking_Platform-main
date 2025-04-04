from django.db import models

class User(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255, blank=True, null=True)  # Store hashed passwords securely or leave null for Google users

    def __str__(self):
        return self.email

class Meeting(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # User who scheduled the meeting
    mentor_name = models.CharField(max_length=100)
    mentee_email = models.EmailField()
    meeting_time = models.DateTimeField()
    zoom_link = models.URLField()

    def __str__(self):
        return f"{self.mentor_name} meeting with {self.mentee_email} at {self.meeting_time}"
