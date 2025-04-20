export interface Experience {
  id: number;
  companyName: string;
  companyType: string;
  role: string;
  tag: string;
  year: string | null;
  startdate: string;
  enddate: string;
  duration: string;
  image: string;
  alias: string;
}

export interface ExperienceItem {
  id: number;
  title: string;
  description: string;
  alias: string;
  experience: Experience;
}
