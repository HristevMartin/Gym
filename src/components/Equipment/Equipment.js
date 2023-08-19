import { Spinner } from '../Spinner/Spinner.js';
import {getGymItems} from '../../services/getServices';
import CardItem from './CardItem';
import './Equipment.css';
import { useState, useEffect } from 'react'

// The Equipment component
export const Equipment = () => {

    // Define the products state variable and the function to update it, initially an empty array
    const [products, setProducts] = useState([]);

    // Define the filteredProducts state variable and the function to update it, initially an empty array
    let [filteredProducts, setFilteredProducts] = useState([]);

    // Define the activeFilters state variable and the function to update it, initially an empty array
    const [activeFilters, setActiveFilters] = useState([]);

    // Define the dynamicHeight state variable and the function to update it, initially set to "130px"
    const [dynamicHeight, setDynamicHeight] = useState("130px");

    // Define the sortOption state variable and the function to update it, initially set to 'price'
    const [sortOption, setSortOption] = useState('price');

    const [isLoading, setIsLoading] = useState(true); //

    // useEffect hook to fetch gym items when the component is first rendered
    useEffect(() => {
        // Call the getGymItems function which returns a promise
        getGymItems().then((items) => {
            // When the promise resolves, update the products state variable with the fetched items
            setProducts(items);
            // Calculate dynamic height based on the number of fetched items and set the dynamicHeight state variable
            setDynamicHeight(`${items.length * 200}px`);
            setIsLoading(false);
         
        });
        // Empty dependency array means this useEffect hook will run once when the component mounts
    }, []);
    

    // useEffect hook to apply active filters and sort option when they change
    useEffect(() => {
        // Create a copy of the products array
        let updatedProducts = [...products];

        // If there are active filters, filter the products based on them
        if (activeFilters.length > 0) {
            updatedProducts = updatedProducts.filter(product => activeFilters.includes(product.category));
        }

        // If the sort option is 'alphabetical', sort the products alphabetically
        if (sortOption === 'alphabetical') {
            updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
            // If the sort option is 'price', sort the products by price
        } else if (sortOption === 'price') {
            updatedProducts.sort((a, b) => a.price - b.price);
        }

        // Update the filteredProducts state variable with the updated products array
        setFilteredProducts(updatedProducts);
        // Dependency array contains activeFilters, sortOption, and products, so this useEffect hook will run when any of them change
    }, [activeFilters, sortOption, products]);

    // Function to handle change in category filters
    const handleCategoryChange = (event) => {
        // Destructure the checked and name properties from the event target
        const { checked, name } = event.target;

        // If the checkbox is checked, add the category to the activeFilters state variable
        if (checked) {
            setActiveFilters(prev => [...prev, name]);
            // If the checkbox is not checked, remove the category from the activeFilters state variable
        } else {
            setActiveFilters(prev => prev.filter(filter => filter !== name));
        }
    };

    // Function to handle change in sort option
    const handleSortChange = (event) => {
        // Update the sortOption state variable with the selected sort option
        setSortOption(event.target.value);
    };

    const classNameCard = filteredProducts.length === 0 ? 'card-items-globall-spiner' : 'card-items-globall';


    return (

        <div class="main">
            <div class="side-nav">
                <span >
                    {
                        activeFilters.length > 0
                            ?
                            <p className='filtering-by'>Filtering by: {activeFilters.map(filter => <span class="filter">{filter.charAt(0).toUpperCase() + filter.slice(1)} Category</span>)}</p>
                            :
                            <p className='view-all-products'>Viewing all products</p>
                    }
                </span>
                <span className='filter-products'>Filter products</span>
                <ul class="side-list">
                    <li><a className='equipment-category' >Categories</a>
                        <form action="">
                            <div>
                                <input type="checkbox" name='cardio' onChange={handleCategoryChange} />
                                <label class="label-attr" for="">Cardio</label>
                            </div>
                            <div>
                                <input type="checkbox" name='strength' onChange={handleCategoryChange} />
                                <label class="label-attr" for="">Strength</label>
                            </div>
                            <div>
                                <input type="checkbox" name='flexibility' onChange={handleCategoryChange} />
                                <label class="label-attr" for="">Flexibility and mobility</label>
                            </div>
                            <div>
                                <input type="checkbox" name='boxing' onChange={handleCategoryChange} />
                                <label class="label-attr" for="">Boxing</label>
                            </div>
                        </form>
                    </li>
                </ul>

            </div>

            <div class="side-text-global">
                <div class="side-text">
                    <p class="toolbar-number">Products: {filteredProducts.length}</p>
                    <div class="sorter">
                        <label style={{ 'margin-right': "10px" }} class="sorter-label" for="sorter">Sort By</label>
                        <div class="control">
                            <select name="" id="" onChange={handleSortChange}>
                                <option value="price">Price </option>
                                <option value="alphabetical">Product name</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div  className={classNameCard}>
                    {
                        isLoading
                            ?
                            <Spinner />
                            :

                            filteredProducts.length === 0 ?
                                (<p className='equipment-no-product-found'>No products found</p>)
                                :
                                filteredProducts.map((product) => (
                                    <CardItem product={product} key={product.primary_id} />
                                ))
                    }


                </div>

            </div>

        </div>
    )
}


export default Equipment;