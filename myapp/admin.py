from django.contrib import admin
from .models import Post,Comment,Contact
# Register your models here.

admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Contact)



admin.site.site_header = 'BLOGPOINT | ADMIN PANEL'
admin.site.site_title = 'BLOGPOINT | BLOGGING WEBSITE'
admin.site.index_title= 'Blogpoint Site Administration'
