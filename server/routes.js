import express from 'express';
import locationsController from './controllers/locations.controller';
import { locationValidator } from './middleware/validators';

const apiUrl = '/api/v1'

const router = express.Router();

router.get(`${apiUrl}`, (req, res) => {
  res.send('Hello from PMS API');
});

router.post(`${apiUrl}/location`,locationValidator, locationsController.createLocation);
router.get(`${apiUrl}/locations`, locationsController.getAllLocations);  
router.delete(`${apiUrl}/mainlocation/:mainlocId`, locationsController.deleteMainLocation);
router
  .route(`${apiUrl}/location/:id`)
  .patch(locationsController.updateLocation)
  .delete(locationsController.deleteLocation);




export default router;
