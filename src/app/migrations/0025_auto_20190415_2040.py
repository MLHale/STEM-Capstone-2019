# Generated by Django 2.1.7 on 2019-04-16 01:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0024_auto_20190411_2056'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='organization',
            options={'ordering': ['reviewed', '-approved', 'name']},
        ),
        migrations.RenameField(
            model_name='organization',
            old_name='is_approved',
            new_name='approved',
        ),
        migrations.AddField(
            model_name='organization',
            name='reviewed',
            field=models.BooleanField(default=False),
        ),
    ]
