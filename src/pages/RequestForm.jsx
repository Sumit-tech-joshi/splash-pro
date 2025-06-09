import React, { useState } from "react";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    street1: "",
    street2: "",
    city: "",
    province: "",
    postalCode: "",
    serviceType: "",
    details: "",
    date1: "",
    date2: "",
    flexible: false,
    specificTime: false,
    bedrooms: "",
    bathrooms: "",
    kitchens: "",
    squareFeet: "",
    people: "",
    pets: "",
    livedHere: "",
    lastClean: "",
    smoke: "",
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const row = [[
        new Date().toLocaleString("en-CA", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }), 
        formData.firstName,
        formData.lastName,
        formData.company,
        formData.email,
        formData.phone,
        formData.street1,
        formData.street2,
        formData.city,
        formData.province,
        formData.postalCode,
        formData.serviceType,
        formData.details,
        formData.date1,
        formData.date2,
        formData.flexible ? "Yes" : "No",
        formData.specificTime ? "Yes" : "No",
        formData.bedrooms,
        formData.bathrooms,
        formData.kitchens,
        formData.squareFeet,
        formData.people,
        formData.pets,
        formData.livedHere,
        formData.lastClean,
        formData.smoke
      ]];
  
      const response = await fetch(
        "https://v1.nocodeapi.com/sumit_joshi/google_sheets/vfxxBeSyYiZloadf?tabId=Sheet1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(row), // ✅ correctly structured as 2D array
        }
      );
  
      const resultText = await response.text();
      console.log("NoCodeAPI result:", resultText);
  
      alert("Form submitted successfully!");
      setFormData((prev) => ({
        ...prev,
        firstName: "",
        lastName: "",
        email: "",
      }));
    } catch (err) {
      console.error("Submission error:", err);
      alert("Error submitting form.");
    }
  };
  

  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10 space-y-10">
        <h1 className="text-2xl font-semibold text-center">New Request</h1>
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Contact Details */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Contact Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="input"
                type="text"
                placeholder="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                className="input"
                type="text"
                placeholder="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <input
                className="input md:col-span-2"
                type="text"
                placeholder="Company name"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
              <input
                className="input md:col-span-2"
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                className="input md:col-span-2"
                type="tel"
                placeholder="Phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Address</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="input"
                type="text"
                placeholder="Street 1"
                name="street1"
                value={formData.street1}
                onChange={handleChange}
              />
              <input
                className="input"
                type="text"
                placeholder="Street 2"
                name="street2"
                value={formData.street2}
                onChange={handleChange}
              />
              <input
                className="input"
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                className="input"
                type="text"
                placeholder="Province"
                name="province"
                value={formData.province}
                onChange={handleChange}
              />
              <input
                className="input md:col-span-2"
                type="text"
                placeholder="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium">
              What Service are you looking for?
            </h2>
            <select
              className="input"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
            >
              <option>Choose an option</option>
              <option>Bi-weekly Residential</option>
              <option>Monthly Residential</option>
              <option>Janitorial/Commercial</option>
              <option>Vacation Rental / AirBnB</option>
              <option>Post Construction</option>
              <option>Move out Clean</option>
              <option>Deep Clean</option>
            </select>
            <textarea
              className="input"
              rows="3"
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Additional details (optional)"
            />
          </div>

          {/* Availability Dates */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium">
              What date are you requesting?
            </h2>
            <input
              className="input"
              type="date"
              name="date1"
              value={formData.date1}
              onChange={handleChange}
            />
            <input
              className="input"
              type="date"
              name="date2"
              value={formData.date2}
              onChange={handleChange}
            />
            <label className="block font-medium">
              We currently have a 2-hour arrival window. Will this be a problem?
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="flexible"
                checked={formData.flexible}
                onChange={handleChange}
              />{" "}
              No, I am flexible
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="specificTime"
                checked={formData.specificTime}
                onChange={handleChange}
              />{" "}
              Yes, I need a specific time
            </label>
          </div>

          {/* Home Details */}
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Home Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="input"
                type="text"
                name="bedrooms"
                placeholder="Bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
              />
              <input
                className="input"
                type="text"
                name="bathrooms"
                placeholder="Bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
              />
              <input
                className="input"
                type="text"
                name="kitchens"
                placeholder="Kitchens"
                value={formData.kitchens}
                onChange={handleChange}
              />
              <input
                className="input"
                type="text"
                name="squareFeet"
                placeholder="Square Footage"
                value={formData.squareFeet}
                onChange={handleChange}
              />
              <input
                className="input"
                type="text"
                name="people"
                placeholder="People in Home"
                value={formData.people}
                onChange={handleChange}
              />
              <input
                className="input"
                type="text"
                name="pets"
                placeholder="Do you have pets?"
                value={formData.pets}
                onChange={handleChange}
              />
              <input
                className="input"
                type="text"
                name="livedHere"
                placeholder="How long have you lived there?"
                value={formData.livedHere}
                onChange={handleChange}
              />
              <input
                className="input"
                type="text"
                name="lastClean"
                placeholder="Last professional clean?"
                value={formData.lastClean}
                onChange={handleChange}
              />
              <input
                className="input md:col-span-2"
                type="text"
                name="smoke"
                placeholder="Do you smoke inside?"
                value={formData.smoke}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
