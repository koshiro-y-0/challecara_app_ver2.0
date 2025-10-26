from django.shortcuts import render, get_object_or_404, redirect
from django.views.generic import ListView, DetailView
from .models import Document


def home(request):
    """ホームページ"""
    return render(request, 'home.html')


def documents(request):
    """書類一覧ページ"""
    documents = Document.objects.all()
    category = request.GET.get('category', '')

    if category:
        documents = documents.filter(category=category)

    context = {
        'documents': documents,
        'category': category,
    }
    return render(request, 'documents.html', context)


def document_detail(request, pk):
    """書類詳細ページ"""
    document = get_object_or_404(Document, pk=pk)
    context = {
        'document': document,
    }
    return render(request, 'document_detail.html', context)


def document_edit(request, pk):
    """書類編集ページ"""
    document = get_object_or_404(Document, pk=pk)

    if request.method == 'POST':
        document.title = request.POST.get('title', '')
        document.category = request.POST.get('category', '')
        document.content = request.POST.get('content', '')
        document.save()
        return redirect('document_detail', pk=document.pk)

    context = {
        'document': document,
    }
    return render(request, 'document_edit.html', context)


def settings_view(request):
    """設定ページ"""
    return render(request, 'settings.html')


def feature_demo(request):
    """機能デモページ"""
    return render(request, 'feature-demo.html')
