import "./ShoppingListMember.css";
import {useState} from "react"

const ShoppingListMember=(props)=>{
	if(props.users===undefined){
		return(<></>);
		}
	if(props.member===undefined){
		return(<></>);
		}		
		
	let delButton='';
	if(parseInt(props.currentUser)===parseInt(props.owner)||parseInt(props.currentUser)===parseInt(props.member.id_user)){ // owner can delete everyone, member can delete only himself						
		let delMember=(event)=>{       
		  if(window.confirm("Opravdu si přejete odebrat tohoto člena?")){
			  props.callbackDelMember(props.member.slmid);     	
			  }
		  event.preventDefault();
		  }	
		delButton=<button onClick={delMember} title="Odebrat člena" >&#10007;</button>;			
		}			
		
	if(props.users[props.member.id_user]!==undefined){						
		return(
			<div className="shoppingListMember col-xs-12 col-sm-6 col-md-3 ">
				<div className="shoppingListMemberInner">
					<div className="SLMname">{props.users[props.member.id_user].degree} {props.users[props.member.id_user].name} {props.users[props.member.id_user].surname}</div>
					<div className="SLMdelButton">{delButton}</div>
				</div>
			</div>
			);
		}	
	return(<></>); 	
	};
export default ShoppingListMember;
	
