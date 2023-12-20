import "./../Styles/Contact.css";

function Contact() {
    return (
      <>
        <div className="ContactInfoBackground">
          <h3 className="contactTitle">YHTEYSTIEDOT</h3>
          <div className="ContactInfoBody">
            <div className="ContactRow">
              <div className="contact">
                <p className="contactName">First Last</p>
                <p className="contactEmail">firstlast@gmail.com</p>
              </div>
              <div className="contact">
                <p className="contactName">Second SecondToLast</p>
                <p className="contactEmail">second@gmail.com</p>
              </div>
            </div>
            <div className="ContactRow">
              <div className="contact">
                <p className="contactName">Con Tact</p>
                <p className="contactEmail">contact@gmail.com</p>
              </div>
              <div className="contact">
                <p className="contactName">Tommy Niemi</p>
                <p className="contactEmail">tommy@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Contact;
  