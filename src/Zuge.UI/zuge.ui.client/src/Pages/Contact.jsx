import "./../Styles/Contact.css";
import contacts from "./../assets/ContactsTest.json";

function Contact() {
    return (
      <>
        <div className="ContactInfoBackground">
          <h3 className="contactTitle">YHTEYSTIEDOT</h3>
          <div className="ContactInfoBody">

            {contacts.map(elem => {
              return <div className="contact" key={elem.firstName + elem.lastName}>
                <p className="contactName">{elem.firstName} {elem.lastName}</p>
                <p className="contactEmail">{elem.email}</p>
                </div>})}
          </div>
        </div>
      </>
    );
  }
  
  export default Contact;
  