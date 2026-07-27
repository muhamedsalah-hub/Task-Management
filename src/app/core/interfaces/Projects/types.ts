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

export interface IProjectMembers {
  member_id: string;
  project_id: string;
  user_id: string;
  role: string;
  email: string;
  metadata: {
    name: string;
    email: string;
    department: string;
  };
}

export interface IMembersState {
  loading: boolean;
  error: boolean;
  members: IProjectMembers[] | null;
}
