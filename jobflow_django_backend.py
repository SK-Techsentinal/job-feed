# ============================================================
# JOBFLOW DJANGO BACKEND — Complete Setup
# ============================================================

# requirements.txt
"""
django>=4.2
djangorestframework>=3.14
django-cors-headers>=4.0
djangorestframework-simplejwt>=5.3
Pillow>=10.0
python-decouple>=3.8
"""

# ============================================================
# jobflow/settings.py
# ============================================================
SETTINGS = """
from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = config('SECRET_KEY', default='django-insecure-jobflow-sk-techsentinal-2026')
DEBUG = config('DEBUG', default=True, cast=bool)
ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'jobs',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'jobflow.urls'
TEMPLATES = [{'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [], 'APP_DIRS': True,
    'OPTIONS': {'context_processors': [
        'django.template.context_processors.debug',
        'django.template.context_processors.request',
        'django.contrib.auth.context_processors.auth',
        'django.contrib.messages.context_processors.messages',
    ]}}]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
}

CORS_ALLOW_ALL_ORIGINS = True
STATIC_URL = '/static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
"""

# ============================================================
# jobs/models.py
# ============================================================
MODELS = """
from django.db import models

class Company(models.Model):
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='logos/', blank=True, null=True)
    website = models.URLField(blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Companies'

    def __str__(self):
        return self.name

class Job(models.Model):
    EMPLOYMENT_TYPES = [
        ('full_time', 'Full Time'),
        ('part_time', 'Part Time'),
        ('contract', 'Contract'),
        ('internship', 'Internship'),
        ('remote', 'Remote'),
    ]
    EXPERIENCE_LEVELS = [
        ('entry', 'Entry Level'),
        ('mid', 'Mid Level'),
        ('senior', 'Senior Level'),
        ('executive', 'Executive'),
    ]
    CATEGORIES = [
        ('technology', 'Technology'),
        ('finance', 'Finance'),
        ('banking', 'Banking'),
        ('marketing', 'Marketing'),
        ('design', 'Design'),
        ('operations', 'Operations'),
        ('sales', 'Sales'),
        ('hr', 'Human Resources'),
        ('other', 'Other'),
    ]

    title           = models.CharField(max_length=200)
    company         = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='jobs')
    location        = models.CharField(max_length=200)
    employment_type = models.CharField(max_length=20, choices=EMPLOYMENT_TYPES, default='full_time')
    experience      = models.CharField(max_length=20, choices=EXPERIENCE_LEVELS, default='mid')
    category        = models.CharField(max_length=50, choices=CATEGORIES, default='other')
    salary_min      = models.PositiveIntegerField(null=True, blank=True)
    salary_max      = models.PositiveIntegerField(null=True, blank=True)
    description     = models.TextField()
    requirements    = models.TextField(blank=True)
    benefits        = models.TextField(blank=True)
    is_active       = models.BooleanField(default=True)
    is_featured     = models.BooleanField(default=False)
    views           = models.PositiveIntegerField(default=0)
    created_at      = models.DateTimeField(auto_now_add=True)
    deadline        = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['-is_featured', '-created_at']

    def __str__(self):
        return f"{self.title} at {self.company.name}"

class Application(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('reviewed', 'Reviewed'),
        ('shortlisted', 'Shortlisted'),
        ('rejected', 'Rejected'),
        ('hired', 'Hired'),
    ]
    job         = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='applications')
    full_name   = models.CharField(max_length=200)
    email       = models.EmailField()
    phone       = models.CharField(max_length=20, blank=True)
    cover_letter= models.TextField(blank=True)
    resume      = models.FileField(upload_to='resumes/', blank=True, null=True)
    status      = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    applied_at  = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.full_name} → {self.job.title}"
"""

