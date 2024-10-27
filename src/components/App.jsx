import { useState } from "react";
import { object, string, boolean } from "yup";
import Checkbox from "./Checkbox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationIcon from "../../public/success.svg";

function AlertNotification() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <div>
          <img src={NotificationIcon} width="19.5" height="19.5" />
        </div>
        <div className="font-bold leading-[1.5rem] text-[18px]">
          Message Sent!
        </div>
      </div>
      <div className="leading-[1.5rem] text-green200 tracking-[0px]">
        Thanks for completing the form. We’ll be in touch soon!
      </div>
    </div>
  );
}

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState({});

  const userSchema = object({
    firstname: string().required("This field is required"),
    lastname: string().required("This field is required"),
    email: string()
      .email("Please enter a valid email address")
      .required("This field is required"),
    query: string().required("Please select a query type"),
    message: string().required("This field is required"),
    consent: boolean().oneOf(
      [true],
      "To submit this form, please consent to being contacted"
    ),
  });

  const notify = () =>
    toast.success(<AlertNotification />, {
      icon: false,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userInput = {
      firstname: firstName,
      lastname: lastName,
      email,
      query,
      message,
      consent,
    };

    await userSchema
      .validate(userInput, { abortEarly: false })
      .then(async () => {
        setErrors({});
        notify();
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          const errs = Object.assign(
            {},
            ...err.inner.map((e) => ({
              [e.path]: e.errors[0],
            }))
          );
          setErrors(errs);
        }
      });
  };

  const genericStyles =
    "border border-grey500 rounded-lg p-3 focus:border-green600 outline-0";

  return (
    <div className="flex justify-center items-center my-5">
      <form
        className="bg-white min-w-[340px] md:min-w-[736px] px-3 py-5 md:px-6 md:py-8 rounded-lg flex flex-col gap-7"
        onSubmit={handleSubmit}
      >
        <h1>Contact Us</h1>
        <div className="flex flex-col gap-5 text-grey900 text-[16px]">
          <div className="flex flex-col md:flex-row justify-between w-full gap-4">
            <div className="flex flex-col gap-3 w-full">
              <p>First Name</p>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="John"
                className={` ${genericStyles} ${
                  errors.firstname ? "border-rederror" : "hover:border-green600"
                }`}
              />
              <span className="text-rederror -mt-1">{errors.firstname}</span>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <p>Last Name</p>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Smith"
                className={` ${genericStyles} ${
                  errors.lastname ? "border-rederror" : "hover:border-green600"
                }`}
              />
              <span className="text-rederror -mt-1">{errors.lastname}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p>Email Address</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="john.smith@email.me"
              className={` ${genericStyles} w-full ${
                errors.email ? "border-rederror" : "hover:border-green600"
              }`}
            />
            <span className="text-rederror -mt-1">{errors.email}</span>
          </div>
          <div className="flex flex-col gap-3">
            <p>Query Type</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div
                className={`flex items-center gap-3 ${genericStyles} hover:border-green600 px-4 hover:cursor-pointer ${
                  query === "general" ? "bg-green200" : "bg-transparent"
                }`}
                onClick={() => setQuery("general")}
              >
                <Checkbox checked={query === "general"} />
                <label className="cursor-pointer" htmlFor="general">
                  General Enquiry
                </label>
              </div>
              <div
                className={`flex items-center gap-3 ${genericStyles} hover:border-green600 px-4 hover:cursor-pointer ${
                  query === "support" ? "bg-green200" : "bg-transparent"
                }`}
                onClick={() => setQuery("support")}
              >
                <Checkbox checked={query === "support"} />
                <label className="cursor-pointer" htmlFor="support">
                  Support Request
                </label>
              </div>
            </div>
            <span className="text-rederror -mt-1">{errors.query}</span>
          </div>
          <div className="flex flex-col gap-3">
            <p>Message</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
              placeholder="Enter your message here..."
              className={`${genericStyles} w-full ${
                errors.message ? "border-rederror" : "hover:border-green600"
              }`}
              rows="6"
            />
            <span className="text-rederror -mt-1">{errors.message}</span>
          </div>
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setConsent(!consent)}
          >
            <Checkbox checked={consent} square={true} />
            <label htmlFor="consent" className="cursor-pointer">
              I consent to being contacted by the team
            </label>
          </div>
          <span className="text-rederror -mt-3">{errors.consent}</span>
        </div>
        <button
          type="submit"
          className="relative w-full bg-green600 hover:bg-green900 text-white font-bold py-4 border rounded-lg"
        >
          Submit
        </button>
      </form>
      <ToastContainer
        hideProgressBar
        position="top-center"
        toastStyle={{
          backgroundColor: "#063f37",
          color: "white",
          padding: "20px 10px",
          borderRadius: "12px",
        }}
        closeButton={false}
      />
    </div>
  );
}

export default App;
