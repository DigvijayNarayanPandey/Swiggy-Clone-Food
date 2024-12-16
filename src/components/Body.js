import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import { useEffect, useState , useContext} from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utilis/useOnlineStatus";
import userContext from "../utilis/UserContext";

// definition of state react variable
// ! Whenever state variable updates, react triggers a reconciliation cycle (re-renders the component)

const Body = () => {
  const [listOfRestaurant, setlistOfRestaurant] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");

  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

  console.log("body rendering", listOfRestaurant);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0688835&lng=77.5060438&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    console.log(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    // console.log("abhi likhe json",json);
    setlistOfRestaurant(
      // optional chaining:-
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) {
    return (<h1>Looks like you are offline !! check your Internet Connection</h1>)
  }

  const {isLoggedUser ,setLoggedinInfo} = useContext(userContext)

  // conditional rendering - Rendering on the basis of Condition
  // if (listOfRestaurant.length === 0) {
  //   return <Shimmer/>
  // }

  return listOfRestaurant.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="cont-bn">
        <div className="Search">
          <input
            className="search-box"
            data-testid="search-input"
            placeholder="Search your Restaurant..."
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
         <button
  className="btn "
  onClick={() => {
    // filter the restaurant cards & update the UI
    const filteredRestaurant = listOfRestaurant.filter((res) => 
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurant(filteredRestaurant);
    // search Text
    console.log(searchText);
  }}
>
 search
</button>
        </div>
        <button
            className="px-4 py-2 bg-green-700 rounded-lg text-white"
            onClick={() => {
              const filteredList = listOfRestaurant.filter(
                (res) => res.info.avgRating > 4.2
              );
              setFilteredRestaurant(filteredList);
              console.log("filterted", filteredList);
            }}
          >
            Top Restuarants
          </button>
        <div>
          <label htmlFor="username">Username :</label>
          <input
            id="username"
            className="search-box"
            type="text"
            value={isLoggedUser}
            onChange={(e) => {
              setLoggedinInfo(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurant/" + restaurant.info.id}
          >
            {restaurant.info.isOpen ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
