import validator from 'validator';
import {isEmpty} from 'lodash';

export const locationValidator = (req, res, next) => {
  const { name, male_population, female_population } = req.body;
  const errors = {};
  if (!name) {
    errors.name = 'Name field cannot be empty';
  } 
  else if (name && validator.isEmpty(name.trim())) {
    errors.name = 'location name cannot be empty';
  }
  else if (male_population && Number.isNaN(parseInt(male_population, 10))) {
    errors.male_population = 'Male population should be a number';
  } 
  else if (female_population && Number.isNaN(parseInt(female_population, 10))) {
    errors.female_population = 'Female population should be a number';
  }

  if (isEmpty(errors)) { return next(); }
  return res.status(400).json({ errors });
}
