from app.models.user import User
from app.models.event import Event
from rest_framework import serializers

class EventSerializer(serializers.HyperlinkedModelSerializer):
    organizer = serializers.HyperlinkedRelatedField(view_name='user-detail', queryset=User.objects.all(), default=serializers.CurrentUserDefault())
    start_date = serializers.DateField(format="%m/%d/%Y", input_formats=['%m/%d/%Y', 'iso-8601'])
    end_date = serializers.DateField(format="%m/%d/%Y", input_formats=['%m/%d/%Y', 'iso-8601'])
    class Meta:
        model = Event
        fields = (
            "name",
            "start_date",
            "end_date",
            "event_type",
            "organizer",
            "attendees",
            "url"
        )

    def get_validation_exclusions(self):
        exclusions = super(EventSerializer, self).get_validation_exclusions()
        return exclusions + ['organizer']
