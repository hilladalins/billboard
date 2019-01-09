from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login


def welcome(request):
    if request.user.is_authenticated():
        return render(request, 'billboard/home.html')
    else:
        return render(request, 'billboard/base.html')


@login_required
def home(request):
    return render(request, 'billboard/home.html')


def register(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        new_user = form.save()
        login(request, new_user)
        return render(request, 'billboard/home.html')
    else:
        form = UserCreationForm()
    return render(request, 'registration/registration.html', {"form": form})
