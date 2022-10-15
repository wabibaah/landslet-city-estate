import { useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase";
import { toast } from "react-toastify";

function Contact({ userRef, listing }) {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState();
  useEffect(() => {
    async function getLandLord() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandLord(docSnap.data());
      } else {
        toast.error("Could not get Landlord data");
      }
    }
    getLandLord();
  }, [userRef]);

  function onChange(e) {
    setMessage(e.target.value);
  }

  return (
    <>
      {landLord !== null && (
        <div className="flex flex-col w-full ">
          <p>
            Contact {landLord.name} for the {listing.name.toLowerCase()}{" "}
          </p>
          <div className="mt-3 mb-6">
            <textarea
              name="message"
              id="message"
              value={message}
              onChange={onChange}
              rows="2"
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 "
            ></textarea>
          </div>
          <a href={`mailto:${landLord.email}?Subject=${listing.name}&body=${message}`}>
            <button
              type="button"
              className="px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6"
            >
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
}

export default Contact;
