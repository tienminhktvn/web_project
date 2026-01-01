import * as Attendee from "../models/attendee.js";

// Show home page
export const showHome = (_, res) => {
  res.render("index");
};

// Show registration form
export const showRegisterForm = (_, res) => {
  res.render("register");
};

// Submit registration
export const submitRegistration = (req, res) => {
  const { name, email, attend } = req.body;

  const attendee = {
    name: name,
    email: email,
    attend: attend === "on" ? "yes" : "no",
  };

  Attendee.addAttendee(attendee);

  res.redirect(`/thank-you?name=${encodeURIComponent(name)}`);
};

// Show thank you page
export const showThankYou = (req, res) => {
  const name = req.query.name || "Guest";
  res.render("thank-you", { name });
};

// Show attendee list
export const showAttendeeList = (_, res) => {
  const attendees = Attendee.getAllAttendees().map((attendee, index) => ({
    ...attendee,
    index: index + 1,
  }));
  res.render("attendee-list", { attendees });
};
