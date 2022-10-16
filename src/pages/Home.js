import { useState, useEffect } from "react";

import ListingItem from "../components/ListingItem";
import Slider from "../components/Slider";

import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function Home() {
  // offers
  const [offerListings, setOfferListings] = useState(null);
  useEffect(() => {
    async function fetchOfferListings() {
      try {
        // get the reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timeStamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const offerListings = [];
        querySnap.forEach((listing) => {
          offerListings.push({
            id: listing.id,
            data: listing.data(),
          });
        });
        setOfferListings(offerListings);
        // console.log(offerListings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();
  }, []);

  // Places for rent
  const [rentListings, setRentListings] = useState(null);
  useEffect(() => {
    async function fetchRentListings() {
      try {
        // get the reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timeStamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const rentListings = [];
        querySnap.forEach((listing) => {
          rentListings.push({
            id: listing.id,
            data: listing.data(),
          });
        });
        setRentListings(rentListings);
        console.log(rentListings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchRentListings();
  }, []);
  // Places for sale
  const [saleListings, setSaleListings] = useState(null);
  useEffect(() => {
    async function fetchSaleListings() {
      try {
        // get the reference
        const listingsRef = collection(db, "listings");
        // create the query
        const q = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timeStamp", "desc"),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const saleListings = [];
        querySnap.forEach((listing) => {
          saleListings.push({
            id: listing.id,
            data: listing.data(),
          });
        });
        setSaleListings(saleListings);
        console.log(saleListings);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSaleListings();
  }, []);

  return (
    <>
      <Slider />
      {/* offers */}
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {/* so this end is a logic */}
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6 ">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Recent offers</h2>
            <Link to="/offers">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                show more offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {offerListings.map((listing) => (
                <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
              ))}
            </ul>
          </div>
        )}
        {/* Places for rent */}
        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6 ">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Places for rent</h2>
            <Link to="/category/rent">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                show more places for rent
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {rentListings.map((listing) => (
                <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
              ))}
            </ul>
          </div>
        )}
        {/* Places for sale */}
        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6 ">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Places for sale</h2>
            <Link to="/category/rent">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                show more places for sale
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {saleListings.map((listing) => (
                <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
