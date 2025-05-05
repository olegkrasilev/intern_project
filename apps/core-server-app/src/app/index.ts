import { withSwagger } from './with-swagger';
import { withVersioning } from './with-versioning';
import { withHelmet } from './with-helmet';
import { withValidation } from './with-validation';
import { withGlobalFilters } from './with-global-filter';
import { flow } from 'lodash';

export const withProviders = flow(
  withSwagger,
  withVersioning,
  withHelmet,
  withValidation,
  withGlobalFilters,
);
