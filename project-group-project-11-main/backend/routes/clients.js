// This file stores all the API endpoints for making calls to the "clients" collection in the MongoDB database

// Import functionalities
const express = require('express');
const router = express.Router();
const multer = require('multer'); // Add multer for image upload
const fs = require('fs'); // Import the 'fs' module for file operations
const path = require('path');

// Middleware for authorization. For API calls that require authorization, this middleware checks if the header of API calls have a valid security token. If no security token or invalid security token, then the API call is not made.
const authMiddleWare = require('../auth/authMiddleWare');

// importing data model schemas
const { clients, events } = require('../models/models');
const { ObjectId } = require('mongodb');

// reading the org id from the environment variable
const org = process.env.ORG_ID;

// API Endpoint to Get all clients
router.get('/', authMiddleWare, async (req, res) => {
  try {
    const cli = await clients.find({});
    res.json(cli);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// API endpoint to GET single client by ID
router.get('/id/:id', authMiddleWare, (req, res, next) => {
  clients.findOne({ _id : req.params.id, orgs: org }, (error, data) => {
    if (error) {
      return next(error);
    } else if (!data) {
      res.status(400).send('Client not found');
    } else {
      res.json(data);
    }
  });
});

// API endpoint to GET entries based on search query
// Ex: '...?firstName=Bob&lastName=&searchBy=name'
router.get('/search', authMiddleWare, (req, res, next) => {
  const dbQuery = { orgs: org };
  let queryArray = [];
  let regexOptions = 'i';

  switch (req.query.searchBy) {
    case "name":
      if (req.query.firstName) {
        const firstNameRegex = new RegExp(
          `.*${req.query.firstName}.*`,
          regexOptions
        );
        queryArray.push({ firstName: { $regex: firstNameRegex } });
      }
      if (req.query.lastName) {
        const lastNameRegex = new RegExp(
          `.*${req.query.lastName}.*`,
          regexOptions
        );
        queryArray.push({ lastName: { $regex: lastNameRegex } });
      }
      break;
    case "number":
      if (req.query.phoneNumber) {
        const phoneNumberRegex = new RegExp(
          `.*${req.query.phoneNumber}.*`,
          regexOptions
        );
        queryArray.push({
          "phoneNumber.primary": { $regex: phoneNumberRegex },
        });
      }
      break;
    default:
      return res.status(400).send("invalid searchBy");
  }

  dbQuery["$and"] = queryArray;
  clients.find(dbQuery, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Configure multer for profile picture uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination folder for profile pictures
  },
  filename: function (req, file, cb) {
    // Define the filename to avoid naming conflicts (lastName)
    cb(null, req.body.lastName + '_' + Date.now() + '_' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST create new client ***With new profile picture functionality***
router.post('/', authMiddleWare, upload.single('profilePicture'), (req, res, next) => {
  try {
    const newClient = req.body;

    newClient.orgs = [org];
    
    if (req.file) { // Check if a profile picture was uploaded and add its path to the "newClient"
      newClient.profilePicture = req.file.path; //changed from req.file.path to filename because it was not storing correctly
    }
    
    clients.create(newClient, (error, data) => {
      if (error) {
        return next(error);
      } else {
        console.log('Client created:', data); // Log the created client
        res.status(201).json({
          message: 'New client created successfully',
          client: data, // For including the created client document in the response
        });
      }
    });
  } catch (error) {
    return next(error);
  }
});

// API endpoint to PUT update client with profile picture upload
router.put('/:id', authMiddleWare, upload.single('profilePicture'), async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedClientData = req.body;

    if (req.file) {
      updatedClientData.profilePicture = req.file.path;
    }

    // Update the client by ID
    clients.findByIdAndUpdate(id, updatedClientData, { new: true }, (error, updatedClient) => {
      if (error) {
        return next(error);
      } else {
        if (!updatedClient) {
          return res.status(404).json({ message: 'Client not found' });
        }

        console.log('Client updated:', updatedClient);
        res.status(200).json({
          message: 'Client updated successfully',
          client: updatedClient,
        });
      }
    });
  } catch (error) {
    return next(error);
  }
});

// Route to delete a client's profile picture
router.delete('/:id/profilePicture', authMiddleWare, async (req, res, next) => {
  try {
    const clientId = req.params.id;
    const client = await clients.findById(clientId);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    if (client.profilePicture) {
      // Construct the file path for the profile picture in the 'uploads' directory
      const filePath = path.join(__dirname, '..', client.profilePicture);

      // Check if the file exists
      if (fs.existsSync(filePath)) {
        // Delete the profile picture file from the 'uploads' directory
        fs.unlinkSync(filePath);
      }

      // Remove the 'profilePicture' field from the client document
      client.profilePicture = undefined;
      await client.save();

      return res.status(200).json({ message: 'Profile picture deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Profile picture not found' });
    }
  } catch (error) {
    return next(error);
  }
});

// API endpoint to hard delete client by ID, can be only be done if client is not signed up for events
router.delete("/:id", authMiddleWare, (req, res, next) => {
  clients.findOne({ _id : req.params.id, orgs: org }, (error, data) => {
    if (error) {
      return next(error);
    } else if (!data) {
      res.status(400).send("Client not found");
    } else {
      events.find({ attendees: req.params.id, org: org }, (error, data) => {
        if (error) {
          return next(error);
        } else {
          // only delete event if no client is not signed up for any event
          if (data.length === 0)
            clients.findByIdAndDelete(req.params.id, (error, data) => {
              if (error) {
                return next(error);
              } else if (!data) {
                res.status(400).send('Client not found');
              } else {
                res.status(200).send("Client deleted successfully");
              }
            });
          else 
            res.status(406).send("Client is signed up for events and can't be deleted.");
        }
      });
    }
  });
});

// GET clients by zip code for dashboard
router.get('/byzip', (req, res, next) => {
  clients.aggregate(
    [
      {
        $match: {
          "address.zip": { $exists: true, $ne: "" }
        }
      },
      {
        $group: {
          _id: "$address.zip",
          count: { $sum: 1 }
        }
      }
    ],
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        return res.json(data);
      }
    }
  );
});

module.exports = router;
