// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ColorType = {
  "BADGE": "BADGE",
  "TAG": "TAG",
  "BACKGROUND": "BACKGROUND"
};

const { Color, Tag, Note, NoteTag } = initSchema(schema);

export {
  Color,
  Tag,
  Note,
  NoteTag,
  ColorType
};