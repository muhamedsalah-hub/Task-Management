import { Component, inject, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MY_FORMATS } from '../../../../core/utils/date';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ProjectsService } from '../../../../core/services/projects.service';
import { AsyncPipe } from '@angular/common';
import { statusValues } from '../../../../core/data/data';
import { IStatistics } from '../../../../core/interfaces/Projects/types';
import { StatisticsService } from '../../../../core/services/statistics.service';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [MatDatepickerModule, ReactiveFormsModule, AsyncPipe],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS,
    },
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent implements OnInit {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ProjectsService = inject(ProjectsService);
  private readonly _StatisticsService = inject(StatisticsService);
  readonly statusValue = statusValues;
  projects$ = this._ProjectsService.getAllProjects();

  statForm: FormGroup<IStatistics> = this._FormBuilder.group<IStatistics>(
    {
      p_start_date: this._FormBuilder.nonNullable.control(new Date()),
      p_end_date: this._FormBuilder.nonNullable.control(
        new Date(new Date().setDate(new Date().getDate() + 7)),
      ),
      p_project_id: this._FormBuilder.control(null),
      p_status: this._FormBuilder.control(null),
    },
    { validators: this.dateRangeValidation },
  );

  ngOnInit() {
    this.statForm.valueChanges
      .pipe(
        filter(() => this.statForm.valid),
        switchMap(() => {
          const formattedStartDate = this.dateFormation(
            this.statForm.get('p_start_date')?.value as Date,
          );
          const formattedEndDate = this.dateFormation(
            this.statForm.get('p_end_date')?.value as Date,
          );

          const body = {
            ...this.statForm.getRawValue(),
            p_start_date: formattedStartDate,
            p_end_date: formattedEndDate,
          };

          return this._StatisticsService.getTasksStatistics(body);
        }),
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  dateRangeValidation(control: AbstractControl) {
    const startDate = control.get('p_start_date')?.value as Date;
    const endDate = control.get('p_end_date')?.value as Date;

    const diffDays =
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays > 7 || diffDays < 0) {
      return { dateRange: false };
    }

    return null;
  }

  dateFormation(date: Date) {
    return date.toISOString().split('T')[0];
  }
}
