from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django.shortcuts import redirect
import json
import datetime
from .models import Adds
from django.utils import timezone


def welcome(request):
    if request.user.is_authenticated():
        return redirect('home')
    else:
        return render(request, 'billboard/base.html')


@login_required
def home(request):
    adds = Adds.objects.all().order_by("-date_posted")[:10]
    if not adds:
        return render(request, 'billboard/no_adds.html')
    else:
        context = {
            "adds": adds
        }
        return render(request, 'billboard/adds.html', context)


def add(request):
    title = request.POST["title"]
    content = request.POST["content"]
    author = request.POST["author"]
    new_ad = Adds(title=title, content=content, author=author, date_posted=timezone.now())
    new_ad.save()
    return HttpResponse(new_ad.id)


def register(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        new_user = form.save()
        login(request, new_user)
        return render(request, 'billboard/home.html')
    else:
        form = UserCreationForm()
    return render(request, 'registration/registration.html', {"form": form})
