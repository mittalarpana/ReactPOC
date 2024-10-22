import moment from "moment";
import { useEffect, useState } from "react";

function Home() {
    const [data, setData] = useState([]);
    const [activeDate, setActiveDate] = useState("12/31/2024");
    const [searchQuery, setSearchQuery] = useState("");
    const [users,setUsers] = useState([
    {"id":1,"name":"Divavu","startDate":"3/19/2024","endDate":"9/9/2024","Budget":88377, "userId": "Campaign 3"},
    {"id":2,"name":"Jaxspan","startDate":"11/21/2022","endDate":"2/21/2023","Budget":608715, "userId": "Campaign 6"},
    {"id":3,"name":"Miboo","startDate":"11/1/2023","endDate":"6/20/2024","Budget":239507, "userId": "Campaign 7"},
    {"id":4,"name":"Trilith","startDate":"8/25/2024","endDate":"11/30/2025","Budget":179838, "userId": "Campaign 1"},
    {"id":5,"name":"Layo","startDate":"11/28/2017","endDate":"3/10/2024","Budget":837850, "userId": "Campaign 9"},
    {"id":6,"name":"Photojam","startDate":"7/25/2017","endDate":"6/23/2023","Budget":858131, "userId": "Campaign 3"},
    {"id":7,"name":"Blogtag","startDate":"6/27/2017","endDate":"1/15/2026","Budget":109078, "userId": "Campaign 2"},
    {"id":8,"name":"Rhyzio","startDate":"10/13/2017","endDate":"1/25/2024","Budget":272552, "userId": "Campaign 4"},
    {"id":9,"name":"Zoomcast","startDate":"9/6/2017","endDate":"11/10/2023","Budget":301919, "userId": "Campaign 8"},
    {"id":10,"name":"Realbridge","startDate":"3/5/2018","endDate":"10/2/2024","Budget":505602, "userId": "Campaign 5"}]);
    useEffect(() => {
        const fetchData = async () =>{
            const url = "https://jsonplaceholder.typicode.com/users";
            try{
            const response = await fetch(url);
            const responseData = await response.json();
            console.log(responseData);
            setData(responseData);
            updateUsersArray(responseData);
        }
        catch (error){
            console.error("Error Fetching Data: ", error);
        }
    }

        fetchData();
    },[]);
    
    const updateUsersArray = (fetchedData) => {
        const updatedUsers = users.map(user => {
            const foundItem = fetchedData.find(item => item.id === user.id);
            return foundItem ? { ...user, name: foundItem.name } : user;
        });
        setUsers(updatedUsers); 
    };


    // const parseDate =(date) =>{
    //     const [month, day, year] = date.split("/");
    //     return new Date(`${year}-${month}-${day}`);
    // }
    const isUserActive = (endDate) => {
       if(moment(endDate) >= moment(activeDate)){
          return true;
        }
        else{
            return false;
        }
    }
    const handleSearch = (e)=>{
       setSearchQuery(e.target.value);
    }

    const filterResults = users.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return ( 
        <div>
            <input 
            type="text" 
            id="searchBox"
            className="search-input"
            placeholder="Search by name..." 
           onChange={handleSearch}/>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>User Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Active</th>
                <th>Budget</th>
            </tr>
        </thead>
        <tbody>
            {filterResults.map(item => {
         //const apiUser = data.find(x => x.id === item.id);
         const active = isUserActive(item.endDate) ? 'Active' : 'Inactive';
         
            return (<tr>
                <td>{item.userId}</td>
                <td>{item.name}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{active}</td>
                <td>{item.Budget}</td>
            </tr>)})}
            </tbody>
            </table>
            </div>
    )
                }
export default Home;