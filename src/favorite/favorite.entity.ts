import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../auth/entities/user.entity';

export type FavoriteDocument = HydratedDocument<Favorite>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
})
export class Favorite {
  @Prop({ required: true })
  city: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true }) // Index para eficiencia en búsquedas por usuario
  user: User;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);

// Define el índice único compuesto
FavoriteSchema.index({ user: 1, city: 1 }, { unique: true });