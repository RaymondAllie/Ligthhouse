
const express = require('express');
const app = express();
const fs = require('fs')
const { Pool, Client} = require('pg');

const connectionString = 'postgressql://raymond:12345@localhost:5432/lighthouse'
const pool = new Pool({
    connectionString: connectionString
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


async function insert(user, pass) {
    const client = new Client({
        connectionString: connectionString
    });
    try {
        await client.connect()
        await client.query("INSERT INTO users(username, password) values ( $1 , $2 )", [user, pass])
        await client.end()
        return true
    } catch (err) {
        console.log(err)
    }
    
}

async function insert_sheet(user) {
    const client = new Client({
        connectionString: connectionString
    });
    try {
        await client.connect()
        await client.query("INSERT INTO sheets(username, sheet, sheet_count, name) values ( $1 , '', 0 , '')", [user])
        await client.end()
        return true
    } catch (err) {
        console.log(err)
    }
    
}
async function add_data(where, data, user) {
    const client = new Client({
        connectionString: connectionString
    });
    try {
        await client.connect()
        await client.query("update sheets set $1 = $2 where username = $3", [where, data, user])
        await client.end()
        return true
    } catch (err) {
        console.log(err)
    }
        
}
async function get_authen(user, pass) {
    const client = new Client({
    connectionString: connectionString
});
     try {   
        await client.connect()
        var a = await client.query("SELECT * FROM users WHERE username = $1", [user])   
        await client.end()
        if (a.rowCount > 0 && a.rows[0].password === pass) {
            return true
        } else {
            return false
                    
        }

     } catch (err) {
         console.log(err)
     }
}

 
async function sheet_num(user) {
    const client = new Client({
    connectionString: connectionString
});
     try {   
        await client.connect()
        var a = await client.query("SELECT sheet_count FROM sheets WHERE username = $1", [user])   
        await client.end()
        return a.rows[0].sheet_count
     } catch (err) {
         console.log(err)
     }
      
    }
     





app.get('/usernew/:use', (req, res, next) => {
    var username = req.params.use;
    username = username.split('|')
    insert_sheet(username[0])
    insert(username[0], username[1]).then((ress) => { 
        res.send({'Status': 'Success'})
    }).catch((err) => {
        console.log(err)
    })
})

app.get('/existing_user/:use', (req, res, next) => {
    var username = req.params.use;
    
    username = username.split('|')
    get_authen(username[0], username[1]).then((boo) => {
        res.send({'authentification': boo})
    })
    
})
function transform(stuff) {
    return stuff
}
app.get('/get_sheets/:data', (req, res, next) => {
    var data = req.params.data;
    var new_data = transform(data)
    res.send({data: new_data})
})
app.get('/count/:use', (req, res, next) => {
    var user = req.params.use
    sheet_num(user).then((num) => {
        res.send({'count': num})
    })
})

app.get('/sheet_name/:stuff', (req, res, next) => {
    var username = req.params.use;
    
    username = username.split('|')
    
    add_data(`name`, username[0], username[1])
})

app.listen(3000, () => {
    console.log('server listening...')
});


