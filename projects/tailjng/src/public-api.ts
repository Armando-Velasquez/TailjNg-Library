// =======================================
// Publicar libreria
// =======================================

// ng build tailjng
// cd .\dist\tailjng\
// npm publish --access public


/*
 * Public API Surface of tailjng
 */

// export * from './lib/tailjng.service';
// export * from './lib/tailjng.component';

// Mode Toggle
export * from './lib/components/mode-toggle/mode-toggle.component';

// Tooltip
export * from './lib/components/tooltip/tooltip.directive';

// Label
export * from './lib/components/label/label.component';

// Input
export * from './lib/components/input/input.component';

// Checkbox
export * from './lib/components/checkbox/checkbox.component';

// Button
export * from './lib/components/button/button.component';

// Dialog
export * from './lib/shared/dialog.shared';
export * from './lib/components/dialog/dialog.component';

// Alert Toast
export * from './lib/components/alert-toast/elements/alert-toast.service';
export * from './lib/components/alert-toast/alert-toast.component';

// Alert Dialog
export * from './lib/components/alert-dialog/elements/alert-dialog.service';
export * from './lib/components/alert-dialog/alert-dialog.component';

// Http
export * from './lib/http/api-url';
export * from './lib/http/crud-generic.service';
export * from './lib/http/http-rest.service';
export * from './lib/http/http-error.service';

// Select
export * from './lib/components/select/select.component';

// Toggle Radio
export * from './lib/components/toggle-radio/toggle-radio.component';

// Theme
export * from './lib/colors/theme/theme.component';

// Crud
export * from './lib/components/crud/card-component/card.component';

export * from './lib/components/crud/filter-component/filter.component';

export * from './lib/shared/form.shared';
export * from './lib/components/crud/form-component/form.component';

export * from './lib/components/crud/paginator-component/paginator.component';

export * from './lib/components/crud/table-component/table.component';

// Code block
export * from './lib/components/code-block/code-block.component';