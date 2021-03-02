const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

app.use(express.json())
//app.use(express.urlencoded({ extended: true }))

let users = {};
let admins = [];

class User
{
  constructor( obj )
  {
    console.log("Adding a new user", obj);
    this.user = obj.user;
    this.full_name = obj.full_name;
  }
  
  sign_in( obj )
  {
    if ( obj.user == this.user )
      return true;
    else
      return false;
  }
  
  sign_out()
  {
  }
}

class Admin extends User
{
  constructor( ...args )
  {
    super( ...args );
    this.admin = true;
    
    admins.push(this);
    
    this.time_slot = Array(5).fill("");
    
    console.log("  Set user as admin");
  }
}

function insert_user_or_admin( req, res, is_admin=false)
{
  let obj = req.body;
  //console.log(obj, obj.user);
  
  if ( users[obj.user] == null )
  {
    users[obj.user] = is_admin ? new Admin(obj) : new User(obj);
    res.json( { status:true } );
  }
  else
    res.json( { status:false } );
}

app.get('/', (req, res) => {
  res.sendFile(  path.join(__dirname,  "index.html"));
})

app.get('/server_api.js', (req, res) => {
  res.sendFile(  path.join(__dirname,  "server_api.js"));
})

app.post('/add_user', (req, res) => {
  insert_user_or_admin(req, res);
})

app.post('/add_admin', (req, res) => {
  insert_user_or_admin(req, res, true);
})

app.post('/sign_in', (req, res) => {
  
  let obj = req.body;
  
  if ( users[obj.user] )
  {
    //users[obj.user].sign_in
    res.json( { status:true } );
  }
  else
    res.json( { status:false } );
})

app.get('/list_admin', (req, res) => {
  
  let list = [];
  
  admins.forEach( (obj) => list.push(obj.full_name) );
  
  res.json( { status:true, list } );
})

function is_text(text)
{
  return text != null && text.length > 0;
}

function get_admin_time_slot( admin, user)
{
  let array = [];
  admin.time_slot.forEach( slot => array.push( is_text(user) &&  slot == user ?
                                                 users[user].full_name :
                                               slot == "" ? "FREE" :
                                               users[user] == null ? "BUSY" :
                                               users[user].admin ?
                                                 users[slot].full_name : "BUSY" ) );
  return array;
}

function find_admin_by_full_name(full_name)
{
  if ( ! is_text(full_name) )
    return null;
  
  for ( let item of admins )
    if ( item.full_name == full_name )
      return item;
  
  return users[full_name] && users[full_name].admin ? users[full_name] : null;
}

app.post('/list_schedule', (req, res) => {
  
  let obj = req.body;
  let admin = find_admin_by_full_name(obj.admin);
  
  let schedule = {};
  
  if ( admin )
  {
    schedule[admin.full_name] = get_admin_time_slot(admin, obj.user);
  }
  else if ( is_text(obj.user) )
  {
    admins.forEach( (admin) =>
        schedule[admin.full_name] = get_admin_time_slot(admin, obj.user) );
  }
  else
  {
    admins.forEach( (admin) =>
        schedule[admin.full_name] = get_admin_time_slot(admin, "") );
  }
  
  res.json( {status:true, schedule} );
  
})

app.post('/reserve', (req, res) => {
  
  let obj = req.body;
  let admin = find_admin_by_full_name(obj.admin);
  
  if ( admin )
  {
    if ( admin.time_slot[obj.slot] == "" )
    {
      admin.time_slot[obj.slot] = obj.user
      res.json( {status:true} );
    }
    else
      res.json( {status:false} );
  }
  else
    res.json( {status:false} );
})

app.post('/cancel', (req, res) => {

  let obj = req.body;
  let admin = find_admin_by_full_name(obj.admin);
  
  if ( obj.admin )
  {
    if ( users[obj.user].admin || admin.time_slot[obj.slot] == obj.user )
    {
      admin.time_slot[obj.slot] = "";
      res.json( {status:true} );
    }
    else
      res.json( {status:false} );
  }
  else
    res.json( {status:false} );
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
