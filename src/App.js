import React from 'react';
import logo from './logo.svg';
import './App.css';


const user = "kemo"
let databasenub = "db"
let sqlQuery = "select * from asd"
let qparams = "fvbhdf,fgdgdfg"


function App() {

/////////////copy
const [copySuccess, setCopySuccess] = React.useState('');
  const textAreaRef = React.useRef(null);
function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setCopySuccess('Copied!');
  };



const arr = [{id:0,name:"userId",type:"uint64"},
{id:1,name:"username",type:"string"},
{id:2,name:"realname",type:"string"},
{id:3,name:"identity",type:"string"},
{id:4,name:"phone",type:"string"},
{id:5,name:"email",type:"string"},
{id:6,name:"verified",type:"bool"}
];
	const [n,setN] = React.useState(0);
const [output,setOutput] = React.useState('');
const [render,setRender] = React.useState(true);
const [vals,setVal] = React.useState(arr);

console.log("rendered")


let newText = output;

const Data = vals.map(i => {
  //  return <div style={{display: "flex",flexDirection:"row"}}><div>{i.id}</div><div>  |   </div><div>{i.name}</div><div>   |  </div><div>{i.type}</div></div>
	return <div>{i.id+"______"+i.name+"______"+i.type}</div>


});
const structsjson =
   vals.map(i=>{
		 	return <div>{i.name.charAt(0).toUpperCase()+i.name.substring(1)+" "+i.type+"  "+'`json:"'+i.name+'"`'}</div>
	})


const completestruct =

"type "+user+" struct {"

;

const tempstructs =
	   vals.map(i=>{
			 	return <div>{i.name+" "+i.type}</div>
		})




const templete = () =>  <div>var ({tempstructs})</div>;

const scanquery = (arr) => {
  var str = ""
	var i = 0
	while (i<arr.length) {
		  if(i!=0){
				if(arr[i].type.substring(0,2)==="[]"){
					  str = str + ",pq.ARRAY(&"+arr[i].name+")";
          }else{
						str = str + ",&"+arr[i].name;
					}

		}
		else{
			if(arr[i].type.substring(0,2)==="[]"){
					str = str + "pq.ARRAY(&"+arr[i].name+")";
					continue;
			}else{
				str = str + "&"+arr[i].name;
			}

		}
			i++;
		}
	return str;
	}

const data2struct = (arr) => {
	  var str = ""
		var i = 0
		while (i<arr.length) {
 if(i!=0){
							str = str + "," + arr[i].name.charAt(0).toUpperCase()+arr[i].name.substring(1)+":"+arr[i].name;
}

			else{

					str = str + arr[i].name.charAt(0).toUpperCase()+arr[i].name.substring(1)+":"+arr[i].name;

			}
				i++;
			}
		return str;
		}


const templeteb = "if err := row.Scan("+scanquery(vals)+");\nerr != nil {\nlog.Fatal(err)\n} \n "+user+" := &"+user.charAt(0).toUpperCase()+user.substring(1)+"{"+data2struct(vals)+"}";

const x = templeteb.split('\n').map((value) => {
               return <div>{value}</div>;
            })
const newline =(x)=> x.split('\n').map((value) => {
						               return <div>{value}</div>;
						            })

const getjson = "json_str, err := json.Marshal("+user.charAt(0).toUpperCase()+user.substring(1)+"{"+data2struct(vals)+"})\nif err != nil {panic(err)}"

//const sqlpart = "rows, err := {"+databasenub+"}.Query(`"+{sqlQuery}+"`,"+{parameters}+")\nif err != nil \n {fmt.Println(\"Cannot went database\")panic(err)} \n defer rows.Close()"

console.log(structsjson);

const check = async(arr,x)=>{
	var i = 0;
while (i<arr.length) {

	if(parseInt(arr[i].id) === parseInt(x.id) || arr[i].name === x.name){
       alert("exists");
      vals[i]=x;
			setRender(!render)
			return ;
	}
i++;
}

vals.push(x)
setN(n+1)
console.log(n)
setRender(!render)

}


const sqlQuerypart = "rows, err := "+databasenub+".Query(`{"+sqlQuery+"}`,"+qparams+" )\n//*******************\n//error if found\nif err != nil {\nfmt.Println(\"Cannot went database\")\npanic(err)}\ndefer rows.Close()"




  return (
    <div className="App">
      <header className="App-header">



				<div style={{height:200,width:100+"%",backgroundColor:"orange",color:"black",textAlign:"left",overflow:"scroll",fontSize:15}}>

				{/*for structs*/}
  <div>{"//"}{user}{"struct \n"}</div>
  {completestruct}
  {structsjson}
	{"}"}

      {/*for function*/}
			 <div>{"//function"}</div>
			<div>{"func "}{"funcname"}{"(c *gin.Context)"}{"{"}</div>
         <div>{"//get queryparams from request"}</div>
				 <div>{"//run query and close "}</div>
				 {newline(sqlQuerypart)}
<div>{"//looping through the sqlrowdata"}</div>
	<div>{"var arr []json.RawMessage"}</div>
				<div>{"for rows.Next() { "}</div>
      {templete()}
       {scanquery}
      {newline(getjson)}

	<div>{"arr = append(arr,json.RawMessage(json_str))}"}</div>


						<div>{"c.JSON(200, arr)"}</div>
      <div>{"}"}</div>
       </div>
<NewElem id={n} onClick={(x)=>{check(vals,x);setVal(vals);setOutput(Data)}} />
  <div>{tempstructs}</div>
      </header>
    </div>
  );
}




function NewElem(props) {

	const ref = React.createRef();


	const [name,setName] = React.useState("name");
	const [type,setType] = React.useState("Type");
const [id,setId] = React.useState(props.id);


	return(

		<div ref={ref}>
		<button  onClick={()=>{props.onClick({id:id,name:name,type:type});}} name={"make"}>name</button>
		<input style={{height:40,width:100}} placeholder={"name"} value={id} onChange={(x)=>{setId(x.target.value);console.log(id)}}></input>
      <input style={{height:40,width:100}} placeholder={"name"} value={name} onChange={(x)=>{setName(x.target.value);console.log(name)}}></input>
			<input style={{height:40,width:100}} placeholder={"name"} value={type} onChange={(x)=>{setType(x.target.value);console.log(type)}}></input>
		</div>
	);
}

export default App;


const tempstructs =  (vals) => {
    vals.map(i=>{
		 	return <div>{i.name+" "+i.type}</div>
	})

}
/*
const structsjson =  (vals) => {
   vals.map(i=>{
		 	return <div>{i.name.charAt(0).toUpperCase()+i.name.substring(1)+" "+i.type+"  "+'`json:"'+i.name+'"'}</div>
	})

}
*/
