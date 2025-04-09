import { atom } from "recoil";

export const MajorState = atom({
    key: 'MAJOR_STATE', // unique ID (with respect to other atoms/selectors)
    default: {
        // isLoading: false,
        // uri: '',
        data: <Array<any>>[],

    }, // default value (aka initial value)
});