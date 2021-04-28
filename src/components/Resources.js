import React, {Component} from 'react';
import Table from "./Table"
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
const fetch = require('node-fetch');
let houseData=[], foodData=[], clothingData=[]

const houseColumns=[{
        Header: 'Housing',
        columns:[{
            Header: "Name",
            accessor: "name"
        },{
            Header: "Type",
            accessor: "housing"
        },{
            Header: "Phone",
            accessor: "phone"
        },{
            Header: "Other Contact",
            accessor: "contact"
        },{
            Header: "Address",
            accessor: "address"
        },{
            Header: "City",
            accessor: "city"
        },{
            Header: "Zip Code",
            accessor: "zip"
        },{
            Header: "County",
            accessor: "county"
        },{
            Header: "Notes",
            accessor: "notes"
        },{
            Header: "Distance",
            accessor: "distance"
        }]
}]

const foodColumns=[{
        Header: 'Food',
        columns:[{
            Header: "Name",
            accessor: "name"
        },{
            Header: "Type",
            accessor: "type"
        },{
            Header: "Address",
            accessor: "address"
        },{
            Header: "Phone",
            accessor: "phone"
        },{
            Header: "City",
            accessor: "city"
        },{
            Header: "Zip Code",
            accessor: "zip"
        },{
            Header: "County",
            accessor: "county"
        },{
            Header: "Notes",
            accessor: "notes",
            width: 2000
        },{
            Header: "Site",
            accessor: "site",
            Cell: ({ row }) => {
                if(row.original.site!='N/A')
                    return <a href={row.original.site}>Site</a>
                return <p>N/A</p>
            }
        },{
            Header: "Timing",
            accessor: "timing"
        },{
            Header: "Distance",
            accessor: "distance"
        }]
}]

const clothingColumns=[{
        Header: 'Clothing',
        columns:[{
            Header: "Name",
            accessor: "name"
        },{
            Header: "Type",
            accessor: "type"
        },{
            Header: "Address",
            accessor: "address"
        },{
            Header: "Phone",
            accessor: "phone"
        },{
            Header: "City",
            accessor: "city"
        },{
            Header: "Zip Code",
            accessor: "zip"
        },{
            Header: "County",
            accessor: "county"
        },{
            Header: "Site",
            accessor: "site",
            Cell: ({ row }) => <a href={row.original.site}>Site</a>
        },{
            Header: "Timing",
            accessor: "timing"
        },{
            Header: "Notes",
            accessor: "other"
        },{
            Header: "Distance",
            accessor: "distance"
        }]
}]

let findStuff=async({setData}, data, {setLoaded})=>{
    fetch('https://sortbydistance.herokuapp.com/housing')
    .then(res => res.json())
    .then(json => {
        console.log(json)
        setData(json)
        houseData=json
        setLoaded(false)
    });
    fetch('https://sortbydistance.herokuapp.com/clothing')
    .then(res => res.json())
    .then(json => {
        clothingData=json
    });
    fetch('https://sortbydistance.herokuapp.com/food')
    .then(res => res.json())
    .then(json => {
        foodData=json
    });
    // entry = await food.find({});
    // entry.forEach(el=>{
    //     foodData.push(el)
    // })
    // entry = await clothing.find({});
    // entry.forEach(el=>{
    //     clothingData.push(el)
    // })
}

export default function Resources() {
    const [data, setData] = React.useState([]);
    const [houseLoading, setHouse] = React.useState(true)
    const [clothLoading, setCloth] = React.useState(true)
    const [foodLoading, setFood] = React.useState(true)
    const [tableCols, setTableCols] = React.useState(houseColumns)
    React.useEffect(() => {
        fetch('https://sortbydistance.herokuapp.com/housing')
        .then(res => res.json())
        .then(json => {
            console.log(json)
            setData(json)
            houseData=json
            setHouse(false)
        });
        fetch('https://sortbydistance.herokuapp.com/clothing')
        .then(res => res.json())
        .then(json => {
            clothingData=json
            setCloth(false)
        });
        fetch('https://sortbydistance.herokuapp.com/food')
        .then(res => res.json())
        .then(json => {
            foodData=json
            setFood(false)
        });
        return () => console.log('unmounting...');
      }, [])
    return (
        <Container>
        <Button onClick={() => { setTableCols(houseColumns); setData(houseData); }} variant="contained" color="primary">
          Housing
        </Button>
        <Button onClick={() => { setTableCols(foodColumns); setData(foodData);}} variant="contained" color="primary">
          Food
        </Button>
        <Button onClick={() => { setTableCols(clothingColumns); setData(clothingData); console.log(clothingData)}} variant="contained" color="primary">
          Clothing
        </Button>
        <br/><br/>
           {
                //name housing phone contact address city zip county notes
                (houseLoading&&foodLoading&&clothLoading)?"Loading data...":<Table columns={tableCols} data={data} />
            }
        </Container>
    )
}
