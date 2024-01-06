import "./ShoppingListItem.css";
import {useState} from "react"

const ShoppingListItem=(props)=>{	
	if(props.item===undefined){
		return(<></>);
		}	
	if(props.filter===0&&props.item.is_solved===1){
		return(<></>);
		}	
	if(props.filter===1&&props.item.is_solved===0){
		return(<></>);
		}	
					
	let changeStatus=(event)=>{ 
		if(window.confirm("Opravdu si přejete změnit stav položky?")){
		  props.callbackChangeStatusItem(props.item.sliid);     	
		  }
	  event.preventDefault();
		}	
		
	let shoppingListItemInner="shoppingListItemInner";	
	let delButton='';	
	let statusButton=<td width="40"><button onClick={changeStatus} title="Splnit položku" className="green" >&#9675;</button></td>;	
	
	if(props.item.is_solved===1){
		shoppingListItemInner="shoppingListItemInner success";
		statusButton=<td width="40"><button onClick={changeStatus} title="Nesplnit položku" className="green" >&#9673;</button></td>;			
		}
			
	if(parseInt(props.currentUser)===parseInt(props.owner)){ // owner can delete or update					
		let delItem=(event)=>{       
		  if(window.confirm("Opravdu si přejete odebrat tuto položku?")){
			  props.callbackDelItem(props.item.sliid);     	
			  }
		  event.preventDefault();
		  }	
		delButton=<td className="align-right" width="40"><button onClick={delItem} title="Odebrat položku" className="red" >&#10007;</button></td>;					
		}						
						
	return(
		<div className="shoppingListItem col-xs-12 col-sm-6 col-md-4 ">
			<div className={shoppingListItemInner}>
				<table className="w-100">
					<tbody>
						<tr>
							{statusButton}
							<td>{props.item.name}</td>
							<td className="align-right">{props.item.value}</td>																								
							{delButton}																	
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		);		
	};
export default ShoppingListItem;
	
