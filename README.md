# Save The Trip - Backend

> This is the REST API that you can integrate with using the [Save The Trip app](https://save-the-trip-frontend.herokuapp.com/auth). <br/>
> It allows you to login and register. Authentication is managed by **_passport JWT strategy_**. After logging in, the user can create a new trip with assigned documents and a shopping list. To each trip user can add a photo, which will be stored in AWS S3 bucket, highly-scalable, secured and low-latency data storage from the cloud. <br/> All user information is stored in the MySQL database and can be created, read, updated and deleted.

## Created with:

- [Node.js](https://nodejs.org/en/about/) - an asynchronous event-driven JavaScript runtime, designed to build scalable network applications.
- [Express](https://expressjs.com/) - a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- [MySQL](https://www.mysql.com/) - an open-source relational database management system.
- [mysql2](https://www.npmjs.com/package/mysql2) - MySQL2 project is a continuation of MySQL-Native with additional features such as promise wrapper.
- [bcrypt.js](https://www.npmjs.com/package/bcryptjs) - a library to hash passwords.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - an implementation of [JSON Web Tokens](https://datatracker.ietf.org/doc/html/rfc7519).
- [AWS - S3](https://aws.amazon.com/s3/?nc2=h_ql_prod_fs_s3) - Object storage built to store and retrieve any amount of data from anywhere
- [Multer](https://github.com/expressjs/multer#readme) - A middleware for handling `multipart/form-data`.
- [Sharp](https://www.npmjs.com/package/sharp) - converts large images in common formats to smaller, web-friendly JPEG, PNG, WebP and AVIF images of varying dimensions.
