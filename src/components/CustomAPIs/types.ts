export interface Response {
  providers: Array<NamedResource>;
  apis: Array<API>;
}

export interface API extends NamedResource {
  params: Array<Param>;
}

export interface Param extends NamedResource {
  required: boolean;
}

export interface NamedResource {
  name: string;
  display_name: string;
}
