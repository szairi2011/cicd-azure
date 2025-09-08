import {meetingTimeSlot} from "./meetingTimeSlot";

export class meetingTimeSuggestions {
  confidence?: number;
  organizerAvailability?: string;
  suggestionReason?: string;
  meetingTimeSlot?: meetingTimeSlot[];
}
