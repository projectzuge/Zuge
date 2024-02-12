import "./../Styles/Contact.css";
import contacts from "./../assets/ContactsTest.json";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

Contact.propTypes = {
  DarkMode: PropTypes.bool,
};

function Contact({ DarkMode }) {
  toast.dismiss();
  return (
    <>
      <div
        className={
          DarkMode ? "ContactInfoBackgroundDark" : "ContactInfoBackground"
        }
      >
        <h3 className="contactTitle">YHTEYSTIEDOT</h3>
        <div className={DarkMode ? "ContactInfoBodyDark" : "ContactInfoBody"}>
          {contacts.map((elem) => {
            return (
              <div
                className={DarkMode ? "contact dark" : "contact"}
                key={elem.firstName + elem.lastName}
              >
                <p className="contactName">
                  {elem.firstName} {elem.lastName}
                </p>
                <p className="contactEmail">{elem.email}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Contact;
