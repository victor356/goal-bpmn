import axios, { Axios } from 'axios';
import React, { useState, useEffect } from 'react';
//import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import "./deviceTable.scss";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { render } from 'react-dom';
import alignElements from 'diagram-js/lib/features/align-elements';
import { alignProperty } from '@mui/material/styles/cssUtils';
//import '../deviceTable.css';

// class Portfolio extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {value: ''};
//     const [data, setData] = useState([])
//     const URL = 'http://localhost:8080/getResults/';

//     useEffect(() => {
//         fetchData()
//     }, [])


//     axios.get(URL)
//     .then(response=>{
//         setData(response);
//       console.log(response.data);
//      console.log("asdasdasd1");


//     })
//     .catch(error=>{
//      console.log(error)
//      console.log("asdasdasd2");
//     })



//     // const fetchData = () => {
//     //     fetch(URL)
//     //         .then((res) =>
//     //             res.json())

//     //         .then((response) => {
//     //             console.log(response);
//     //             getData(response);
//     //         })

//     // }
//     render() {

//     return (
//         <>
//             <h1>How to display JSON data to table in React JS</h1>
//             <tbody>
//                 <tr>

//                 {data.map((item, i) => (
//                     <tr key={i}>
//                         <th>{item.head.vars}</th>

//                     </tr>
//                 ))}
//                 </tr>
//                 {data.map((item, i) => (
//                     <tr key={i}>
//                         {/* <td>{item.us}</td>
//                         <td>{item.id}</td>
//                         <td>{item.title}</td>
//                         <td>{item.body}</td> */}
//                     </tr>
//                 ))}
//             </tbody>

//         </>
//    );
// }
// }

// export default DeviceTable;


// class DeviceTable extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {value: ''};
//       const [data, setData] = useState([])
//       const URL = 'http://localhost:8080/getResults/';
//     }

//     //   useEffect(() => {
//     //       fetchData()
//     //   }, [])


//       axios.get(URL)
//       .then(response=>{
//           setData(response);
//         console.log(response.data);
//        console.log("asdasdasd1");


//       })
//       .catch(error=>{
//        console.log(error)
//        console.log("asdasdasd2");
//       });

//     render() {
//       return (

//         <><h1>How to display JSON data to table in React JS</h1><tbody>
//               <tr>

//                   {data.map((item, i) => (
//                       <tr key={i}>
//                           <th>{item.head.vars}</th>

//                       </tr>
//                   ))}
//               </tr>
//               {data.map((item, i) => (
//                   <tr key={i}>
//                       {/* <td>{item.us}</td>
//             <td>{item.id}</td>
//             <td>{item.title}</td>
//             <td>{item.body}</td> */}
//                   </tr>
//               ))}
//           </tbody></>


//       );
//     }
//   }
// }
//   export default DeviceTable;

function DeviceTable() {

    const [data, setData] = useState([])
    const [row, setRow] = useState([])
    const [col, setCol] = useState([])
    const [mapRow, setMap] = useState([])
    const [json, setJson] = useState()

    useEffect(() => {
        axios.get("http://localhost:8080/getResults")
            .then(res => {
                //     console.log("Getting data from::", res.data)
                // console.log("Getting data from::", res.data.head.vars)
                //  console.log("Getting data from::", res.data.results.bindings)
                //       console.log("col", res.data.head.vars);
                //      console.log("row", res.data.results.bindings);
                //   setCol(res.data.head.vars)
                setRow(res.data.results.bindings)


                // setMap(res.data.head.vars.map(item => ({
                //     id: item

                // })))

                // res.data.head.vars.map((item) => setCol(item))
                // console.log("ced",res.data.results.bindings[0])
                //  console.log("aaaaaaaa",col)
                // console.log("bbbbb",row)



            })
            .catch(err => console.log(err))
    }, [])




    //   Object.keys(row[0]).forEach((prop)=> console.log(prop));

    //console.log("topo",row[0])
    //  Object.keys(row[0]).forEach((prop) => console.log(prop))

    const formatRows = () => {
        var words = []
        console.log(row)
        for (let propName in row[0]) {
            words.push(propName)
        }
        return words;
    }
    const renderHead = () => {
        var prop = formatRows()
        return prop.map((key) => {

            return (

                (<Th>{key}</Th>)

            )
        })

    }

    // words.map((element) => {
    //     return (<Th>{element}</Th>)
    // })

    // Object.keys(row[0]).forEach((prop) =>  {return (

    //     <Th>{prop}</Th>
    // )})
    // Object.keys(row).forEach((key) => {
    //     return (

    //         <Th>{key}</Th>
    //     )
    // })
    // return row.map(item => (
    //     //  console.log("11111", Object.keys(item)),
    //     Object.keys(item).map((key) => {
    //         return (

    //             <Th>{key}</Th>

    //         )
    //     })))
    const fin = (word) => {
        let pippo = ""
        pippo = String(word)
        if (pippo.includes("#")) { pippo = pippo.substring(pippo.indexOf("#") + 1, pippo.length) }
        else { }

        return (pippo)
    }

    //word = item[key]["value"];
    const renderBody = () => {
        return row.map(item => (

            <Tr>

                {
                    Object.keys(item).map((key) => (
                        (<Td style={{ textAlign: "center", borderColor: "black",  borderBottom: '1px solid rgba(0, 0, 0, 0.5)',  }}>{fin(item[key]["value"])}</Td>)

                    ))}


                {/* {Object.keys(item).forEach(key => {

//console.log(`key: ${key}, value: ${obj[key]}`)


if (typeof item[key] === 'object' && item[key] !== null) {
 //{  console.log("qweeeeeee", item[key]["value"])}

 (<Td> pippo</Td>)
}

// if (key == 'value' && obj[key] !== null) {
//     iterate(obj[key])
// }
})} */}

                {/* {item.map(value=>{
                    <Td>{value}</Td>
                })} */}
                {/* <Td>{item["devices"]["value"]}</Td>

                    {Object.keys(item).forEach(function (key, index) {
                        // key: the name of the object key
                        // index: the ordinal position of the key within the object
                        <Td>{key}</Td>
                        {console.log("qqqqq",key)}
                    })}
                    {console.log("assdsa", item)} */}
                { }
            </Tr>

        )
        )
    }


    return (
        <div style={{  display: 'contents',
        alignItems: 'center',
        justifyContent: 'center',
       
        width:"100%"}}>
            <h1>Results:</h1>
            <br/>

            <div style={{  width: "50%", height: "100%", }}>
                {/* <table>

                <tr>
                    {col.map(item=>
                        <td>{item}</td>
                    )}
                </tr>
                {row.map(item=>
                <tr>
                    <td>{item.devices.value}</td>
                </tr>
                    )}
               </table> */}
                <Table>
                    <Thead>
                        <Tr >
                            {renderHead()}
                        </Tr>
                    </Thead>
                    <Tbody  >




                        {renderBody()}

                    </Tbody>
                </Table>
                {/* <DataGrid
                    rows={mapRow}
                    columns={col}

                    //getRowId={item => item.value}
                   // pageSize={5}
                   // rowsPerPageOptions={[5]}
                // checkboxSelection
                /> */}
            </div>




            {/* {col.devices.map((type, value) =>
                    <tr>
                        <th>{type}</th>
                        <th>{value}</th>
                    </tr>

                )} */}



            {/* {row.map((item, i) => (
                    <tr key={i}>
                        <td>{item}</td>

                    </tr>
                ))} */}
        </div >
    )
}
export default DeviceTable;