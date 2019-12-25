export const digits = [
    '०', '१', '२', '३', '४', '५', '६', '७', '८', '९',
];

export const translateNum = (num: number): string => (
    `${num}`.split('').map(m => digits[+m]).join('')
);
