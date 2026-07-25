export interface IProjects {
  id: string;
  name: string;
  description: string;
  created_by: string;
  created_at: string;
}

export interface IProjectsState {
  loading: boolean;
  error: boolean;
  projects: IProjects[] | null;
}
