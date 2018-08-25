# Sing Tao Life Server
visit the live site at http://st_life.singtaola.com

This is a complete server ready to deploy on any host. The site is built with the MERN stack (i.e. MongoDB, Express.js, React.js, and Node.js).  
This project can be separated into three main parts: Ubuntu server, Node server, and front-end React.

## Ubuntu server
The Ubuntu server is configured to unzip the advertisement package uploaded via FTP every day. It then converts and stores the content into MongoDB. It is also configured to remove expired data every 10 days to free up some space. Sample data before converted can be viewed [here]().

## Node server
The Node server is set up to provide routing system, server-side rendering, and Ad API that the front-end React uses.
