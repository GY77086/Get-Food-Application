import { CDN_URL } from "../utils/constants.js";
const RestaurantCard = ({restData}) =>
{
    const 
    {
        cloudinaryImageId,
        name,
        avgRating,  
        cuisines,
        costForTwo,
        deliveryTime,
        sla
    } = restData;

    

    return (
        <div className="restaurant-card p-2 m-2 border border-solid rounded-lg w-[234px] h-[400px] shadow-lg bg-[rgb(244,241,241)] hover:border-solid hover:border-black hover:bg-[rgb(234,228,228)]">
            <img className="restaurant-pic w-[100%] h-[50%] rounded-lg" src={CDN_URL +  cloudinaryImageId} alt="restaurant-pic"></img>
            <h3 className="rest-name text-[rgb(139,1,1)] font-bold pt-2 text-lg"> {name}</h3>
            <h5 className="cuisine text-sm"> {cuisines.join(", ")} </h5>
            <h5> {avgRating} ⭐ </h5>    
            <h5> {costForTwo} </h5>
            <h5> {sla?.deliveryTime} mins.</h5>
        </div>
    );
}


// Higher order component (HOC) is a function that takes a component as an argument and returns a new component. It is a pattern that is used to reuse component logic. 
// It is a pure function that takes a component and returns a new component. 
// It is a way to share common functionality between components without repeating code. 
// It is a way to enhance the functionality of a component without modifying the original component. 
// It is a way to add additional props to a component without modifying the original component. 
// It is a way to wrap a component with additional functionality without modifying the original component.

export const WithPromotedLabel = (RestaurantCard) =>
{
    return (props) =>
    {
        return (
            <div>
                <label className="promoted-label absolute bg-[rgb(120,181,0)] text-white m-1 p-2 rounded-lg"> Promoted </label>
                <RestaurantCard {...props} />
            </div>
        );
    }
}
export default RestaurantCard;  
