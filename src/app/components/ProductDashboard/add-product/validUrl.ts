import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validUrlValidator(): ValidatorFn {
    const validDomains = [
        'amazon.eg',
        'noon',
        'aliexpress',
        'jarir',
        'extra',
        'amazon.sa',
    ];

    return (control: AbstractControl): ValidationErrors | null => {
        const url = control.value;
        if (typeof url !== 'string' || !url) {
            return null;
        }
        const isValid = validDomains.some((domain) => url.includes(domain));
        return isValid ? null : { invalidUrl: true };
    };
}
