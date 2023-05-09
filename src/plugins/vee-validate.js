import {defineRule, configure} from 'vee-validate';
import {required, email, digits, numeric, max_value, min_value, integer, url} from '@vee-validate/rules';

defineRule('required', required);
defineRule('email', email);
defineRule('digits', digits);
defineRule('numeric', numeric);
defineRule('max_value', max_value);
defineRule('min_value', min_value);
defineRule('integer', integer);
defineRule('url', url);

configure({
    generateMessage: context => {
        return `The field is invalid`;
    },
});

/*
configure({
    // Generates an English message locale generator
    // generateMessage: localize('en', {
    //     messages: {
    //         required: 'This field is required',
    //     },
    // }),
});*/
