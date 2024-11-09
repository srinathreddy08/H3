interface AlertPayload {
    message: string;
    location?: {
      latitude: number;
      longitude: number;
    };
    timestamp: string;
  }