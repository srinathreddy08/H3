export interface OverpassPlace {
    lat: number;
    lon: number;
    tags: {
      name?: string;
      amenity?: string;
      phone?: string;
      opening_hours?: string;
      [key: string]: string | undefined;
    };
  }
