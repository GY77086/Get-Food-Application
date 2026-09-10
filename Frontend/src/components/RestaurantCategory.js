import ItemList from "./ItemList.js";

const unwrapCategory = (category) => category?.card?.card || category?.card || category || {};

const getItemCards = (category) =>
    (Array.isArray(category?.itemCards) ? category.itemCards : []).filter(
        (item) => item?.card?.info
    );

const getItemCount = (category) => {
    const itemCount = getItemCards(category).length;
    const childCategories = Array.isArray(category?.categories) ? category.categories : [];

    return itemCount + childCategories.reduce(
        (total, child) => total + getItemCount(unwrapCategory(child)),
        0
    );
};

const NestedCategories = ({ categories, restaurantId }) => (
    <div className="space-y-6 pt-5">
        {categories.map((rawCategory, index) => {
            const category = unwrapCategory(rawCategory);
            const items = getItemCards(category);
            const children = Array.isArray(category?.categories) ? category.categories : [];

            return (
                <section key={`${category?.title || "subcategory"}-${index}`} className="space-y-3">
                    {category?.title && (
                        <h3 className="border-b border-[#5c462b]/30 pb-2 text-base font-bold text-amber-200">
                            {category.title} ({getItemCount(category)})
                        </h3>
                    )}
                    {items.length > 0 && <ItemList items={items} restaurantId={restaurantId} />}
                    {children.length > 0 && <NestedCategories categories={children} restaurantId={restaurantId} />}
                </section>
            );
        })}
    </div>
);

const RestaurantCategory = ({ data, showItems, setShowIndex, restaurantId }) => {
    const itemsList = getItemCards(data);
    const childCategories = Array.isArray(data?.categories) ? data.categories : [];
    const itemLength = getItemCount(data);

    return (
        <div>
            {/* Accordion header */}
            <div className="accordian w-[90%] bg-gray-50 shadow-lg p-4 mx-auto my-4">
                <div 
                    className="acordian-header flex justify-between cursor-pointer"
                    onClick={setShowIndex}
                >
                    <span className="font-bold">
                        {data?.title} ({itemLength})
                    </span>
                    <span>
                        {showItems ? (
                            <img 
                                width="30" 
                                height="30" 
                                src="https://img.icons8.com/ios/50/circled-chevron-up.png"
                                alt="Collapse category"
                            />
                        ) : (
                            <img 
                                width="30"
                                height="30" 
                                src="https://img.icons8.com/ios/50/circled-chevron-down.png" 
                                alt="Expand category"
                            />
                        )}
                    </span>
                </div>
                {showItems && (
                    <div className="space-y-5">
                        {itemsList.length > 0 && <ItemList items={itemsList} restaurantId={restaurantId} />}
                        {childCategories.length > 0 && <NestedCategories categories={childCategories} restaurantId={restaurantId} />}
                        {itemLength === 0 && (
                            <p className="text-sm text-slate-500">No items are available in this category.</p>
                        )}
                    </div>
                )}
            </div>
            {/* Accordion body */}
        </div>
    );
};

export default RestaurantCategory;
