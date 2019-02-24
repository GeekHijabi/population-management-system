import moongose  from 'mongoose';
import { Schema } from 'mongoose';

const locationSchema = new Schema({
name: { type: String, required: true },
subLocations: [{
  type: Schema.Types.ObjectId,
  ref: 'SubLocation'
}]
});
const Location = moongose.model('Location', locationSchema);

export default Location;
