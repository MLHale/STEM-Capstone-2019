# Generated by Django 2.1.7 on 2019-04-27 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0031_auto_20190421_1119'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='address',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
