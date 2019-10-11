import React from 'react';
//import logo from './logo.svg';
//import './App.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
const axios = require('axios');
class  App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      allUsers: [],
      newuser: {},
    }
  }
  componentDidMount(){
    axios.get('http://localhost:8000/api/')
  .then( (res) =>{
    if(res.data.status){
      console.log('res.data.data',res.data.data)
      this.setState({allUsers: res.data.data})
    }
    console.log(res);
  })
  .catch(function (error) {
    // handle error
    
    console.log(error);
  })
  }

   saveEditedinApi =(oldValue, newValue, row, column)=>{
     const data ={data:{[column.dataField]:newValue}};
    axios.put(`http://localhost:8000/api/${row._id}`, data)
      .then( (res) =>{
        if(res.data.status){
          this.setState({allUsers: res.data.data})
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render(){
    const columns = [{
      dataField: 'firstname',
      text: 'First Name '
    },
     {
      dataField: 'lastname',
      text: 'Last Name'
    },
    {
      dataField: 'username',
      text: 'user Name'
    },
    {
      dataField: 'email',
      text: 'email'
    },
     {
      dataField: 'createdAt',
      text: ' createdAt'
    }];
  return (
    <div className="App">

      
      <header className="App-header">
      <BootstrapTable
  keyField="id"
  data={ this.state.allUsers }
  columns={ columns }
  cellEdit={ cellEditFactory({
    mode: 'click',
    afterSaveCell: (oldValue, newValue, row, column) => { 
      console.log('After Saving Cell!!',oldValue, newValue, row, column); 
      this.saveEditedinApi(oldValue, newValue, row, column);
    }
  }) }
/>
      </header>
      
    </div>
  );
}
}

export default App;
