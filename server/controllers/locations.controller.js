import Location from '../models/location.model';
import SubLocation from '../models/sub-location.model';

export default {
  createLocation(req, res) {
    const { isMainLocation, name, male_population, female_population } = req.body;
    if (isMainLocation) {
      Location.findOne({ name }).then((locationFound) => {
        if (locationFound) {
          return res.status(409).send({
            message: 'Location already exist',
          })
        }
        return Location.create({ name }).then((locationDetails) => {
          return res.status(201).send({
            message: 'Location created successfully',
            locationDetails
          });
        });
      }).catch(error => {
        res.status(500).json({ error: error.message });
      });
    } else {
      const locationId = req.body.locId;
      Location.findById(locationId).exec().then((parentFound) => {
        if (!parentFound) {
          return res.status(404).send({ error: 'No main Location found' })
        }
        SubLocation.findOne({ name }).then((nameFound) => {
          if (nameFound) {
            return res.status(409).send({ error: 'Sublocation already exist' });
          }
          let total_population;
          if(male_population && female_population) {
            total_population = parseInt(male_population, 10) + parseInt(female_population, 10);
          }
          return SubLocation.create({ 
            name: name.trim(), 
            male_population, 
            female_population, 
            total_population 
            }).then((newsubLocation) => {
            parentFound.subLocations.push(newsubLocation._id);
            console.log(newsubLocation.total_population, 'nrnt')
            parentFound.save();
            return res.status(201).send({
              message: 'New sublocation created successfully',
              name: newsubLocation.name,
              male_population: parseInt(newsubLocation.male_population),
              female_population: parseInt(newsubLocation.female_population),
              total_population: total_population
            });

          });

        })


      }).catch((error) => {
        res.status(500).send({ error: error.message });
      })
    }
  },

  getAllLocations(req, res) {
    Location.find({}).populate('subLocations', 'name male_population female_population total_population')
      .then((locations) => {
        if (locations) {
          return res.status(200).send({
            message: 'All locations fetched',
            locations
          });
        }
        res.status(404).send({
          error: 'No locations created yet'
        })
      })
  },

  updateLocation(req, res) {
    const { id } = req.params;
    const { name, male_population, female_population } = req.body;
    const subLocationUpdate = {};
    if (name) {
      subLocationUpdate.name = name;
    }
    if (male_population) {
      subLocationUpdate.male_population = male_population;
    }
    if (female_population) {
      subLocationUpdate.female_population = female_population;
    }
    if (Object.keys(subLocationUpdate).length === 0 && subLocationUpdate.constructor === Object) {
      return res.status(200).send({ message: 'No field to update' });
    }
    SubLocation.findByIdAndUpdate(
      { _id: id },
      { $set: subLocationUpdate },
      { new: true },
      (error, updatedSubLocation) => {
        if (error) {
          return res.status(404).send({ error: 'Location not found' });
        }
        console.log(updatedSubLocation, 'us');
        return res.status(200).send({
          message: 'Sublocation details updated successfully',
          updatedSubLocation
        });
      }
    );
    return this;
  },

  deleteLocation(req, res) {
    const { id } = req.params;
    SubLocation.findOne({ _id: id }).exec().then((locFound) => {
      if(!locFound) {
        return res.status(404).send({ error: 'Location not found' });
      }
      Location.findById(locFound.subLocations).exec().then((sing) => {
        console.log(sing, 'sggg');
        const locId = sing.subLocations;
        for (let i = 0; i < locId.length; i++) {
          if(locId[i] === id) {
            locId.splice(i, 1);
          };
        };
      }).catch(() => {
        return res.status(500).send({ error: 'something went wrong' });
      })
      SubLocation.findByIdAndRemove(id, (error) => {
        console.log(id, '<<<><')
        if(error) {
          return res.status(500).send('Something went wrong');
        }
        return res.status(200).send({ message: 'Location successfully deleted' })
      })
    })
  },

  deleteMainLocation(req, res) {
    const { mainlocId } = req.params
    Location.findByIdAndRemove(mainlocId).exec().then((location) => {
      if (!location) {
        return res.status(404).send({message: 'Location does not exist'})
      } else {
        return res.status(200).send({message: 'Location successfully deleted'})
      }
    })
  }
}

