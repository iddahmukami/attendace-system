import React, { useState } from "react";
import QRCode from "qrcode.react";

const QrCodeButton = () => {
  const [showQRCode, setShowQRCode] = useState(false);
  const [sessionData, setSessionData] = useState({
    venue: "",
    type: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSessionData((prevSessionData) => ({
      ...prevSessionData,
      [name]: value,
    }));
  };

  const handleQRCodeDisplay = () => {
    if (
      sessionData.venue &&
      sessionData.type &&
      sessionData.date &&
      sessionData.startTime &&
      sessionData.endTime
    ) {
      setShowQRCode(true);
    } else {
      alert("Please fill in all session data before displaying QR code.");
    }
  };

  const QRCodeComponent = (
    <QRCode
      value={JSON.stringify(sessionData)}
      size={256}
      level={"H"}
      includeMargin={true}
    />
  );

  return (
    <div>
      {!showQRCode ? (
        <div>
          <div style={styles.row}>
            <div style={styles.inputDiv}>
              <label style={styles.label}>Session venue:</label>
              <input
                type="text"
                name="venue"
                value={sessionData.venue}
                onChange={handleInputChange}
              />
            </div>
            <div style={styles.inputDiv}>
              <label style={styles.label}>Session type:</label>
              <input
                type="text"
                name="type"
                value={sessionData.type}
                onChange={handleInputChange}
              />
            </div>
            <div style={styles.inputDiv}>
              <label style={styles.label}>Date:</label>
              <input
                type="text"
                name="date"
                placeholder="mm/dd/yyyy"
                value={sessionData.date}
                onChange={handleInputChange}
              />
            </div>
            <div style={styles.inputDiv}>
              <label style={styles.label}>Start time:</label>
              <input
                type="text"
                name="startTime"
                value={sessionData.startTime}
                onChange={handleInputChange}
              />
            </div>
            <div style={styles.inputDiv}>
              <label style={styles.label}>End time:</label>
              <input
                type="text"
                name="endTime"
                value={sessionData.endTime}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div style={styles.row}>
            <button onClick={handleQRCodeDisplay}>Display QR Code</button>
          </div>
        </div>
      ) : (
        <div>{QRCodeComponent}</div>
      )}
    </div>
  );
};

const styles = {
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
  },
  inputDiv: {
    marginRight: "10px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
  },
};

export default QrCodeButton;