# ============================================================
# jobs/admin.py
# ============================================================
ADMIN = """
from django.contrib import admin
from django.utils.html import format_html
from .models import Company, Job, Application

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display  = ['name', 'website', 'job_count', 'created_at']
    search_fields = ['name']

    def job_count(self, obj):
        count = obj.jobs.count()
        return format_html('<b style="color:#2563eb">{}</b>', count)
    job_count.short_description = 'Jobs Posted'

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display   = ['title', 'company', 'location', 'employment_type',
                      'category', 'salary_range', 'is_active', 'is_featured',
                      'views', 'created_at']
    list_filter    = ['employment_type', 'category', 'experience',
                      'is_active', 'is_featured']
    search_fields  = ['title', 'company__name', 'location']
    list_editable  = ['is_active', 'is_featured']
    readonly_fields= ['views', 'created_at']
    date_hierarchy = 'created_at'

    fieldsets = (
        ('Job Info', {
            'fields': ('title', 'company', 'category', 'employment_type', 'experience')
        }),
        ('Location & Salary', {
            'fields': ('location', 'salary_min', 'salary_max', 'deadline')
        }),
        ('Details', {
            'fields': ('description', 'requirements', 'benefits')
        }),
        ('Settings', {
            'fields': ('is_active', 'is_featured', 'views', 'created_at')
        }),
    )

    def salary_range(self, obj):
        if obj.salary_min and obj.salary_max:
            return format_html(
                '<span style="color:#16a34a">R{:,} – R{:,}</span>',
                obj.salary_min, obj.salary_max
            )
        return '—'
    salary_range.short_description = 'Salary'

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display  = ['full_name', 'email', 'job', 'status', 'applied_at']
    list_filter   = ['status', 'applied_at']
    search_fields = ['full_name', 'email', 'job__title']
    list_editable = ['status']
    readonly_fields = ['applied_at']

    def get_queryset(self, request):
        return super().get_queryset(request).select_related('job', 'job__company')
"""

# ============================================================
# jobs/serializers.py
# ============================================================
SERIALIZERS = """
from rest_framework import serializers
from .models import Company, Job, Application

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model  = Company
        fields = '__all__'

class JobListSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)
    salary_range = serializers.SerializerMethodField()

    class Meta:
        model  = Job
        fields = ['id','title','company_name','location','employment_type',
                  'experience','category','salary_range','is_featured',
                  'views','created_at','deadline']

    def get_salary_range(self, obj):
        if obj.salary_min and obj.salary_max:
            return f"R{obj.salary_min:,} – R{obj.salary_max:,}"
        return None

class JobDetailSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)

    class Meta:
        model  = Job
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Application
        fields = ['id','job','full_name','email','phone','cover_letter','applied_at']
        read_only_fields = ['applied_at']
"""

# ============================================================
# jobs/views.py
# ============================================================
VIEWS = """
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Company, Job, Application
from .serializers import (CompanySerializer, JobListSerializer,
                           JobDetailSerializer, ApplicationSerializer)

class JobViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Job.objects.filter(is_active=True).select_related('company')
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields   = ['title', 'company__name', 'location', 'description']
    ordering_fields = ['created_at', 'views', 'salary_min']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return JobDetailSerializer
        return JobListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        params = self.request.query_params
        if cat := params.get('category'):
            qs = qs.filter(category=cat)
        if emp := params.get('employment_type'):
            qs = qs.filter(employment_type=emp)
        if exp := params.get('experience'):
            qs = qs.filter(experience=exp)
        if loc := params.get('location'):
            qs = qs.filter(location__icontains=loc)
        if featured := params.get('featured'):
            qs = qs.filter(is_featured=True)
        return qs

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1
        instance.save(update_fields=['views'])
        return super().retrieve(request, *args, **kwargs)

    @action(detail=False, methods=['get'])
    def stats(self, request):
        return Response({
            'total_jobs': Job.objects.filter(is_active=True).count(),
            'featured':   Job.objects.filter(is_featured=True).count(),
            'companies':  Company.objects.count(),
        })

class ApplicationViewSet(viewsets.CreateModelViewSet):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    http_method_names = ['post']
"""

# ============================================================
# jobs/urls.py + jobflow/urls.py
# ============================================================
URLS = """
# jobs/urls.py
from rest_framework.routers import DefaultRouter
from .views import JobViewSet, ApplicationViewSet

router = DefaultRouter()
router.register('jobs', JobViewSet, basename='job')
router.register('applications', ApplicationViewSet, basename='application')
urlpatterns = router.urls

# jobflow/urls.py
from django.contrib import admin
from django.urls import path, include

admin.site.site_header  = 'JobFlow Admin'
admin.site.site_title   = 'JobFlow'
admin.site.index_title  = 'Welcome to JobFlow Dashboard'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('jobs.urls')),
]
"""

# ============================================================
# SETUP COMMANDS
# ============================================================
SETUP = """
# Run these commands to start:

pip install django djangorestframework django-cors-headers djangorestframework-simplejwt Pillow python-decouple

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver

# Admin dashboard: http://localhost:8000/admin
# API:             http://localhost:8000/api/jobs/
"""

print("Django backend files ready!")
print("Admin dashboard available at /admin after setup")
