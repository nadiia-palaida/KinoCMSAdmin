import {defineRule} from 'vee-validate';
import {required, email, digits, numeric, max_value, min_value} from '@vee-validate/rules';

defineRule('required', required);
defineRule('email', email);
defineRule('digits', digits);
defineRule('numeric', numeric);
defineRule('max_value', max_value);
defineRule('min_value', min_value);