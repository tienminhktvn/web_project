import express from "express";
import * as attendeeController from "../controllers/attendeeController.js";

const router = express.Router();

// Home page
router.get("/", attendeeController.showHome);

// Registration form
router.get("/register", attendeeController.showRegisterForm);
router.post("/register", attendeeController.submitRegistration);

// Thank you page
router.get("/thank-you", attendeeController.showThankYou);

// Attendee list
router.get("/attendees", attendeeController.showAttendeeList);

export default router;
