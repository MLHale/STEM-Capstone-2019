from app.models.organization import Organization
from rest_framework import serializers
import bleach

class OrganizationSerializer(serializers.ModelSerializer):
    is_approved = serializers.BooleanField(read_only=True, default=False)

    class Meta:
        model = Organization
        fields = (
            "id",
            "name",
            "is_approved",
        )

    def validate_name(self, value):
        return bleach.clean(value)
