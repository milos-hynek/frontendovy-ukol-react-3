import "./Route.css";
import ShoppingListDetail from "./ShoppingListDetail.js";
import ShoppingLists from "./ShoppingLists.js";
import {useState} from "react"

const Route=(props)=>{	
				
	//component rendering updates:
	const [updateRoute,setUpdateRoute]=useState(0);
	const refreshRoute=()=>{setUpdateRoute(updateRoute+1);}	
	const [currentRoute,setCurrentRoute]=useState(props.currentRoute);
	const [currentRouteId,setCurrentRouteId]=useState(props.currentRouteId);	
	
	//change route
	let callbackChangeRoute=(data)=>{										
		const updatedCurrentRoute=data.Route;
		const updatedCurrentRouteId=data.RouteId;				
		setCurrentRoute(updatedCurrentRoute);		
		setCurrentRouteId(updatedCurrentRouteId);		
		refreshRoute();						
		}	
	
	if(currentRoute==='detail'&&parseInt(currentRouteId)>0){	// route of shopping list detail				
		for(let i=0;i<props.shoppingLists.length;i++){
			if(parseInt(currentRouteId)==parseInt(props.shoppingLists[i].slid)){					
				return(						
						<ShoppingListDetail shoppingList={props.shoppingLists[i]} users={props.users} currentUser={props.currentUser} callbackChangeRoute={callbackChangeRoute}  />														
					);					
				}	
			}			
	}else{ // route of list of shopping lists
		return(
			<ShoppingLists shoppingLists={props.shoppingLists} users={props.users} currentUser={props.currentUser} callbackChangeRoute={callbackChangeRoute} />			
		);			
	}			
};
export default Route;	
