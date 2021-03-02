function get_json(path, def={})
{
  return fetch(path)
    .then(response => response.json())
    .catch( () => def );
}

function post_json(path, obj, def={msg:"Bad communication with server"})
{
  return fetch( path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify( obj ),
  })
  .then(response => response.json())
  .catch(data => def );
}

export class ServerApi
{
  constructor()
  {
    console.log("I am a server!!");
    //this.key = null;
    this.current_user = null;
  }
  
  async add_user(user, full_name=user)
  {
    let res = await post_json("add_user", { user, full_name } );
    
    console.log( res.status ? "User was added" : "User already exist" );
    
    return res.status;
  }
  
  async add_admin(user, full_name=user)
  {
    let res = await post_json("add_admin", { user, full_name } );
    
    console.log( res.status ? "Admin was added" : "Admin already exist" );
    
    return res.status;
  }
  
  async sign_in( user )
  {
    let res = await post_json("sign_in", { user } );
    
    console.log( res.status ? "User signed in" : "User sign in failed" );
    
    this.current_user = user;
    
    return res.status;
  }
  
  async sign_out( )
  {
    this.current_user = null;
    return true;
  }
  
  async list_admin ()
  {
    let res = await get_json("list_admin" );
    return res.list;
  }
  
  async list_schedule ( admin )
  {
    let res = await post_json("list_schedule", {admin, user:this.current_user} );
    return res.schedule;
  }
  
  async reserve ( admin, slot )
  {
    slot = Number(slot);
    let res = await post_json("reserve", {admin, slot, user:this.current_user} );
    return res.status;
  }
  
  async cancel ( admin, slot )
  {
    slot = Number(slot);
    let res = await post_json("cancel", {admin, slot, user:this.current_user} );
    return res.status;
  }
}
