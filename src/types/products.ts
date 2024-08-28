export type Root = Root2[];

export interface Root2 {
  id: number;
  date: string;
  date_gmt: string;
  guid: Guid;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: Title;
  template: string;
  meta: Meta;
  'product-categories': any[];
  class_list: string[];
  acf: Acf;
  _links: Links;
}

export interface Guid {
  rendered: string;
}

export interface Title {
  rendered: string;
}

export interface Meta {
  _acf_changed: boolean;
}

export interface Acf {
  summary: string;
  large_image: string;
  thumbnail: Thumbnail;
  misc_image: any;
  category: any;
  price: string;
}

export interface Thumbnail {
  ID: number;
  id: number;
  title: string;
  filename: string;
  filesize: number;
  url: string;
  link: string;
  alt: string;
  author: string;
  description: string;
  caption: string;
  name: string;
  status: string;
  uploaded_to: number;
  date: string;
  modified: string;
  menu_order: number;
  mime_type: string;
  type: string;
  subtype: string;
  icon: string;
  width: number;
  height: number;
  sizes: Sizes;
}

export interface Sizes {
  thumbnail: string;
  'thumbnail-width': number;
  'thumbnail-height': number;
  medium: string;
  'medium-width': number;
  'medium-height': number;
  medium_large: string;
  'medium_large-width': number;
  'medium_large-height': number;
  large: string;
  'large-width': number;
  'large-height': number;
  '1536x1536': string;
  '1536x1536-width': number;
  '1536x1536-height': number;
  '2048x2048': string;
  '2048x2048-width': number;
  '2048x2048-height': number;
  'post-thumbnail': string;
  'post-thumbnail-width': number;
  'post-thumbnail-height': number;
  'enwoo-img': string;
  'enwoo-img-width': number;
  'enwoo-img-height': number;
}

export interface Links {
  self: Self[];
  collection: Collection[];
  about: About[];
  'wp:attachment': WpAttachment[];
  'wp:term': WpTerm[];
  curies: Cury[];
  'acf:term'?: AcfTerm[];
}

export interface Self {
  href: string;
}

export interface Collection {
  href: string;
}

export interface About {
  href: string;
}

export interface WpAttachment {
  href: string;
}

export interface WpTerm {
  taxonomy: string;
  embeddable: boolean;
  href: string;
}

export interface Cury {
  name: string;
  href: string;
  templated: boolean;
}

export interface AcfTerm {
  embeddable: boolean;
  taxonomy: string;
  href: string;
}
