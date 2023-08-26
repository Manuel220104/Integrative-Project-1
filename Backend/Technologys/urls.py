from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from Technologys import views


router = routers.DefaultRouter()
router.register(r'Technology', views.TechnologyView, 'Technology')
# Como vas a visiar la url, como empieza la api
# se pone asi para saber la version pero se puede
# luego de la , van las urls generadas por django
urlpatterns = [
    path("api/v1/", include(router.urls)),
    
]
