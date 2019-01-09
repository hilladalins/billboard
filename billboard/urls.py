from django.conf.urls import url
from django.contrib.auth.views import login, logout
from . import views

urlpatterns = [
    url(r'^$', views.welcome, name='welcome'),
    url(r'^home$', views.home, name='home'),
    url(r'^register$', views.register, name='register'),
    url(r'^login$', login, name='login'),
    url(r'^logout$', logout, name='logout')
]