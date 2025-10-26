from django.db import models


class Document(models.Model):
    CATEGORY_CHOICES = [
        ('resume', '履歴書'),
        ('cover_letter', '職務経歴書'),
        ('other', 'その他'),
    ]

    title = models.CharField('タイトル', max_length=200)
    category = models.CharField('カテゴリ', max_length=50, choices=CATEGORY_CHOICES)
    content = models.TextField('内容')
    created_at = models.DateTimeField('作成日時', auto_now_add=True)
    updated_at = models.DateTimeField('更新日時', auto_now=True)

    class Meta:
        db_table = 'documents'
        verbose_name = '書類'
        verbose_name_plural = '書類'
        ordering = ['-updated_at']

    def __str__(self):
        return self.title
