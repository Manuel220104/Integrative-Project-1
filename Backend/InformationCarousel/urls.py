from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from InformationCarousel import views
from .views import UltimoRegistroInfo

router = routers.DefaultRouter()
router.register(r'InformationCarousel', views.InformationCarouselView, 'InformationCarousel')
# Como vas a visiar la url, como empieza la api
# se pone asi para saber la version pero se puede
# luego de la , van las urls generadas por django
urlpatterns = [
    path("api/v1/", include(router.urls)),
    path('api/v1/ultimo_registro_CarouselInfo/', UltimoRegistroInfo.as_view(), name='ultimo_registro_CarouselInfo'),
]

