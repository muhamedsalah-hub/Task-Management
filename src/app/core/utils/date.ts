import { MatDateFormats } from '@angular/material/core';

export const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    },
  },
  display: {
    dateInput: {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    },
    monthYearLabel: {
      year: 'numeric',
      month: 'short',
    },
    dateA11yLabel: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
    monthYearA11yLabel: {
      year: 'numeric',
      month: 'long',
    },
  },
};
