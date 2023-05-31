export interface Activity {
  name: string;
  description: string;
  image: string;
  activities: ActivityName[];
}

export interface ActivityName {
  name: string;
}
