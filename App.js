// // Logic to create a server or make computer to behave like server
//To render the HTML and type the less the node.js code use Express.js
// // We need http module
// const myServer = require('http');
// // myServer.createServer().listen(6000)   //For any server has port number means address Here 6000 is address of our server
// //Because the browser sent request to server in order to get response from server
// // Chrome Browser --> Go to address(6000) --> server --> appropriate response 
// myServer.createServer(function(request , response){   //Every server has req and response
//     // console.log(request);
//     // console.log(request.url);  //If u give any url this will print below
//     if(request.url == '/add/student'){
//         //Server will respond back to browser
//         response.write('') //AFter giving response end the response
//         response.end()
//     }
//     else{
//         response.write('<h1> 404 NOT FOUND</h1>')
//     }
    
// })
// .listen(3001)