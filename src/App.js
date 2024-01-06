import ShoppingListDetail from "./components/ShoppingListDetail.js";
import Route from "./components/Route.js";
import UserSelector from "./components/UserSelector.js";
import {useState} from "react"

//start-data definitions
//defined here for possible modification in app
let current_user=3;	 
let current_route='list'; // list / detai;
let current_route_id='0';
const INITIAL_USERS=[
	{uid:2,email:"jan@novak.xx",name:"Jan",surname:"Novák",degree:"Bc."},
	{uid:3,email:"jiri.prochazka@email.xx",name:"Jiří",surname:"Procházka",degree:""},
	{uid:5,email:"jaroslava.svoboda@email.xx",name:"Jaroslava",surname:"Svobodová",degree:"Ing."},
	{uid:1,email:"kubanovotny@email.xx",name:"Jakub",surname:"Novotný",degree:""},
	{uid:10,email:"hanicka@kucerova.xx",name:"Hana",surname:"Kučerová",degree:"DiS."}
	];
const INITIAL_SHOPPING_LISTS=[
		{
			slid:7,
			id_owner:3,
			name:"Odpolední nákup",	
			description:"Vše prosím nakoupit v místní večerce, děkuji.",
			is_archived:0,
			is_solved:0,
			shopping_list_items:[
				{sliid:14,id_shopping_list:7,name:"Rohlíky",value:"10 ks",is_solved:0},
				{sliid:27,id_shopping_list:7,name:"Chléb",value:"1 ks",is_solved:0},
				{sliid:32,id_shopping_list:7,name:"Mléko",value:"3 x 1l",is_solved:0},
				{sliid:16,id_shopping_list:7,name:"Jogurt malina",value:"4 ks",is_solved:1},
				{sliid:1,id_shopping_list:7,name:"Jogurt jahoda",value:"4 ks",is_solved:1},
				{sliid:41,id_shopping_list:7,name:"Jogurt vanilka",value:"4 ks",is_solved:1},
				{sliid:33,id_shopping_list:7,name:"Máslo",value:"1 ks",is_solved:0},
				{sliid:52,id_shopping_list:7,name:"Mandarinky v síťce",value:"1 Kg",is_solved:1},
				],
			shopping_list_members:[
				{slmid:59,id_shopping_list:7,id_user:2},
				{slmid:62,id_shopping_list:7,id_user:10},
				]
		},
		{
			slid:5,
			id_owner:1,
			name:"Večerní nákup",	
			description:"Vše prosím nakoupit v KAUFLANDU.",
			is_archived:0,
			is_solved:1,
			shopping_list_items:[
				{sliid:101,id_shopping_list:5,name:"Rohlíky",value:"10 ks",is_solved:1},
				{sliid:102,id_shopping_list:5,name:"Chléb",value:"1 ks",is_solved:1},
				{sliid:103,id_shopping_list:5,name:"Mléko",value:"3 x 1l",is_solved:1},
				{sliid:107,id_shopping_list:5,name:"Jogurt bílý",value:"4 ks",is_solved:1},				
				],
			shopping_list_members:[
				{slmid:25,id_shopping_list:5,id_user:5},
				{slmid:74,id_shopping_list:5,id_user:1},
				{slmid:88,id_shopping_list:7,id_user:3}
				]
		},
		{
			slid:9,
			id_owner:5,
			name:"Nákup",	
			description:"",
			is_archived:1,
			is_solved:1,
			shopping_list_items:[
				{sliid:966,id_shopping_list:9,name:"Cukr",value:"1 kg",is_solved:1},
				{sliid:587,id_shopping_list:9,name:"Sůl",value:"1 kg",is_solved:1},								
				],
			shopping_list_members:[
				{slmid:56,id_shopping_list:9,id_user:3},				
				]
		},
		{
			slid:11,
			id_owner:5,
			name:"Malý nákup",	
			description:"",
			is_archived:1,
			is_solved:0,
			shopping_list_items:[
				{sliid:1010,id_shopping_list:11,name:"Cukr",value:"1 kg",is_solved:1},
				{sliid:1011,id_shopping_list:11,name:"Ponožky",value:"1 kg",is_solved:0},								
				],
			shopping_list_members:[
				{slmid:566,id_shopping_list:11,id_user:2},				
				]
		},		
		{
			slid:12,
			id_owner:5,
			name:"Tesco",	
			description:"",
			is_archived:1,
			is_solved:1,
			shopping_list_items:[
				{sliid:1025,id_shopping_list:12,name:"Krkovička",value:"1,5 kg",is_solved:1},
				{sliid:1026,id_shopping_list:12,name:"Párky",value:"1 kg",is_solved:1},								
				],
			shopping_list_members:[
				{slmid:601,id_shopping_list:12,id_user:2},				
				]
		},
		{
			slid:13,
			id_owner:5,
			name:"Kaufland",	
			description:"",
			is_archived:0,
			is_solved:0,
			shopping_list_items:[
				{sliid:1042,id_shopping_list:13,name:"Donutky",value:"4 ks",is_solved:1},
				{sliid:1043,id_shopping_list:13,name:"Mléko",value:"1 bal.",is_solved:0},								
				{sliid:1044,id_shopping_list:13,name:"Sýr cihla nakrájet",value:"20 až 30 dkg",is_solved:0},								
				],
			shopping_list_members:[
				{slmid:608,id_shopping_list:13,id_user:3},				
				]
		},
		{
			slid:14,
			id_owner:3,
			name:"Lídl",	
			description:"",
			is_archived:0,
			is_solved:0,
			shopping_list_items:[
				{sliid:1045,id_shopping_list:14,name:"Gyros",value:"2 ks",is_solved:0},
				{sliid:1046,id_shopping_list:14,name:"Šunka dětská 100g",value:"6 ks",is_solved:0},								
				{sliid:1047,id_shopping_list:14,name:"Pribiňáček",value:"4 ks",is_solved:0},								
				],
			shopping_list_members:[
				{slmid:609,id_shopping_list:14,id_user:5},
				{slmid:610,id_shopping_list:14,id_user:2},								
				]
		}
		
		
	];	

		
const App=()=>{	
	//component rendering updates:
	const [updateMain,setUpdateMain]=useState(0);
	const refreshMain=()=>{setUpdateMain(updateMain+1);}
	
	//Change logged user
	let callbackChangeUser=(uid)=>{					
		current_user=uid;				
		refreshMain();		
		}
	
	return(
		<>			
			<div className="row ">		
				<div className="col-xs-12 col-sm-8 col-md-9">
					<h1>Domácí úkol 3 - Nákupní seznamy <small>(Frontendové systémy / Miloš Hynek)</small></h1>	
				</div>	
				<div className="col-xs-12 col-sm-4 col-md-3 align-right">
					<UserSelector users={INITIAL_USERS} currentUser={current_user} callbackChangeUser={callbackChangeUser} />
				</div>							
			</div>
			<br />			
			<Route shoppingLists={INITIAL_SHOPPING_LISTS} users={INITIAL_USERS} currentUser={current_user} currentRoute={current_route} currentRouteId={current_route_id}  />								
			<br /><br />
			<h2>Přehled dat uživatelů v&nbsp;systému <small>(za&nbsp;účelem testování)</small></h2>
			{INITIAL_USERS.map((user:{...})=>
				(<div key={user.uid}>#{user.uid} - {user.degree} {user.name} {user.surname} - {user.email}</div>)
			)}				
		</>
		);
	};
export default App;
	
