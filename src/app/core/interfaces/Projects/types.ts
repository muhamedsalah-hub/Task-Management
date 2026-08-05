import { FormControl } from '@angular/forms';

interface IState {
  loading: boolean;
  error: boolean;
}

export interface IProjects {
  id: string;
  name: string;
  description: string;
  created_by: string;
  created_at: string;
}

export interface IProjectsState extends IState {
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

export interface IMembersState extends IState {
  members: IProjectMembers[] | null;
}

export interface IProjectEpics {
  id: string;
  project_id: string;
  title: string;
  description: string;
  created_at: string;
  deadline: string;
  epic_id: string;
  created_by: { sub: string; name: string; email: string; department: string };
  assignee: { sub: string; name: string; email: string; department: string };
}

export interface IEpicsState extends IState {
  epics: IProjectEpics[] | null;
}

export type IStatus =
  | 'TO_DO'
  | 'IN_PROGRESS'
  | 'BLOCKED'
  | 'IN_REVIEW'
  | 'READY_FOR_QA'
  | 'REOPENED'
  | 'READY_FOR_PRODUCTION'
  | 'DONE';

export interface IAddTaskForm {
  project_id: FormControl<string>;
  epic_id: FormControl<string | null>;
  title: FormControl<string>;
  description: FormControl<string | null>;
  assignee_id: FormControl<string | null>;
  due_date: FormControl<Date | null>;
  status: FormControl<IStatus>;
}


