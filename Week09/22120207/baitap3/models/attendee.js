// In-memory data storage
let attendees = [];

// Add a new attendee
export const addAttendee = (attendee) => {
  attendees.push(attendee);
};

// Get all attendees
export const getAllAttendees = () => {
  return attendees;
};

// Clear all attendees (optional, for testing)
export const clearAttendees = () => {
  attendees = [];
};
