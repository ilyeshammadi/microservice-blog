
// @ts-ignore
import { Service } from '../common/js/service';
import * as endpoints from './endpoints'

new Service('authorization', {
    endpoints,
}).start()