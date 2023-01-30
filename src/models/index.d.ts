import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum ColorType {
  BADGE = "BADGE",
  TAG = "TAG",
  BACKGROUND = "BACKGROUND"
}



type EagerColor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Color, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type?: ColorType | keyof typeof ColorType | null;
  readonly name: string;
  readonly value: string;
  readonly textDark: boolean;
  readonly Tags?: (Tag | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyColor = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Color, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type?: ColorType | keyof typeof ColorType | null;
  readonly name: string;
  readonly value: string;
  readonly textDark: boolean;
  readonly Tags: AsyncCollection<Tag>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Color = LazyLoading extends LazyLoadingDisabled ? EagerColor : LazyColor

export declare const Color: (new (init: ModelInit<Color>) => Color) & {
  copyOf(source: Color, mutator: (draft: MutableModel<Color>) => MutableModel<Color> | void): Color;
}

type EagerTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Tag, 'id'>;
  };
  readonly id: string;
  readonly notes?: (NoteTag | null)[] | null;
  readonly text?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly colorID: string;
}

type LazyTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Tag, 'id'>;
  };
  readonly id: string;
  readonly notes: AsyncCollection<NoteTag>;
  readonly text?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly colorID: string;
}

export declare type Tag = LazyLoading extends LazyLoadingDisabled ? EagerTag : LazyTag

export declare const Tag: (new (init: ModelInit<Tag>) => Tag) & {
  copyOf(source: Tag, mutator: (draft: MutableModel<Tag>) => MutableModel<Tag> | void): Tag;
}

type EagerNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Note, 'id'>;
  };
  readonly id: string;
  readonly Tags?: (NoteTag | null)[] | null;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly revisedTime?: string | null;
}

type LazyNote = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Note, 'id'>;
  };
  readonly id: string;
  readonly Tags: AsyncCollection<NoteTag>;
  readonly title?: string | null;
  readonly content?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly revisedTime?: string | null;
}

export declare type Note = LazyLoading extends LazyLoadingDisabled ? EagerNote : LazyNote

export declare const Note: (new (init: ModelInit<Note>) => Note) & {
  copyOf(source: Note, mutator: (draft: MutableModel<Note>) => MutableModel<Note> | void): Note;
}

type EagerNoteTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<NoteTag, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tagId?: string | null;
  readonly noteId?: string | null;
  readonly tag: Tag;
  readonly note: Note;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyNoteTag = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<NoteTag, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly tagId?: string | null;
  readonly noteId?: string | null;
  readonly tag: AsyncItem<Tag>;
  readonly note: AsyncItem<Note>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type NoteTag = LazyLoading extends LazyLoadingDisabled ? EagerNoteTag : LazyNoteTag

export declare const NoteTag: (new (init: ModelInit<NoteTag>) => NoteTag) & {
  copyOf(source: NoteTag, mutator: (draft: MutableModel<NoteTag>) => MutableModel<NoteTag> | void): NoteTag;
}