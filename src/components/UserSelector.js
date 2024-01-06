import "./UserSelector.css";
import {useState} from "react"

const UserSelector=(props)=>{
	if(props.users===undefined){
		return(<></>);
		}
	if(props.currentUser===undefined){
		return(<></>);
		}			
	let changeUser=(event)=>{    				
	  props.callbackChangeUser(event.target.value);     		  
    event.preventDefault();
    }												
	return(
		<div className="UserSelector">
			<b>Přihlášený uživatel:</b><br />
			<select name="loggedUser" className="w-180p align-right" onChange={changeUser} value={props.currentUser} >
				{props.users.map((user:{...})=>
					(<option value={user.uid} key={user.uid} >{user.degree} {user.name} {user.surname}</option>)
					)}			
			</select>								
		</div>
		);			
	};
export default UserSelector;
	
