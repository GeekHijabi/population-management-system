import moongose  from 'mongoose';
import { Schema } from 'mongoose';

const subLocationSchema = new Schema({
name: { type: String, required: true },
male_population: { type: Number, default: 0 },
female_population: { type: Number, default: 0 },
total_population: { type: Number, default: 0 },
Location: {
  type: Schema.Types.ObjectId,
  ref: 'Location'
}
});
const SubLocation = moongose.model('SubLocation', subLocationSchema);

export default SubLocation;
