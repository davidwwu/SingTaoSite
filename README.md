# Sing Tao Life Server
visit the live site at http://st_life.singtaola.com

This is a complete server ready to deploy on any host. The site is built with the MERN stack (i.e. MongoDB, Express.js, React.js, and Node.js).  
This project can be separated into three main parts: Ubuntu server, Node server, and front-end React.

## Ubuntu server
The Ubuntu server is configured to unzip the advertisement package uploaded via FTP every day. It then converts and stores the content into MongoDB. It is also configured to remove expired data every 10 days to free up some space. Sample data that gets sent through FTP can be viewd [here](https://github.com/davidwu220/SingTaoSite/tree/master/README/example%20files).

## Node server
The Node server is set up to provide routing system, server-side rendering, and Ad API that the front-end React uses.

## API Usage:

#### To get all classified ads:
```
/api/classifiedAds
```

#### To get a specific class of classified ads:
```
/api/classifiedAds/[class]
```

#### To get manually upload ads:
```
/api/get_manual_uploads
```

#### To get a specific location of manually upload ads:
```
/api/get_manual_uploads/[location]
```
where location can be `top_ad`, `slider`, `aside`, `aside/left`, and `aside/right`.

#### To get all commertial ads:
```
/api/commertialAds
```

#### To get a specific class of commertial ads:
```
/api/commertialAds/[class]
```

### RESTful APIs for creating/reading/updating/deleting manually upload ads
note that you'll have to login to the `/maintenance` page first.

#### GET all entries of manual uploads
```
/maintenance:query?
```

#### GET/POST new entries
```
/maintenance/create
```

#### GET/POST existing entries
```
/maintenance/:id/edit
```

#### GET/POST deletion
```
/maintenance/:id/delete
```
