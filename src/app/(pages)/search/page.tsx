"use client";

import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import SearchForm from "@/components/SearchForm";
import OfferCard from "@/components/OfferCard";
import SideFilter from "@/components/SideFilter";

export default function SearchResults() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const departure = searchParams.get("departure");
    const destination = searchParams.get("destination");
    const duration = searchParams.get("duration");
    const rooms = searchParams.get("rooms");
    const adults = searchParams.get("adults");
    const children = searchParams.get("children");
    const date = searchParams.get("date");
    const initialNonStop = searchParams.get("nonStop") === "true";
    const initialRatings = searchParams.get("ratings")?.split(",") || [];
    const initialBoardTypes = searchParams.get("boardTypes")?.split(",") || [];
    const initialAmenities = searchParams.get("amenities")?.split(",") || [];

    const [page, setPage] = useState(1);
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        nonStop: initialNonStop,
        ratings: initialRatings,
        boardTypes: initialBoardTypes,
        amenities: initialAmenities
    });

    const handleFilterChange = (e) => {
        const {name, checked} = e.target;
        if (name === "nonStop") {
            setFilters((prev) => ({...prev, nonStop: checked}));
        } else if (["rating5", "rating4", "rating3"].includes(name)) {
            setFilters((prev) => ({
                ...prev,
                ratings: checked
                    ? [...prev.ratings, name.replace("rating", "")]
                    : prev.ratings.filter((r) => r !== name.replace("rating", "")),
            }));
        } else {
            setFilters((prev) => ({
                ...prev,
                boardTypes: checked
                    ? [...prev.boardTypes, name]
                    : prev.boardTypes.filter((b) => b !== name),
            }));
        }
    };

    useEffect(() => {
        async function fetchFlightsAndHotels() {
            setLoading(true);
            try {
                const params = new URLSearchParams({
                    page,
                    duration,
                    departure,
                    destination,
                    date,
                    adults,
                    children,
                    rooms,
                    nonStop: filters.nonStop,
                    ratings: filters.ratings.join(","),
                    boardTypes: filters.boardTypes.join(","),
                });
                const response = await fetch(`/api/search?${params.toString()}`);
                const data = await response.json();

                if (response.ok) {
                    setOffers((prevOffers) => page === 1 ? data.offers || [] : [...prevOffers, ...data.offers]);
                } else {
                    console.error("Error fetching data:", data.error);
                }
            } catch (error) {
                console.log("Network error:", error);
            } finally {
                setLoading(false);
            }
        }

        if (departure && destination) {
            fetchFlightsAndHotels();
        }
    }, [departure, destination, duration, adults, rooms, date, filters, page]);

    return (
        <>
            <SearchForm/>
            {loading && offers.length === 0 ? (
                <div className="fixed inset-0 bg-gray-900/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in">
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div
                                className="relative py-6 flex flex-col gap-6 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">
                                <div className="text-center font-semibold text-gray-600">
                                    <h1>Loading Holiday Deals</h1>
                                    <p className="mt-2">This might take a while...</p>
                                </div>
                                <svg viewBox="0 0 192 192" preserveAspectRatio="xMidYMid meet"
                                     className="m-auto w-28 h-28 transform visible animate-ping fill-orange-600"
                                     id="Low Brightness">
                                    <defs>
                                        <clipPath id="__lottie_element_2">
                                            <rect width="192" height="192" x="0" y="0"/>
                                        </clipPath>
                                        <clipPath id="__lottie_element_4">
                                            <path d="M0,0 L192,0 L192,192 L0,192z"/>
                                        </clipPath>
                                    </defs>
                                    <g clipPath="url(#__lottie_element_2)">
                                        <g clipPath="url(#__lottie_element_4)"
                                           transform="matrix(0.944756031036377,-0.32777443528175354,0.32777443528175354,0.944756031036377,-26.162925720214844,36.76976776123047)"
                                           opacity="1" className="block">
                                            <g transform="matrix(1,0,0,1,44.08300018310547,90.58300018310547)"
                                               opacity="1" className="block">
                                                <g opacity="1"
                                                   transform="matrix(1,0,0,1,5.416999816894531,5.416999816894531)">
                                                    <path fill="rgb(7,5,6)" fillOpacity="1"
                                                          d=" M5.166999816894531,0 C5.166999816894531,2.8540000915527344 2.8529999256134033,5.166999816894531 -0.0010000000474974513,5.166999816894531 C-2.8540000915527344,5.166999816894531 -5.166999816894531,2.8540000915527344 -5.166999816894531,0 C-5.166999816894531,-2.8540000915527344 -2.8540000915527344,-5.166999816894531 -0.0010000000474974513,-5.166999816894531 C2.8529999256134033,-5.166999816894531 5.166999816894531,-2.8540000915527344 5.166999816894531,0z"/>
                                                </g>
                                            </g>
                                            <g transform="matrix(1,0,0,1,137.0830078125,90.58300018310547)" opacity="1"
                                               className="block">
                                                <g opacity="1"
                                                   transform="matrix(1,0,0,1,5.416999816894531,5.416999816894531)">
                                                    <path fill="rgb(7,5,6)" fillOpacity="1"
                                                          d=" M5.166999816894531,0 C5.166999816894531,2.8540000915527344 2.8540000915527344,5.166999816894531 0,5.166999816894531 C-2.8540000915527344,5.166999816894531 -5.166999816894531,2.8540000915527344 -5.166999816894531,0 C-5.166999816894531,-2.8540000915527344 -2.8540000915527344,-5.166999816894531 0,-5.166999816894531 C2.8540000915527344,-5.166999816894531 5.166999816894531,-2.8540000915527344 5.166999816894531,0z"/>
                                                </g>
                                            </g>
                                            <g transform="matrix(1,0,0,1,90.58300018310547,44.08300018310547)"
                                               opacity="1" className="block">
                                                <g opacity="1"
                                                   transform="matrix(1,0,0,1,5.416999816894531,5.416999816894531)">
                                                    <path fill="rgb(7,5,6)" fillOpacity="1"
                                                          d=" M0,5.166999816894531 C-2.8540000915527344,5.166999816894531 -5.166999816894531,2.8540000915527344 -5.166999816894531,0 C-5.166999816894531,-2.8540000915527344 -2.8540000915527344,-5.166999816894531 0,-5.166999816894531 C2.8540000915527344,-5.166999816894531 5.166999816894531,-2.8540000915527344 5.166999816894531,0 C5.166999816894531,2.8540000915527344 2.8540000915527344,5.166999816894531 0,5.166999816894531z"/>
                                                </g>
                                            </g>
                                            <g transform="matrix(1,0,0,1,90.58300018310547,137.0830078125)" opacity="1"
                                               className="block">
                                                <g opacity="1"
                                                   transform="matrix(1,0,0,1,5.416999816894531,5.416999816894531)">
                                                    <path fill="rgb(7,5,6)" fillOpacity="1"
                                                          d=" M0,5.166999816894531 C-2.8540000915527344,5.166999816894531 -5.166999816894531,2.8540000915527344 -5.166999816894531,0 C-5.166999816894531,-2.8540000915527344 -2.8540000915527344,-5.166999816894531 0,-5.166999816894531 C2.8540000915527344,-5.166999816894531 5.166999816894531,-2.8540000915527344 5.166999816894531,0 C5.166999816894531,2.8540000915527344 2.8540000915527344,5.166999816894531 0,5.166999816894531z"/>
                                                </g>
                                            </g>
                                            <g transform="matrix(1,0,0,1,122.9580078125,57.197998046875)" opacity="1"
                                               className="block">
                                                <g opacity="1"
                                                   transform="matrix(1,0,0,1,5.921999931335449,5.921999931335449)">
                                                    <path fill="rgb(7,5,6)" fillOpacity="1"
                                                          d=" M-3.6519999504089355,3.6519999504089355 C-5.671000003814697,1.6339999437332153 -5.671000003814697,-1.6369999647140503 -3.6519999504089355,-3.6549999713897705 C-1.6339999437332153,-5.671999931335449 1.6369999647140503,-5.671999931335449 3.6549999713897705,-3.6549999713897705 C5.671999931335449,-1.6369999647140503 5.671999931335449,1.6339999437332153 3.6549999713897705,3.6519999504089355 C1.6369999647140503,5.671000003814697 -1.6339999437332153,5.671000003814697 -3.6519999504089355,3.6519999504089355z"/>
                                                </g>
                                            </g>
                                            <g transform="matrix(1,0,0,1,57.197998046875,122.95899963378906)"
                                               opacity="1" className="block">
                                                <g opacity="1"
                                                   transform="matrix(1,0,0,1,5.921000003814697,5.921999931335449)">
                                                    <path fill="rgb(7,5,6)" fillOpacity="1"
                                                          d=" M-3.6530001163482666,3.6540000438690186 C-5.671000003814697,1.6360000371932983 -5.671000003814697,-1.6360000371932983 -3.6530001163482666,-3.6540000438690186 C-1.6349999904632568,-5.671999931335449 1.6360000371932983,-5.671999931335449 3.6540000438690186,-3.6540000438690186 C5.671000003814697,-1.6360000371932983 5.671000003814697,1.6360000371932983 3.6540000438690186,3.6540000438690186 C1.6360000371932983,5.671999931335449 -1.6349999904632568,5.671999931335449 -3.6530001163482666,3.6540000438690186z"/>
                                                </g>
                                            </g>
                                            <g transform="matrix(1,0,0,1,57.197998046875,57.197998046875)" opacity="1"
                                               className="block">
                                                <g opacity="1"
                                                   transform="matrix(1,0,0,1,5.921000003814697,5.921999931335449)">
                                                    <path fill="rgb(7,5,6)" fillOpacity="1"
                                                          d=" M3.6540000438690186,3.6519999504089355 C1.6360000371932983,5.671000003814697 -1.6360000371932983,5.671000003814697 -3.6540000438690186,3.6519999504089355 C-5.671999931335449,1.6339999437332153 -5.671999931335449,-1.6369999647140503 -3.6540000438690186,-3.6549999713897705 C-1.6360000371932983,-5.671999931335449 1.6360000371932983,-5.671999931335449 3.6540000438690186,-3.6549999713897705 C5.671999931335449,-1.6369999647140503 5.671999931335449,1.6339999437332153 3.6540000438690186,3.6519999504089355z"/>
                                                </g>
                                            </g>
                                            <g transform="matrix(1,0,0,1,122.95899963378906,122.95899963378906)"
                                               opacity="1" className="block">
                                                <g opacity="1"
                                                   transform="matrix(1,0,0,1,5.921000003814697,5.921999931335449)">
                                                    <path fill="rgb(7,5,6)" fillOpacity="1"
                                                          d=" M3.6540000438690186,3.6540000438690186 C1.6360000371932983,5.671999931335449 -1.6360000371932983,5.671999931335449 -3.6540000438690186,3.6540000438690186 C-5.671999931335449,1.6360000371932983 -5.671999931335449,-1.6360000371932983 -3.6540000438690186,-3.6540000438690186 C-1.6360000371932983,-5.671999931335449 1.6360000371932983,-5.671999931335449 3.6540000438690186,-3.6540000438690186 C5.671999931335449,-1.6360000371932983 5.671999931335449,1.6360000371932983 3.6540000438690186,3.6540000438690186z"/>
                                                </g>
                                            </g>
                                        </g>
                                        <g transform="matrix(1,0,0,1,44.33300018310547,44.334999084472656)" opacity="1"
                                           className="block">
                                            <g opacity="1"
                                               transform="matrix(1,0,0,1,51.66600036621094,51.665000915527344)">
                                                <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0"
                                                      strokeMiterlimit="10" stroke="rgb(7,5,6)" strokeOpacity="1"
                                                      strokeWidth="10.333"
                                                      d=" M25.83300018310547,0 C25.83300018310547,14.267999649047852 14.269000053405762,25.83300018310547 0.0010000000474974513,25.83300018310547 C-14.267000198364258,25.83300018310547 -25.83300018310547,14.267999649047852 -25.83300018310547,0 C-25.83300018310547,-14.267999649047852 -14.267000198364258,-25.83300018310547 0.0010000000474974513,-25.83300018310547 C14.269000053405762,-25.83300018310547 25.83300018310547,-14.267999649047852 25.83300018310547,0z"/>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container mx-auto py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <SideFilter filters={filters} handleFilterChange={handleFilterChange}/>
                    <main className="md:col-span-3">
                        <div className="flex flex-col gap-4">
                            {offers.length > 0 ? offers.map((hotel, index) => (
                                <OfferCard key={index} hotel={hotel}/>
                            )) : <p>No hotels found.</p>}
                        </div>
                        {offers.length > 0 && (
                            <>
                                {!loading ? (<button
                                    onClick={() => setPage((prevPage) => prevPage + 1)}
                                    className="mt-6 mx-auto block bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700"
                                >
                                    Load More
                                </button>) : (
                                    <span className="mt-6 mx-auto">Loading</span>
                                )}
                            </>
                        )}
                    </main>
                </div>
            )}
        </>
    );
}
