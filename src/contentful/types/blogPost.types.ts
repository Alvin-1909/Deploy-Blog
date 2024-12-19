import type {
  ChainModifiers,
  Entry,
  EntryFieldTypes,
  EntrySkeletonType,
  LocaleCode,
} from "contentful";

export interface IContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    file: {
      url?: string;
      title?: string;
      description?: string;
      contentType?: string;
    };
  };
}
export interface TypeBlogPostFields {
  title: EntryFieldTypes.Symbol;
  slug: EntryFieldTypes.Symbol;
  image?: EntryFieldTypes.AssetLink;
  body: EntryFieldTypes.RichText;
}

export type TypeBlogPostSkeleton = EntrySkeletonType<
  TypeBlogPostFields,
  "blogPost"
>;
export type TypeBlogPost<
  Modifiers extends ChainModifiers,
  Locales extends LocaleCode = LocaleCode
> = Entry<TypeBlogPostSkeleton, Modifiers, Locales>;
